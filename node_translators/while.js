/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen = this.process.bind(this), str;

  str = 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  if (!node.body) {
    return str;
  }
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }
  str += doBody.call(this, codegen, indent, node.body.children || [node.body]);
  if (node.shortForm) {
    str += indent + 'endwhile;';
  } else {
    str += indent + '}';
  }
  return str;
};
