/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, that = this, str, body;

  body = require('./helper/body');
  codegen = this.process.bind(this);
  str = 'for' + this.ws + '(';

  str += node[1].map(function (x) {
    if (x) {
      return codegen(x, indent);
    }
    return '';
  }).join(',' + this.ws);
  str += ';' + this.ws;

  str += node[2].map(function (x) {
    if (x) {
      return codegen(x, indent);
    }
    return '';
  }).join(',' + this.ws);
  str += ';' + this.ws;

  str += node[3].map(function (x) {
    if (x) {
      return codegen(x, indent);
    }
    return '';
  }).join(',' + this.ws);
  str += ')' + this.ws + '{' + this.nl;

  str += body(codegen, indent, this.indent, this.nl, node[4]);
  str += indent + '}';

  return str;
};


