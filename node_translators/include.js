/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var mode = node.require ? 'require' : 'include', codegen;
  if (node.once) {
    mode += '_once';
  }
  codegen = this.process.bind(this);
  if (node.target.kind === 'parenthesis') {
    return mode + '(' + codegen(node.target.inner, indent) + ')';
  }
  return mode + this.ws + codegen(node.target, indent);
};
