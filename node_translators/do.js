/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = 'do' + this.ws + '{' + this.nl;
  str += require('./helper/body')(codegen, indent, this.indent, this.nl, node[2]);
  str += indent + '}' + this.ws + 'while' + this.ws + '(' + codegen(node[1], indent) + ')';
  return str;
};

