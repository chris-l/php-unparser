/*jslint node: true, indent: 2 */
'use strict';

var keywords = require('./helper/keywords');

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  if (node.length === 4) {
    // a class constant (name, value, flags)
    str = indent + keywords(node[3]);
    str += ' const ';
  } else {
    // a namespace constant (name, value)
    str = indent + 'const ';
  }

  str += node[1];
  str += this.ws + '=' + this.ws;
  str += codegen(node[2], indent) + ';';

  return str;
};
