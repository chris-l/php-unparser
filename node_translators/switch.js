/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node) {
  var codegen, str, that = this, cases;

  codegen = this.process.bind(this);
  str = 'switch' + this.ws + '(' + codegen(node[1]) + ')' + this.ws + '{' + this.nl;
  cases = node[2].map(function (cas) {
    var head;
    if (cas.condition) {
      head = 'case ' + codegen(cas.condition) + ':' + that.nl;
    } else {
      head = 'default:' + that.nl;
    }
    return head + body(codegen, that.indent, that.nl, cas.body);
  });
  str += cases.join('') + '}';
  return str;
};
