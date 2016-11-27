/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1] === 'class') {
    return codegen(node[2], indent);
  }
  return '$' + codegen(node[2], indent);
};

