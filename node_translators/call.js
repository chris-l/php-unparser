/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen = this.process.bind(this),
    useArgs = '';

  if (node[2] && node[2].length > 0) {
    useArgs = node[2].map(function (arg) {
      return codegen(arg);
    }).join(',' + this.ws);
  }

  return codegen(node[1]) + '(' + useArgs + ')';
};

