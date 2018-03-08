/*jslint node: true, indent: 2 */
'use strict';

var noSemiColons = [
  'class', 'interface', 'trait', 'namespace', 'try',
  'if', 'switch', 'for', 'foreach', 'function', 'method',
  'while', 'doc', 'comment', 'label', 'declare',
  'usegroup', 'traituse', 'inline', 'block'
];

module.exports = function (codegen, currentIndent, body, isProgram, dontIncreaseIndent) {

  var str, indentation, delimiter, that = this;

  // Set the rows delimiter
  delimiter = that.options.collapseEmptyLines ? '' : '\n';

  // Set the indentation
  if (dontIncreaseIndent) {
    indentation = currentIndent;
  } else {
    indentation = isProgram ? '' : currentIndent + that.indent;
  }

  // Force body as an array
  if (!Array.isArray(body)) {
    body = [body];
  }

  // Map body values
  str = body.map(function (expr, index) {
    var line, next;

    // Return empty string
    if (expr === null) {
      return '';
    }

    if (expr.kind === 'label') {
      line = codegen(expr, indentation);
    } else {
      line = indentation + codegen(expr, indentation);
    }

    // This expressions don't require semicolons
    if (noSemiColons.indexOf(expr.kind) === -1) {
      line += ';';
    }

    // Check if the next expression is a comment that should be
    // on the same line as this expression
    next = body[index + 1] || {};
    if (next.kind === 'doc' && next.loc && expr.loc && next.loc.start.line === expr.loc.start.line) {
      line += that.ws + codegen(next, '').trim();
      next.alreadyParsed = true; // prevent to parse again the comment
    }

    return line + that.nl;

  }).join(delimiter);

  // Return the generated string
  return str;
};
