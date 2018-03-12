/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var str;

  str = node.omitClosingTag ? '' : '?>';
  str += node.value;

  if (node.isInlineEcho) {
    return str + '<?=' + this.ws;
  }

  return str + (node.isLast ? '' : '<?php' + this.nl);
};
