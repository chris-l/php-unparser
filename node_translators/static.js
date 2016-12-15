/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1] === 'get') {
    var prop = Array.isArray(node[3]) ? codegen(node[3], indent) : node[3];
    return codegen(node[2], indent) + '::' + prop;
  } else if (node[1] === 'declare') {
    return 'static ' + node[2].map(function (x) { return x[0] + ' = ' + codegen(x[1], indent); }).join(',' + this.ws);
  }
};
