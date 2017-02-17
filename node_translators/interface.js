/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var identifier = require('./helper/identifier');

module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);

  // Start
  if (node.isFinal) {
    str = 'final ';
  }
  str += 'interface ' + node.name;

  if (node.implements) {
    str += ' implements ' + node.implements.map(identifier).join(',' + this.ws);
  }

  // begin curly brace
  str += this.nl + indent + '{' + this.nl;

  // interface body
  str += doBody(codegen, indent, this.indent, this.nl, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};
