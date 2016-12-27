/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node) {
  var codegen = this.process.bind(this);

  if (!this.forceNamespaceBrackets && node[1].length === 1 && node[1][0][0] === 'namespace') {
    return 'namespace ' + node[1][0][1].join('\\') + ';\n\n' +
      body(codegen, '', this.indent, this.nl, node[1][0][2], true);
  }
  return body(codegen, '', this.indent, this.nl, node[1], true);
};
