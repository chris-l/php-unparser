/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, left, right = '';
  codegen = this.process.bind(this);
  if (node.trueExpr) {
    left = codegen(node.trueExpr, indent);
  }
  if (node.falseExpr) {
    right = codegen(node.falseExpr, indent);
  }
  return codegen(node.test, indent) + this.ws + '?' +
    (left ? this.ws + left + this.ws : '') + ':' +
    (right ? this.ws + right : '');
};
