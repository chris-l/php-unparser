/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  // a namespace constant (name, value)
  str = 'const ';
  str += node.name;
  str += this.ws + '=' + this.ws;
  str += codegen(node.value, indent);

  return str;
};
