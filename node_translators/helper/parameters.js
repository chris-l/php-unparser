/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (args, indent, self) {
  var codegen, useArgs = [], space, raw;

  codegen = self.process.bind(self);

  function processElement(indent) {
    return function (arg) {
      return codegen(arg, indent);
    };
  }
  if (args && args.length > 0) {
    useArgs = args.map(processElement(indent));
  }
  raw = useArgs.join();
  if ((raw.indexOf("\n") > -1 && raw.substr(0, raw.indexOf("\n")).length > 80) || (raw.indexOf("\n") === -1 && raw.length > 80)) {
    useArgs = args.map(processElement(indent + self.indent));
    space = self.nl + indent + self.indent;
    args = space + useArgs.join(',' + space) + self.nl + indent;
  } else {
    args = useArgs.join(',' + self.ws);
  }
  return args;
};
