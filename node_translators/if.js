/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function processIf(node, indent) {
  var codegen, str;

  codegen = this.process.bind(this);
  if (typeof node[2][0] === 'string') {
    node[2] = [node[2]];
  }

  str = 'if' + this.ws + '(' + codegen(node[1], indent) + ')' + this.ws + '{' + this.nl +
    body(codegen, indent, this.indent, this.nl, node[2]) + indent + '}';

  // is an "elseif"
  if (node[3] && node[3][0][0] === 'if') {
    str += this.ws + 'else' + processIf.call(this, node[3][0], indent);
  }

  // is an "else"
  if (node[3] && node[3][0][0] !== 'if') {
    str += this.ws + 'else' + this.ws + '{' + this.nl;
    str += body(codegen, indent, this.indent, this.nl, node[3]) + indent + '}' + this.nl;
  }
  return str;
};

