/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that = this, cases;

  codegen = this.process.bind(this);
  str = 'switch' + this.ws + '(' + codegen(node[1], indent) + ')' + this.ws + '{' + this.nl;
  cases = node[2].map(function (cas) {
    var head;
    if (cas.condition) {
      head = indent + that.indent + 'case ' + codegen(cas.condition, indent) + ':' + that.nl;
    } else {
      head = indent + that.indent + 'default:' + that.nl;
    }
    return head + body(codegen, indent + that.indent, that.indent, that.nl, cas.body);
  });
  str += cases.join('') + indent + '}';
  return str;
};
