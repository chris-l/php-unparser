/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node[2], indent) + this.ws + node[1] + this.ws + codegen(node[3], indent);
};
