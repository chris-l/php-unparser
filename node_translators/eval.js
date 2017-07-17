/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'eval(' + codegen(node.source, indent) + ')';
};
