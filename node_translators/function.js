/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent, opt) {
  var codegen, str, args, useArgs, that, space, listArgs;
  opt = opt || {};
  codegen = this.process.bind(this);
  that = this;

  str = 'function';
  str += (node[1]) ? ' ' + node[1] : this.ws;
  function processElement(indent) {
    return function (arg) {
      if (arg[2].length > 0) {
        return arg[0] + that.ws + '=' + that.ws + codegen(arg[2], indent);
      }
      return arg[0];
    };
  }

  args = node[2].map(processElement(indent));
  if (args.join().length > 80) {
    space = this.nl + indent + this.indent;
    args = node[2].map(processElement(indent + this.indent));
    listArgs = space + args.join(',' + space) + this.nl + indent;
  } else {
    listArgs = args.join(',' + this.ws);
  }

  str += '(' + listArgs + ')';
  if (node[4] && node[4].length > 0) {
    useArgs = node[4].map(function (arg) {
      return arg[1];
    });
    str += this.ws + 'use' + this.ws + '(' + useArgs.join(',' + this.ws) + ')';
  }

  // It lacks body. Must be an abstract method declaration.
  if (!node[6]) {
    return str + ';';
  }

  if (opt.notClosure === true) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  str += doBody(codegen, indent, that.indent, that.nl, node[6]);
  str += indent + '}';
  return str;
};


