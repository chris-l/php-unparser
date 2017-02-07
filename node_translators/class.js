/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that;
  codegen = this.process.bind(this);
  str = '';
  that = this;

  // Start
  if (node.isAbstract) {
    str += 'abstract ';
  } else if (node.isFinal) {
    str += 'final ';
  }

  str += 'class ' + node.name;

  if (node.extends) {
    str += ' extends ' + codegen(node.extends, indent);
  }

  if (node.implements) {
    str += ' implements ' + node.implements.map(function (x) {
      return codegen(x, indent);
    }).join(',' + that.ws);
  }

  // begin curly brace
  str += this.nl + indent + '{' + this.nl;

  // class body
  str += doBody(codegen, indent, this.indent, this.nl, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};
