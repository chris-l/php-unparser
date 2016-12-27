/*jslint node: true, indent: 2 */
'use strict';

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var ns = node[1].join('\\');
  if (node[1][node[1].length - 1] !== node[2]) {
    ns += ' as ' + node[2];
  }
  return indent + 'use ' + (
    node[3] ? node[3] + ' ' : ''
  ) + ns;
};
