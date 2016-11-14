/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);

  return 'new ' + node[1] + '(' + node[2].map(function (x) { return codegen(x, indent); }) + ')';
};


