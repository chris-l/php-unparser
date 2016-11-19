/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node[1]) {
    return 'continue ' + codegen(node[1], indent);
  }

  return 'continue';
};
