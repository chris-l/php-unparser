/*jslint node: true, indent: 2 */
'use strict';

var noSemiColons = [
  'class', 'interface', 'trait', 'namespace', 'try',
  'if', 'switch', 'for', 'foreach', 'function', 'method',
  'while', 'doc', 'comment', 'label', 'declare',
  'usegroup', 'traituse', 'inline', 'block'
];

module.exports = function (codegen, currentIndent, body, isProgram) {

  var str, indentation, delimiter, that = this;

  // Set the rows delimiter
  delimiter = that.options.collapseEmptyLines ? '' : '\n';

  // Set the indentation
  indentation = isProgram ? '' : currentIndent + that.indent;

  // Force body as an array
  if (!Array.isArray(body)) {
    body = [body];
  }

  // Map body values
  str = body.map(function (expr) {

    // Return empty string
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

    return line + that.nl;

  }).join(delimiter);

  // Return the generated string
  return str;
};
