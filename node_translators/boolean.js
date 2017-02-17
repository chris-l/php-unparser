/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  return node.value ? 'true' : 'false';
};
