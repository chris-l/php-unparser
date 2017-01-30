/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node, indent, opt) {
  var body = '';
  var codegen = this.process.bind(this);
  node.value.forEach(function(item) {
    if (item.kind === 'string') {
      body += item.value;
    } else {
      body += '{' + codegen(item, indent) + '}';
    }
  });
  if (node.type === 'heredoc') {
    return '<<<' + node.label + this.nl + body + node.label;
  }
  console.log(node);
  throw new Error('@todo');
  return JSON.stringify(node[1]);
};
