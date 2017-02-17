/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);
  if (node.visibility) {
    str += node.visibility + ' ';
  }
  str += 'const ';
  str += node.name;
  if (node.value) {
    str += this.ws + '=' + this.ws;
    str += codegen(node.value, indent);
  }
  return str;
};
