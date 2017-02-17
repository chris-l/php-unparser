/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node) {
  return '<<<\'' + node.label + '\'' + this.nl + node.value + this.nl + node.label;
};
