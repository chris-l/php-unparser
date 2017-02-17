/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// name, params, isRef, returnType, body
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  str = 'function ';
  if (node.byref) {
    str += '&';
  }
  str += node.name;
  str += args(node.arguments, indent, this);

  // php7 / return type
  if (node.type) {
    str += this.ws + ':' + this.ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  str += this.nl + indent + '{' + this.nl;
  str += doBody(codegen, indent, this.indent, this.nl, node.body.children);
  str += indent + '}';

  return str;
};
