/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1] === 'echo') {
    return 'echo ' + node[2].map(function (x) {
      return codegen(x, indent);
    }).join(',' + this.ws);
  }
  if (node[1] === 'require') {
    return 'require(' + codegen(node[2], indent) + ')';
  }
};


