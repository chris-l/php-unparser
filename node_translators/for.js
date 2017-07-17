/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str, body;

  body = require('./helper/body');
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

  str += body(
    codegen,
    indent,
    this.indent,
    this.nl,
    node.body.children || [node.body]
  );
  if (this.shortForm) {
    str += indent + 'endfor;';
  } else {
    str += indent + '}';
  }
  return str;
};
