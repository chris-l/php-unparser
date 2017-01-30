/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, prop;
  codegen = this.process.bind(this);
  prop = (function () {
    var child = node.offset;

    if (child.kind === 'constref') {
      return child.name;
    }

    if (child.kind === 'string' || child.kind === 'number') {
      if (typeof child.value === 'number') {
        child.value = String(child.value);
      }
      if (child.value.indexOf('$') > -1 || /^[0-9]/.test(child.value) || child.value.indexOf('-') > -1) {
        return "{'" + child.value + "'}";
      }
      return child.value;
    }
    if (node.kind === 'var') {
      return codegen(child, indent);
    }
    return '{' + codegen(child, indent) + '}';
  }());

  return codegen(node.what, indent) + '->' + prop;
};
