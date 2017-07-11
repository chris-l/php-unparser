/*jslint node: true, indent: 2 */
'use strict';

/**
 * Exit statement
 */
module.exports = function (node, indent) {
  var codegen;
  codegen = this.process.bind(this);
  if (node.status === null) {
    return 'exit';
  }
  return 'exit(' + codegen(node.status, indent) + ')';
};
