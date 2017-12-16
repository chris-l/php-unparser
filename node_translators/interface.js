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

  if (node.extends) {
    str += ' extends ' + node.extends.map(identifier).join(',' + this.ws);
  }

  // begin curly brace
  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  // interface body
  str += doBody.call(this, codegen, indent, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};
