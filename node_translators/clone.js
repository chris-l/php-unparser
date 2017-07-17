/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;
  codegen = this.process.bind(this);
  return 'clone ' + codegen(node.what, indent);
};
