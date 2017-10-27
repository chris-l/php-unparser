/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var str, codegen;

  str = 'namespace ' + node.name + this.ws + '\n{\n\n';
  codegen = this.process.bind(this);
  str += doBody.call(this, codegen, indent, node.children);
  str += '}';

  return str;
};
