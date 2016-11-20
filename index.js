/*jslint node: true, indent: 2 */
'use strict';
var CodeGen = require('./node_translators');

module.exports = function (ast, opts) {
  opts = opts || {};
  var codeGen = new CodeGen(opts.indent, opts.dontUseWhitespaces, opts.shortArray);
  return codeGen.process(ast, '');
};
