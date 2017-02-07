/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;
  str = 'yield';
  if (node.value) {
    codegen = this.process.bind(this);
    if (node.key) {
      // yield $key => $value
      str += ' ' + codegen(node.key, indent) + ' =>';
    }
    // yield $value
    str += ' ' + codegen(node.value, indent);
  }
  return str;
};
