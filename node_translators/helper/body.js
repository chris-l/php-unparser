/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (codegen, currentIndent, indent, nl, body, isProgram) {
  var str, indentation;

  indentation = isProgram ? '' : currentIndent + indent;
  str = body.map(function (expr) {
    var line = indentation + codegen(expr, indentation);

    // This expressions don't require semicolons
    if (['if', 'switch', 'function', 'while'].indexOf(expr[0]) === -1) {
      line += ';';
    }

    return line + nl;
  }).join('');

  return str;
};
