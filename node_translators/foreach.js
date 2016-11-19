/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = 'foreach' + this.ws + '(' + codegen(node[1], indent) + this.ws + 'as' + this.ws;
  if (node[2]) {
    str += codegen(node[2], indent) + this.ws + '=>' + this.ws;
  }
  str += codegen(node[3], indent) + ')' + this.ws + '{' + this.nl;
  if (typeof node[4][0] === 'string') {
    node[4] = [node[4]];
  }
  str += require('./helper/body')(codegen, indent, this.indent, this.nl, node[4]);
  return str + indent + '}';
};

