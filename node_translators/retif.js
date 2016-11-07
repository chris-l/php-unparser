/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen, left, right;

  codegen = this.process.bind(this);
  left = codegen(node[2]);
  if (node[2][0] === 'retif') {
    left = '(' + left + ')';
  }
  right = codegen(node[3]);
  if (node[3][0] === 'retif') {
    right = '(' + right + ')';
  }

  return codegen(node[1]) + this.ws + '?' + this.ws + left + this.ws + ':' + this.ws + right;
};



