/*jslint node: true, indent: 2 */
'use strict';

function processElement(indent, ws, codegen) {
  return function (arg) {
    if (arg[2].length > 0) {
      return arg[0] + ws + '=' + ws + codegen(arg[2], indent);
    }
    return arg[0];
  };
}

module.exports = function (nodes, indent, self) {
  var codegen, args, space, listArgs;

  codegen = self.process.bind(self);
  args = nodes.map(processElement(indent, self.ws, codegen));
  if (args.join().length > 80) {
    space = self.nl + indent + self.indent;
    args = nodes.map(processElement(indent + self.indent, self.ws, codegen));
    listArgs = space + args.join(',' + space) + self.nl + indent;
  } else {
    listArgs = args.join(',' + self.ws);
  }

  return '(' + listArgs + ')';
};
