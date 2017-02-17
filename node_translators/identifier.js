/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  if (node.resolution === 'rn') {
    return 'namespace\\' + node.name;
  }
  return node.name;
};
