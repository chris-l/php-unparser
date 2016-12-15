/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var addKeywords = require('./helper/keywords');

module.exports = function (node, indent) {
  var codegen, str, that, sections;
  codegen = this.process.bind(this);
  sections = node[4];
  that = this;

  // Start
  str = node[2] === -1 ? 'final ' : '';
  str += 'interface ' + node[1];

  if (node[3]) {
    str += ' implements ' + node[3].map(function (x) {
      return x.join('\\');
    }).join(',' + that.ws);
  }

  // begin curly brace
  str += this.nl + indent + '{' + this.nl;

  /**
   * Prepare constants
   */
  str += sections.constants.map(function (prop) {
    var out = indent + that.indent;

    // handle doc decoration
    if (prop[0] === 'doc' || prop[0] === 'comment') {
      out += prop[1] + that.nl + indent + that.indent;
      prop = prop[2];
    }

    return out + 'const ' + prop[0] + that.ws + '=' +
      that.ws + codegen(prop[1], indent) + ';';
  }).join(this.nl) + this.nl;

  /**
   * Prepare methods
   */
  str += '\n' + sections.methods.map(function (method) {
    var out = indent + that.indent;

    // handle doc decoration
    if (method[0] === 'doc' || method[0] === 'comment') {
      out += method[1] + that.nl + indent + that.indent;
      method = method[2];
    }

    out += addKeywords(method[6]);
    out += codegen(method.slice(0, 6), indent + that.indent, { notClosure : true });
    return out;
  }).join(this.nl + this.nl) + this.nl;

  // end curly brace
  str += indent + '}\n';

  return str;
};
