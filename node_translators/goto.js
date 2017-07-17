/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return 'goto ' + node.label;
};
