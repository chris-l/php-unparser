/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, body;
  codegen = this.process.bind(this);

  body = node[1].map(function (ele) {
    return codegen(ele, indent);
  }).join(',' + this.ws);
  body = 'list(' + body + ')';

  if (node[2]) {
    body += this.ws + '=' + this.ws + codegen(node[2], indent);
  }

  return body;
};
