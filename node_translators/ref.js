/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen = this.process.bind(this);
  return '&' + codegen(node[1]);
};


