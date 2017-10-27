/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function processIf(node, indent, inner) {
  var codegen, str, that = this;

  codegen = this.process.bind(this);

  str = 'if' + this.ws + '(' + codegen(node.test, indent) + ')';

  if (node.body) {
    if (node.shortForm) {
      str += ':' + this.nl;
    } else {
      str += this.ws + '{' + this.nl;
    }

    str += doBody.call(this, codegen, indent, node.body.children || [node.body]);

    if (!node.shortForm) {
      str += indent + '}';
    }
  } else if (!node.alternate) {
    return str + ';';
  }

  if (node.alternate) {
    str += (function () {
      var out = '';
      // is an "elseif"
      if (node.alternate.kind === 'if') {
        if (node.shortForm) {
          return indent + 'else' + processIf.call(that, node.alternate, indent, true);
        }
        return that.ws + 'else' + processIf.call(that, node.alternate, indent, true);
      }

      // is an "else"
      if (node.shortForm) {
        out += indent + 'else:' + that.nl;
      } else {
        out += that.ws + 'else' + that.ws + '{' + that.nl;
      }

      out += doBody.call(that, codegen, indent, node.alternate.children || [node.alternate]);

      if (!node.shortForm) {
        out += indent + '}' + that.nl;
      }
      return out;
    }());
  }

  if (node.shortForm && !inner) {
    str += indent + 'endif;' + this.nl;
  }
  return str;
};
