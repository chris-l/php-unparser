/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str, doBody;

  doBody = require('./helper/body');

  codegen = this.process.bind(this);
  str = 'try' + this.ws + '{' + this.nl;
  str += doBody(codegen, indent, this.indent, this.nl, node[1]);
  str += indent + '}';

  str += node[2].map(function (except) {
    var out = this.ws + 'catch' + this.ws + '(' + except.exception + ' ' + codegen(except.as) + ')' + this.ws + '{' + this.nl;
    out += doBody(codegen, indent, this.indent, this.nl, except.body);
    out += indent + '}';
    return out;
  }, this).join('');

  if (node[3]) {
    str += this.ws + 'finally' + this.ws + '{' + this.nl;
    str += doBody(codegen, indent, this.indent, this.nl, node[3]);
    str += indent + '}';
  }

  return str;
};

