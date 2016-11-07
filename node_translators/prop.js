/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen, prop;

  codegen = this.process.bind(this);
  prop = (function () {
    var value = node[2][1];

    if (node[2][0] === 'string') {
      if (value.indexOf('$') > -1 || /^[0-9]/.test(value)) {
        return "{'" + value + "'}";
      }
      return value;
    }
    return codegen(node[2]);
  }());

  return codegen(node[1]) + '->' + prop;
};

