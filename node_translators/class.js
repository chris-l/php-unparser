/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var addKeywords = require('./helper/keywords');

module.exports = function (node, indent) {
  var codegen, str, that, sections;
  codegen = this.process.bind(this);
  sections = node[5];
  that = this;
  str = '';

  // Start
  if (node[2] === 1) {
    str += 'abstract ';
  } else if (node[2] === -1) {
    str += 'final ';
  }

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
    var out = indent + that.indent;

    // handle doc decoration
    if (prop[0] === 'doc') {
      out += prop[1] + that.nl + indent + that.indent;
      prop = prop[2];
    }

    return out + 'const ' + prop[0][0] + that.ws + '=' +
      that.ws + codegen(prop[0][1], indent) + ';';
  }).join(this.nl) + this.nl;


  /**
   * Prepare properties
   */
  str += sections.properties.map(function (prop) {
    var out = indent + that.indent;

    // handle doc decoration
    if (prop[0] === 'doc') {
      out += prop[1] + that.nl + indent + that.indent;
      prop = prop[2];
    }

    out += addKeywords(prop[2]);
    out += prop[0];

    if (prop[1]) {
      out += that.ws + '=' + that.ws + codegen(prop[1], indent + that.indent);
    }
    return out + ';';
  }).join(this.nl) + this.nl;


  /**
   * Prepare methods
   */
  str += '\n' + sections.methods.map(function (method) {
    var out = indent + that.indent;

    // handle doc decoration
    if (method[0] === 'doc') {
      out += method[1] + that.nl + indent + that.indent;
      method = method[2];
    }

    // It lacks body. Is an abstract method.
    if (method.length === 7) {
      out += addKeywords(method[6]);
      out += codegen(method.slice(0, 6), indent + that.indent, { notClosure : true });
      return out;
    }

    if (method[0] === 'comment' && method[2][0] === 'function') {
      out += codegen(method, indent + that.indent, { notClosure : true });
      out += that.nl + indent + that.indent;
      out += addKeywords(method[2][7]);
      out += codegen(method[2], indent + that.indent, { notClosure : true });
      return out;
    }

    out += addKeywords(method[7]);
    out += codegen(method, indent + that.indent, { notClosure : true });
    return out;
  }).join(this.nl + this.nl) + this.nl;

  // end curly brace
  str += indent + '}\n';

  return str;
};
