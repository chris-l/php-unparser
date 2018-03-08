/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (node.alreadyParsed) {
    return '';
  }
  if (!node.isDoc && node.lines.length === 1 && node.lines[0].indexOf('\n') > -1) {
    node.isDoc = true;
    node.lines = ('\n' + node.lines[0] + '\n').split('\n');
  }

  if (node.isDoc) {
    var body = node.lines.join(this.nl + indent + ' * ');
    if (body.substring(body.length - 3) === ' * ') {
      body = body.substring(0, body.length - 3);
    }
    return this.nl + indent + '/** ' + body + ' */';
  }
  return this.nl + indent + '// ' + node.lines.join(this.nl + indent + '// ');
};
