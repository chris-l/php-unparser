/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, args, useArgs, that;
  codegen = this.process.bind(this);
  that = this;

  str = 'function';
  str += (node[1]) ? ' ' + node[1] : this.ws;
  args = node[2].map(function (arg) {
    if (arg[2].length > 0) {
      return arg[0] + that.ws + '=' + that.ws + codegen(arg[2], indent);
    }
    return arg[0];
  });

  str += '(' + args.join(',' + this.ws) + ')';
  if (node[4] && node[4].length > 0) {
    useArgs = node[4].map(function (arg) {
      return arg[1];
    });
    str += this.ws + 'use' + this.ws + '(' + useArgs.join(',' + this.ws) + ')';
  }
  str += this.ws + '{' + this.nl;

  str += doBody(codegen, indent, that.indent, that.nl, node[6]);
  str += indent + '}';
  return str;
};


