/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node) {

  if (!node.children || node.children.length === 0) {
    return '';
  }

  var codegen = this.process.bind(this), str = '<?php' + this.nl;
  if (node.children[0].kind === 'inline') {
    str = '';
    node.children[0].omitClosingTag = true;
  }
  // Is the last expression and an inline
  if (node.children[node.children.length - 1].kind === 'inline') {
    node.children[node.children.length - 1].isLast = true;
  }
  if (
    !this.forceNamespaceBrackets &&
      node.children.length === 1 &&
      node.children[0].kind === 'namespace'
  ) {
    return str + 'namespace ' + node.children[0].name + ';' +
      this.nl + this.nl +
      doBody.call(this, codegen, '', node.children[0].children, true);
  }
  return str + doBody.call(this, codegen, '', node.children, true);
};
