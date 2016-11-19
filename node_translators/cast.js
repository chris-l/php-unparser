/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;

  codegen = this.process.bind(this);
  switch (node[1]) {
  case 'boolean':
    str = '(bool)';
    break;
  case 'int':
    str = '(int)';
    break;
  case 'double':
    str = '(float)';
    break;
  case 'string':
    str = '(string)';
    break;
  case 'array':
    str = '(array)';
    break;
  case 'object':
    str = '(object)';
    break;
  }
  return str + codegen(node[2], indent);
};

