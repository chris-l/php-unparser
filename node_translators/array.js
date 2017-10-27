/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, elements, that, body, space;
  codegen = this.process.bind(this);
  that = this;

  function processElement(indent) {
    return function (ele) {
      var value = codegen(ele.value, indent);
      if (ele.key) {
        return codegen(ele.key, indent) + that.ws + '=>' + that.ws + value;
      }
      return value;
    };
  }

  elements = node.items.map(processElement(indent));

  if (elements.join().length > 80) {
    space = that.nl + indent + this.indent;
    elements = node.items.map(processElement(indent + this.indent));
    body = space + elements.join(',' + space) + that.nl + indent;
  } else {
    body = elements.join(',' + that.ws);
  }

  if (node.shortForm || this.shortArray) {
    return '[' + body + ']';
  }
  return 'array(' + body + ')';
};
