/*jslint node: true, indent: 2 */
'use strict';

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var str = 'use' + this.ws, items = [], glue;
  if (node.type) {
    str += node.type + this.ws;
  }
  node.items.forEach(function (item) {
    var useItem = item.name;
    if (item.alias) {
      useItem += ' as ' + item.alias;
    }
    useItem += ';';
    items.push(useItem);
  });
  if (node.items.length > 1) {
    glue = this.nl +  indent + this.indent;
    str += node.name + this.ws + '{' + glue;
    str += items.join(glue) + this.nl;
    str += indent + '};' + this.nl;
  } else {
    str += items[0] + this.nl;
  }
  return str;
};
