/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (node.isDoc) {
    var body = node.lines.join(this.nl + indent + ' * ');
    if (body.substring(body.length - 3) === ' * ') {
      body = body.substring(0, body.length - 3);
    }
    return this.nl + indent + '/** ' + body + ' */';
  }
  return this.nl + indent + '// ' + node.lines.join(this.nl + indent + '// ');
};
