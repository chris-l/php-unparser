/*jslint node: true, indent: 2 */
'use strict';

var identifier = require('./helper/identifier');

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var str = indent + 'use' + this.ws, items = [];
  var codegen = this.process.bind(this);
  node.traits.forEach(function(item) {
    items.push(
      codegen(item, indent)
    );
  });
  str += items.join(',' + this.ws);
  if (node.adaptations) {
    var glue = this.nl +  indent + this.indent;
    str += this.ws + '{' + glue;
    str += node.adaptations.map(function(item) {
      var str = '';
      if (item.trait) {
        str += codegen(item.trait, indent) + '::';
      }
      if (item.method) {
        str += item.method;
      }
      if (item.kind === 'traitprecedence') {
        str += ' insteadof ';// + codegen(item.insteadof);
        str += item.instead.map(identifier).join(', ');
      } else {
        str += ' as ';
        if (item.visibility) {
          str += item.visibility + ' ';
        }
        str += item.as;
      }
      return str + ';';
    }).join(glue) + this.nl;
    str += indent + '}';
  } else {
    str += ';';
  }
  return str + this.nl;
};
