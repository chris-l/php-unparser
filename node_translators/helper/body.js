/*jslint node: true, indent: 2 */
'use strict';
var noSemiColons = [
  'class', 'interface', 'trait', 'namespace', 'try',
  'if', 'switch', 'for', 'foreach', 'function', 'method',
  'while', 'doc', 'comment', 'label', 'declare',
  'usegroup', 'traituse', 'inline'
];
module.exports = function (codegen, currentIndent, indent, nl, body, isProgram) {
  var str, indentation;

  indentation = isProgram ? '' : currentIndent + indent;
  str = body.map(function (expr) {
    if (expr === null) {
      return '';
    }
    var line;
    if (expr.kind === 'label') {
      line = codegen(expr, indentation);
    } else {
      line = indentation + codegen(expr, indentation);
    }


    // This expressions don't require semicolons
    if (noSemiColons.indexOf(expr.kind) === -1) {
      line += ';';
    }

    return line + nl;
  }).join('');

  return str;
};
