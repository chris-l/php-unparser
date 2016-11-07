/*jslint node: true, indent: 2 */
'use strict';
var CodeGen = require('./node_translators');

module.exports = function (ast, indent, dontUseWhitespaces) {
  var codeGen = new CodeGen(indent, dontUseWhitespaces);
  return codeGen.process(ast);
};
