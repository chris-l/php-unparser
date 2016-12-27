/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var addKeywords = require('./helper/keywords');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  str = 'trait ' + node[1];

  if (node[2]) {
    str += ' extends ' + node[2].join('\\');
  }

  if (node[3]) {
    str += ' implements ' + node[3].map(function (x) { return x.join('\\'); }).join(',' + this.ws);
  }

  // begin curly brace
  str += this.nl + indent + '{' + this.nl;

  // trait body
  str += doBody(codegen, indent, this.indent, this.nl, node[4]);

  // end curly brace
  str += indent + '}\n';

  return str;
};
