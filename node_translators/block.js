/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

// block
module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);

  str += this.nl + indent + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.children);
  str += indent + '}' + this.nl;

  return str;
};
