/*jslint node: true, indent: 2 */
'use strict';

const CodeGen = require('./node_translators');

module.exports = function (ast, opts = {}) {  
  const codeGen = new CodeGen(opts);
  return codeGen.process(ast, '');
};
