/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node.left, indent) +
    this.ws + node.type + this.ws +
    codegen(node.right, indent);
};
