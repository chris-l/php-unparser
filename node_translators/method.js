/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var keywords = require('./helper/keywords');

// name, params, isRef, returnType, body, flags
module.exports = function (node, indent) {
  var codegen, str, that;
  codegen = this.process.bind(this);
  that = this;

  str = keywords(node[6]) + ' function ';

  if (node[3]) {
    str += '&';
  }
  str += node[1] + args(node[2], indent, this);

  // php7 / return type
  if (node[4]) {
    str += this.ws + ':' + this.ws + node[4].join('\\');
  }

  // It lacks body. Must be an abstract method declaration.
  if (!node[5]) {
    return str + ';';
  }

  str += this.nl + indent + '{' + this.nl;
  str += doBody(codegen, indent, that.indent, that.nl, node[5]);
  str += indent + '}';
  return str;
};
