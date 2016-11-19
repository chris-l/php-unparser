/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  switch (node[1]) {
  case '&':
    node[1] = '&&';
    break;
  case '|':
    node[1] = '||';
    break;
  case '^':
    node[1] = 'xor';
    break;
  case '~':
    node[1] = '==';
    break;
  case '=':
    node[1] = '===';
    break;
  case '!=':
    node[1] = '!==';
    break;
  case '!~':
    node[1] = '!=';
    break;
  }
  return codegen(node[2], indent) + this.ws + node[1] + this.ws + codegen(node[3], indent);
};

