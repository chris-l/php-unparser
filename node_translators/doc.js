/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  return this.nl + indent + node[1];
};
