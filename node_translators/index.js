/*jslint node: true, indent: 2, stupid:true, nomen:true */
'use strict';
var fs      = require('fs');

function CodeGen(indent, dontUseWhitespaces) {
  this.ws = ' ';
  if (dontUseWhitespaces) {
    this.ws = '';
  }
  this.indent = typeof indent === 'string'  ? indent : '    ';
  this.nl     = this.indent !== '' ? '\n' : '';

  this.process = function (node, indent, opt) {

    if (node === null) {
      return indent;
    }

    if (Array.isArray(node)) {
      if (node.length === 0) {
        return indent;
      }
      if (typeof this[node[0]] === 'function') {
        return this[node[0]](node, indent, opt);
      }
    }
    console.log(node);
    console.log(JSON.stringify(node, null, '  '));
    console.log((new Error()).stack);
    process.exit();
  };
}
fs.readdirSync(__dirname).forEach(function (file) {
  if (/^[\w._\-]+\.js$/.test(file) && file !== 'index.js') {
    var name = file.replace('.js', '');
    CodeGen.prototype[name] = require('./' + name);
  }
});

module.exports = CodeGen;
