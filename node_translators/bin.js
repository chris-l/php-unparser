/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str, firstpart, secondpart;
  codegen = this.process.bind(this);

  firstpart = codegen(node.left, indent);
  secondpart = codegen(node.right, indent);
  str = firstpart + this.ws + node.type + this.ws + secondpart;

  if (str.length > 80) {
    str = firstpart + this.ws + node.type + this.nl + indent + this.indent + secondpart;
  }

  return str;
};
