/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function processIf(node) {
  var codegen, str;

  codegen = this.process.bind(this);
  str = 'if' + this.ws + '(' + codegen(node[1]) + ')' + this.ws + '{' + this.nl +
    body(codegen, this.indent, this.nl, node[2]) + '}';
  if (node[3] && node[3][0] === 'if') {
    str += this.ws + 'else' + this.ws + processIf.call(this, node[3]);
  }

  if (node[3] && node[3][0] !== 'if') {
    str += this.ws + 'else' + this.ws + '{' + this.nl + body(codegen, this.indent, this.nl, node[3]) + '}' + this.nl;
  }
  return str;
};

