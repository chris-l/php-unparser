/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, decl = [], that = this;
  codegen = this.process.bind(this);
  node[1].forEach(function (item, index) {
    decl.push(
      (index === 0 ?
            indent + 'const ' :
            that.nl + indent + '      ')
        + item[0]  // constant name
        + that.ws + '=' + that.ws +
        codegen(item[1], indent) // constant value
    );
  });
  return decl.join(',' + this.ws);
};
