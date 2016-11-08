/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, left, right;

  codegen = this.process.bind(this);
  left = codegen(node[2], indent);
  if (node[2][0] === 'retif') {
    left = '(' + left + ')';
  }
  right = codegen(node[3], indent);
  if (node[3][0] === 'retif') {
    right = '(' + right + ')';
  }

  return codegen(node[1], indent) + this.ws + '?' + this.ws + left + this.ws + ':' + this.ws + right;
};



