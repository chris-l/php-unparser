/*jslint node: true, indent: 2 */
'use strict';

// name, type, value, isRef, isVariadic
function processElement(indent, ws, codegen) {
  return function (arg) {
    var str = '';

    if (arg.type) { // type hint
      str += codegen(arg.type, indent) + ws;
    }

    if (arg.byref) { // byref
      str += '&';
    }

    if (arg.variadic) { // variadic
      str += '...';
    }

    str += '$' + arg.name; // name

    if (arg.value) { // default value
      str += ws + '=' + ws + codegen(arg.value, indent);
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
