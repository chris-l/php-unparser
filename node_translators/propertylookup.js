/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, prop;
  codegen = this.process.bind(this);
  prop = (function () {
    var child = node.offset;

    if (child.kind === 'constref') {
      return child.name;
    }
    if (child.kind === 'variable') {
      return codegen(child, indent);
    }
    return '{' + codegen(child, indent) + '}';
  }());

  return codegen(node.what, indent) + '->' + prop;
};
