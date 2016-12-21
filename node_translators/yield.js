/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;
  str = 'yield';
  codegen = this.process.bind(this);
  if (node[1]) {
    // yield $value
    str += ' ' + codegen(node[1], indent);
    if (node[2]) {
      // yield $value => $key
      str += ' => ' + codegen(node[2], indent);
    }
  }
  return str;
};
