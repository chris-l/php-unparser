/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

function addKeywords(x) {
  var out = '';

  if (x[2] === 2) {
    out += 'final ';
  }
  switch (x[0]) {
  case 0:
    out += 'public ';
    break;
  case 1:
    out += 'protected ';
    break;
  case 2:
    out += 'private ';
    break;
  }
  if (x[1] === 1) {
    out += 'static ';
  }
  return out;
}

module.exports = function (node, indent) {
  var codegen, str, that, sections;
  codegen = this.process.bind(this);
  sections = node[5];
  that = this;

  // Start
  str = node[2] === 188 ? 'abstract ' : '';
  str += 'class ' + node[1];

  if (node[3]) {
    str += ' extends ' + node[3].join('\\');
  }

  if (node[4]) {
    str += ' implements ' + node[4].map(function (x) { return x.join('\\'); }).join(',' + that.ws);
  }

  // begin curly brace
  str += this.nl + indent + '{' + this.nl;


  /**
   * Prepare constants
   */
  str += sections.constants.map(function (prop) {
    return indent + that.indent + 'const ' + prop[0][0] + that.ws + '=' +
      that.ws + codegen(prop[0][1], indent) + ';';
  }).join(this.nl) + this.nl;


  /**
   * Prepare properties
   */
  str += sections.properties.map(function (prop) {
    var out = indent + that.indent;
    out += addKeywords(prop[1]);
    out += prop[0][0];

    if (prop[0][1]) {
      out += that.ws + '=' + that.ws + codegen(prop[0][1], indent);
    }
    return out + ';';
  }).join(this.nl) + this.nl;


  /**
   * Prepare methods
   */
  str += '\n' + sections.methods.map(function (method) {
    var out = indent + that.indent;
    out += addKeywords(method[7]);
    out += codegen(method, indent + that.indent);
    return out;
  }).join(this.nl + this.nl) + this.nl;

  // end curly brace
  str += indent + '}\n';

  return str;
};

