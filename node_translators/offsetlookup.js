/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, offset;
  codegen = this.process.bind(this);
  offset = node.offset ? codegen(node.offset, indent) : '';
  return codegen(node.what, indent) + '[' + offset + ']';
};
