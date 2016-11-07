/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen = this.process.bind(this),
    str;

  str = 'while' + this.ws + '(' + codegen(node[1]) + ')' +
    this.ws + '{' + this.nl;

  str += require('./helper/body')(codegen, this.indent, this.nl, node[2]);
  return str + '}';
};

