/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function processIf(node, indent) {
  var codegen, str, that = this;

  codegen = this.process.bind(this);

  str = 'if' + this.ws + '(' + codegen(node[1], indent) + ')';

  if (node[2]) {
    if (typeof node[2][0] === 'string') {
      node[2] = [node[2]];
    }
    str += this.ws + '{' + this.nl + body(codegen, indent, this.indent, this.nl, node[2]) + indent + '}';
  } else if (!node[3]) {
    str += ';';
  }

  if (node[3]) {
    str += (function () {
      var out = '';

      // is an "elseif"
      if (node[3][0] === 'if') {
        return that.ws + 'else' + processIf.call(that, node[3], indent);
      }

      if (typeof node[3][0] === 'string') {
        node[3] = [node[3]];
      }

      // is an "else"
      out += that.ws + 'else' + that.ws + '{' + that.nl;
      out += body(codegen, indent, that.indent, that.nl, node[3]) + indent + '}' + that.nl;
      return out;
    }());
  }
  return str;
};
