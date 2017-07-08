/*jslint node: true, indent: 2 */
'use strict';

module.exports = function property(node, indent) {
  var codegen, str = '';
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  str += node.visibility;
  str += ' $' + node.name;
  if (node.value) {
    codegen = this.process.bind(this);
    str += ' = ' + codegen(node.value, indent);
  }
  return str;
};
