/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant usage
 */
module.exports = function (node) {
  if (node.name && node.name.kind) {
    // @fixme : should not be like this
    return node.name.name;
  }
  return node.name;
};
