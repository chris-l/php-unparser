/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// name, params, isRef, returnType, body, flags
module.exports = function (node, indent) {
  var codegen, str = '';

  if (node.isAbstract) {
    str += 'abstract ';
  }
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  // Fall back to public if nothing is specified
  if (!node.visibility) {
    node.visibility = 'public';
  }
  str += node.visibility + ' function ';
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

  // It lacks body. Must be an abstract method declaration.
  if (node.isAbstract || !node.body) {
    return str + ';';
  }

  codegen = this.process.bind(this);

  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str +=  this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';
  return str;
};
