/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node) {
  var codegen = this.process.bind(this);
  if (
    !this.forceNamespaceBrackets &&
      node.children.length === 1 &&
      node.children[0].kind === 'namespace'
  ) {
    return 'namespace ' + node.children[0].name.name + ';\n\n' +
      body(codegen, '', this.indent, this.nl, node.children[0].children, true);
  }
  return body(codegen, '', this.indent, this.nl, node.children, true);
};
