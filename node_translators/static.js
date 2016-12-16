/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this), prop;
  if (node[1] === 'get') {
    prop = Array.isArray(node[3]) ? codegen(node[3], indent) : node[3];
    return codegen(node[2], indent) + '::' + prop;
  }
  if (node[1] === 'declare') {
    return 'static ' + node[2].map(function (x) { return x[0] + ' = ' + codegen(x[1], indent); }).join(',' + this.ws);
  }
  throw new Error('Unable to handle "' + node[1] + '" static');
};
