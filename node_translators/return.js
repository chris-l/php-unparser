/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen;
  codegen = this.process.bind(this);

  if (node[1] === null) {
    return 'return';
  }
  return 'return ' + codegen(node[1]);
};

