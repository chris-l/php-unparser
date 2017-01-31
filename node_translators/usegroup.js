/*jslint node: true, indent: 2 */
'use strict';

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var str = indent + 'use' + this.ws, items = [];
  node.items.forEach(function(item) {
    var useItem = item.name.name;
    if (item.alias) {
      useItem += ' as ' + item.alias;
    }
    useItem += ';';
    items.push(useItem);
  });
  if (node.items.length > 1) {
    var glue = this.nl +  indent + this.indent;
    str += node.name.name + this.ws + '{' + glue;
    str += items.join(glue) + this.nl;
    str += indent + '};' + this.nl;
  } else {
    str += items[0] + ';' + this.nl;
  }
  return str;
};
