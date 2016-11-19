/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, offset;
  codegen = this.process.bind(this);
  offset = node[2] ? codegen(node[2], indent) : '';

  return codegen(node[1], indent) + '[' + offset + ']';
};

