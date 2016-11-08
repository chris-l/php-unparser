/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node) {
  var codegen = this.process.bind(this);

  return body(codegen, '', this.indent, this.nl, node[1], true);
};

