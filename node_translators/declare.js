/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str, items = [], k;
  codegen = this.process.bind(this);
  for (k in node.what) {
    if (node.what.hasOwnProperty(k) && node.what[k]) {
      items.push(k + '=' + codegen(node.what[k]));
    }
  }
  str = 'declare(' + items.join(',') + ')';
  if (node.mode !== 'none') {
    str += this.ws + '{' + this.nl;
    str += require('./helper/body')(
      codegen,
      indent,
      this.indent,
      this.nl,
      node.children
    );
    str += indent + '}' + this.nl;
  } else {
    str += ';' + this.nl;
    str += require('./helper/body')(
      codegen,
      indent,
      '',
      this.nl,
      node.children
    );
  }
  return str;
};
