/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node.level) {
    return 'continue ' + codegen(node.level, indent);
  }

  return 'continue';
};
