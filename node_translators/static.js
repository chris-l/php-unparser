/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1] === 'get') {
    return codegen(node[2], indent) + '::' + node[3];
  }
};


