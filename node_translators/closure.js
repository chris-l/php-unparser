/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// params, isRef, use, returnType
module.exports = function (node, indent) {
  var codegen, str, useArgs;
  codegen = this.process.bind(this);

  // function header
  str = 'function' + this.ws;
  if (node.byref) {
    str += '&';
  }
  str += args(node.arguments, indent, this);

  // use statement
  if (node.uses && node.uses.length > 0) {
    useArgs = node.uses.map(function (arg) {
      return '$' + arg.name;
    });
    str += this.ws + 'use' + this.ws + '(' + useArgs.join(',' + this.ws) + ')';
  }

  // php7 / return type
  if (node.type) {
    str += this.ws + ':' + this.ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  str += this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';
  return str;
};
