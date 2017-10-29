/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that = this, cases;

  codegen = this.process.bind(this);
  str = 'switch' + this.ws + '(' + codegen(node.test, indent) + ')';
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }
  cases = node.body.children.map(function (item) {
    var head;
    if (item.test) {
      head = indent + that.indent + 'case ' + codegen(item.test, indent) + ':' + that.nl;
    } else {
      head = indent + that.indent + 'default:' + that.nl;
    }
    if (item.body) {
      head += doBody.call(that, codegen, indent + that.indent, item.body.children || [item.body]);
    }
    return head;
  });
  str += cases.join('');
  if (node.shortForm) {
    str += indent + 'endswitch;';
  } else {
    str += indent + '}';
  }
  return str;
};
