/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var mode = node.require ? 'require' : 'include';
  if (node.once) {
    mode += '_once';
  }
  var codegen = this.process.bind(this);
  if (node.target.kind === 'parenthesis') {
    return mode + '(' + codegen(node.target.inner, indent) + ')';
  } else {
    return mode + this.ws + codegen(node.target, indent);
  }
};
