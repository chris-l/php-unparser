/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var codegen, elements, that;
  codegen = this.process.bind(this);
  that = this;

  elements = node[1].map(function (ele) {
    var value = codegen(ele.value);
    if (ele.key) {
      return codegen(ele.key) + that.ws + '=>' + that.ws + value;
    }
    return value;
  });

  return 'Array(' + elements.join(',' + that.ws) + ')';
};

