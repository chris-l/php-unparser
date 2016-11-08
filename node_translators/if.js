/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function processIf(node, indent) {
  var codegen, str;

  codegen = this.process.bind(this);
  str = 'if' + this.ws + '(' + codegen(node[1], indent) + ')' + this.ws + '{' + this.nl +
    body(codegen, indent, this.indent, this.nl, node[2]) + indent + '}';
  if (node[3] && node[3][0] === 'if') {
    str += this.ws + 'else' + this.ws + processIf.call(this, node[3], indent);
  }

  if (node[3] && node[3][0] !== 'if') {
    str += this.ws + 'else' + this.ws + '{' + this.nl + body(codegen, indent, this.indent, this.nl, node[3]) + indent + '}' + this.nl;
  }
  return str;
};

