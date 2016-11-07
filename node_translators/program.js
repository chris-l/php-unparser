/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen = this.process.bind(this);

  return node[1]
    .map(codegen)
    .map(function (x) {
      return x + ';';
    })
    .join(this.nl);
};

