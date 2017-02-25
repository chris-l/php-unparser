/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node, indent) {
  var str, codegen;


  str = 'namespace ' + node.name + this.ws + '\n{\n\n';
  codegen = this.process.bind(this);
  str += body(codegen, indent, this.indent, this.nl, node.children);
  str += '}';

  return str;
};
