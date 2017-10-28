/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;

  codegen = this.process.bind(this);
  str = 'for' + this.ws + '(';

  if (node.init) {
    str += node.init.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ';' + this.ws;

  if (node.test) {
    str += node.test.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ';' + this.ws;

  if (node.increment) {
    str += node.increment.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ')';
  if (this.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children || [node.body]);

  if (this.shortForm) {
    str += indent + 'endfor;';
  } else {
    str += indent + '}';
  }
  return str;
};
