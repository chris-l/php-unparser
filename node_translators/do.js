/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = 'do' + this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}' + this.ws + 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  return str;
};
