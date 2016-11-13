/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, prop;

  codegen = this.process.bind(this);
  prop = (function () {
    var value = node[2][1];

    if (node[2][0] === 'string' || node[2][0] === 'number') {
      if (typeof value === 'number') {
        value = String(value);
      }
      if (value.indexOf('$') > -1 || /^[0-9]/.test(value) || value.indexOf('-') > -1) {
        return "{'" + value + "'}";
      }
      return value;
    }
    if (node[2][0] === 'var') {
      return codegen(node[2], indent);
    }
    return '{' + codegen(node[2], indent) + '}';
  }());

  return codegen(node[1], indent) + '->' + prop;
};

