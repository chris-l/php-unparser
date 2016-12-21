/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var args = require('./helper/arguments');

// params, isRef, use, returnType
module.exports = function (node, indent) {
  var codegen, str, useArgs;
  codegen = this.process.bind(this);

  // function header
  str = 'function' + this.ws;
  if (node[2]) {
    str += '&';
  }
  str += args(node[1], indent, this);

  // use statement
  if (node[3] && node[3].length > 0) {
    useArgs = node[3].map(function (arg) {
      return arg[1];
    });
    str += this.ws + 'use' + this.ws + '(' + useArgs.join(',' + this.ws) + ')';
  }

  // php7 / return type
  if (node[4]) {
    str += this.ws + ':' + this.ws + node[4].join('\\');
  }

  str += this.ws + '{' + this.nl;
  str += doBody(codegen, indent, this.indent, this.nl, node[5]);
  str += indent + '}';
  return str;
};
