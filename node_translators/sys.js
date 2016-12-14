/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1] === 'echo') {
    if (!Array.isArray(node[2][0])) {
      node[2] = [node[2]];
    }
    return 'echo ' + node[2].map(function (x) {
      return codegen(x, indent);
    }).join(',' + this.ws);
  }
  if (node[1] === 'shell') {
    return '`' + codegen(node[2], indent, { raw : true }) + '`';
  }
  if (node[1] === 'clone') {
    return 'clone ' + codegen(node[2], indent);
  }
  if (!node[2]) {
    return node[1];
  }
  if (typeof node[2][0] === 'string') {
    return node[1] + '(' + codegen(node[2], indent) + ')';
  }
  return node[1] + '(' + node[2].map(function (x) { return codegen(x, indent); }).join(',' + this.ws) + ')';
};
