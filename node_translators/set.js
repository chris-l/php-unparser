/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[2][0] === 'bin' && JSON.stringify(node[1]) === JSON.stringify(node[2][2])) {
    return codegen(node[1], indent) + this.ws + node[2][1] + '=' + this.ws + codegen(node[2][3], indent);
  }
  return codegen(node[1], indent) + this.ws + '=' + this.ws + codegen(node[2], indent);
};

