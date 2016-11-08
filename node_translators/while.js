/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this),
    str;

  str = 'while' + this.ws + '(' + codegen(node[1], indent) + ')' +
    this.ws + '{' + this.nl;

  str += require('./helper/body')(codegen, indent, this.indent, this.nl, node[2]);
  return str + indent + '}';
};

