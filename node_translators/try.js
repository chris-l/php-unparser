/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var identifier = require('./helper/identifier');

function resolveExceptions(items) {
  var result = [], i;
  for (i = 0; i < items.length; i += 1) {
    result.push(identifier(items[i]));
  }
  return result.join('|');
}

module.exports = function (node, indent) {
  var codegen, str;


  codegen = this.process.bind(this);
  str = 'try' + this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';

  str += node.catches.map(function (except) {
    var out = this.ws + 'catch' + this.ws + '(' + resolveExceptions(except.what) + ' ' + codegen(except.variable) + ')' + this.ws + '{' + this.nl;
    out += doBody.call(this, codegen, indent, except.body.children);
    out += indent + '}';
    return out;
  }, this).join('');

  if (node.always) {
    str += this.ws + 'finally' + this.ws + '{' + this.nl;
    str += doBody.call(this, codegen, indent, node.always.children);
    str += indent + '}';
  }

  return str;
};
