/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (codegen, indent, nl, body) {
  var str;

  str = body.map(function (expr) {
    return indent + codegen(expr) + ';' + nl;
  }).join('');

  return str;
};
