/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, useArgs = [], space, args, raw;

  codegen = this.process.bind(this);

  function processElement(indent) {
    return function (arg) {
      return codegen(arg, indent);
    };
  }
  if (node[2] && node[2].length > 0) {
    useArgs = node[2].map(processElement(indent));
  }
  raw = useArgs.join();
  if ((raw.indexOf("\n") > -1 && raw.substr(0, raw.indexOf("\n")).length > 80) || (raw.indexOf("\n") === -1 && raw.length > 80)) {
    useArgs = node[2].map(processElement(indent + this.indent));
    space = this.nl + indent + this.indent;
    args = space + useArgs.join(',' + space) + this.nl + indent;
  } else {
    args = useArgs.join(',' + this.ws);
  }

  return codegen(node[1], indent) + '(' + args + ')';
};

