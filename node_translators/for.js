/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen, that = this, str;

  codegen = this.process.bind(this);
  str = 'for' + this.ws + '(';

  str += node[1].map(function (x) {
    return codegen(x);
  }).join(',' + this.ws);
  str += ';' + this.ws;

  str += node[2].map(function (x) {
    return codegen(x);
  }).join(',' + this.ws);
  str += ';' + this.ws;

  str += node[3].map(function (x) {
    return codegen(x);
  }).join(',' + this.ws);
  str += ')' + this.ws + '{' + this.nl;

  str += node[4].map(function (expr) {
    return that.indent + codegen(expr) + ';' + that.nl;
  }).join('');
  str += '}';

  return str;
};


