/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that;
  codegen = this.process.bind(this);
  str = '';
  that = this;

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

  // class body
  str += doBody(codegen, indent, this.indent, this.nl, node[5]);

  // end curly brace
  str += indent + '}\n';

  return str;
};
