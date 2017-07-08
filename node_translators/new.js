/*jslint node: true, indent: 2 */
'use strict';
var params = require('./helper/parameters');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = codegen(node.what, indent);
  str += '(';
  if (node.arguments && node.arguments.length > 0) {
    str += params(node.arguments, indent, this);
  }
  str += ')';
  return 'new ' + str;
};
