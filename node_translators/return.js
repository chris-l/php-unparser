/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;

  if (!node.what) {
    return 'return';
  }

  codegen = this.process.bind(this);
  return 'return ' + codegen(node.what, indent);
};
