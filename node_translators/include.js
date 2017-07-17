/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var str, codegen;
  str = node.require ? 'require' : 'include';
  if (node.once) {
    str += '_once';
  }
  codegen = this.process.bind(this);
  return str + ' ' + codegen(node.target, indent);
};
