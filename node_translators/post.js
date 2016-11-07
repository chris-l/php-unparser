/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen = this.process.bind(this);
  if (node[1] === '+') {
    return codegen(node[2]) + '++';
  }
};

