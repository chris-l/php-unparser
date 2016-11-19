/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this),
    prop = Array.isArray(node[3]) ? codegen(node[3], indent) : node[3];
  if (node[1] === 'get') {
    return codegen(node[2], indent) + '::' + prop;
  }
};


