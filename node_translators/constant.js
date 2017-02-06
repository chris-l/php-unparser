/*jslint node: true, indent: 2 */
'use strict';

var keywords = require('./helper/keywords');

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  // a namespace constant (name, value)
  str = indent + 'const ';
  str += node.name;
  str += this.ws + '=' + this.ws;
  str += codegen(node.value, indent) + ';';

  return str;
};
