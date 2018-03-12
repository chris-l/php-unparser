/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  var str = params(node.arguments, indent, this);

  if (node.isInlineEcho) {
    return str + this.ws + '?>';
  }

  return 'echo ' + str;
};
