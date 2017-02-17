/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = 'do' + this.ws + '{' + this.nl;
  str += doBody(
    codegen, indent, this.indent, this.nl, node.body.children
  );
  str += indent + '}' + this.ws + 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  return str;
};
