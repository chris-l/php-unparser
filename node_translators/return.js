/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;

  if (!node.expr) {
    return 'return';
  }

  codegen = this.process.bind(this);
  return 'return ' + codegen(node.expr, indent);
};
