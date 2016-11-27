/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, classNam;

  codegen = this.process.bind(this);
  classNam = node[1].length > 1 ? codegen(node[1], indent) : node[1][0];

  return 'new ' + classNam + '(' + node[2].map(function (x) { return codegen(x, indent); }).join(',' + this.ws) + ')';
};


