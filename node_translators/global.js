/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'global ' + node.items.map(function (x) {
    return codegen(x, indent);
  }).join(',' + this.ws);
};
