/*jslint node: true, indent: 2 */
'use strict';

// name, type, value, isRef, isVariadic
function processElement(indent, ws, codegen) {
  return function (arg) {
    var str = '';

    if (arg[2]) { // type hint
      str += arg[2].join('\\') + ' ';
    }

    if (arg[4]) { // byref
      str += '&';
    }

    if (arg[5]) { // variadic
      str += '...';
    }

    str += arg[1]; // name

    if (arg[3]) { // default value
      str += ws + '=' + ws + codegen(arg[3], indent);
    }

    return str;
  };
}

module.exports = function (nodes, indent, self) {
  var codegen, args, space, listArgs;

  codegen = self.process.bind(self);
  args = nodes.map(processElement(indent, self.ws, codegen));
  listArgs = args.join(',' + self.ws);

  if (listArgs.length > 80) {
    space = self.nl + indent + self.indent;
    args = nodes.map(processElement(indent + self.indent, self.ws, codegen));
    listArgs = space + args.join(',' + space) + self.nl + indent;
  }

  return '(' + listArgs + ')';
};
