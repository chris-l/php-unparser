/*jslint node: true, indent: 2 */
'use strict';

var identifier = require('./helper/identifier');
/**
 * Constant usage
 */
module.exports = function (node) {
  return identifier(node);
};
