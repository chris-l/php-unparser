/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, that, body;
  codegen = this.process.bind(this);
  that = this;

  body = node[1].map(function (ele) {
    return codegen(ele, indent);
  }).join(',' + that.ws);
  return 'list(' + body + ')' + this.ws + '=' + this.ws + codegen(node[2], indent);
};

