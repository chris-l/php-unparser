(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.phpUnparser = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var CodeGen = require('./node_translators');

module.exports = function (ast, opts) {
  opts = opts || {};
  var codeGen = new CodeGen(opts);
  return codeGen.process(ast, '');
};

},{"./node_translators":37}],2:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, elements, that, body, space;
  codegen = this.process.bind(this);
  that = this;

  function processElement(indent) {
    return function (ele) {
      var value = codegen(ele.value, indent);
      if (ele.key) {
        return codegen(ele.key, indent) + that.ws + '=>' + that.ws + value;
      }
      return value;
    };
  }

  elements = node.items.map(processElement(indent));

  if (elements.join().length > 80) {
    space = that.nl + indent + this.indent;
    elements = node.items.map(processElement(indent + this.indent));
    body = space + elements.join(',' + space) + that.nl + indent;
  } else {
    body = elements.join(',' + that.ws);
  }

  if (node.shortForm || this.shortArray) {
    return '[' + body + ']';
  }
  return 'array(' + body + ')';
};

},{}],3:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node.left, indent) + this.ws + node.operator + this.ws + codegen(node.right, indent);
};

},{}],4:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str, firstpart, secondpart;
  codegen = this.process.bind(this);

  firstpart = codegen(node.left, indent);
  secondpart = codegen(node.right, indent);
  str = firstpart + this.ws + node.type + this.ws + secondpart;

  if (str.length > 80) {
    str = firstpart + this.ws + node.type + this.nl + indent + this.indent + secondpart;
  }

  return str;
};

},{}],5:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

// block
module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);

  str += this.nl + indent + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.children);
  str += indent + '}' + this.nl;

  return str;
};

},{"./helper/body":31}],6:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return node.value ? 'true' : 'false';
};

},{}],7:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (node.level) {
    var codegen = this.process.bind(this);
    return 'break ' + codegen(node.level, indent);
  }
  return 'break';
};

},{}],8:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node.what, indent) +
    '(' + params(node.arguments, indent, this) + ')';
};

},{"./helper/parameters":33}],9:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;
  codegen = this.process.bind(this);
  return '(' + node.type + ')' + codegen(node.what, indent);
};

},{}],10:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that;
  codegen = this.process.bind(this);
  str = '';
  that = this;

  // Start
  if (node.isAbstract) {
    str += 'abstract ';
  } else if (node.isFinal) {
    str += 'final ';
  }

  str += 'class';
  if (node.name) {
    str += ' ' + node.name;
  }

  if (node.extends) {
    str += ' extends ' + codegen(node.extends, indent);
  }

  if (node.implements) {
    str += ' implements ' + node.implements.map(function (x) {
      return codegen(x, indent);
    }).join(',' + that.ws);
  }

  // begin curly brace
  if (node.name) {
    if (this.options.bracketsNewLine) {
      str += this.nl + indent + '{' + this.nl;
    } else {
      str += this.ws + '{' + this.nl;
    }
  } else {
    str += this.ws + '{' + this.nl;
  }


  // class body
  str += doBody.call(this, codegen, indent, node.body);

  // end curly brace
  str += indent + '}';
  if (node.name) {
    str += this.nl;
  }

  return str;
};

},{"./helper/body":31}],11:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);
  if (node.visibility) {
    str += node.visibility + ' ';
  }
  str += 'const ';
  str += node.name;
  if (node.value) {
    str += this.ws + '=' + this.ws;
    str += codegen(node.value, indent);
  }
  return str;
};

},{}],12:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;
  codegen = this.process.bind(this);
  return 'clone ' + codegen(node.what, indent);
};

},{}],13:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// params, isRef, use, returnType
module.exports = function (node, indent) {
  var codegen, str, useArgs;
  codegen = this.process.bind(this);

  // function header
  str = 'function' + this.ws;
  if (node.byref) {
    str += '&';
  }
  str += args(node.arguments, indent, this);

  // use statement
  if (node.uses && node.uses.length > 0) {
    useArgs = node.uses.map(function (arg) {
      return (arg.byref ? '&$' : '$') + arg.name;
    });
    str += this.ws + 'use' + this.ws + '(' + useArgs.join(',' + this.ws) + ')';
  }

  // php7 / return type
  if (node.type) {
    str += this.ws + ':' + this.ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  str += this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';
  return str;
};

},{"./helper/arguments":30,"./helper/body":31,"./helper/identifier":32}],14:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

/**
 * Constant declaration
 */
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  // a namespace constant (name, value)
  str = 'const ';
  str += node.name;
  str += this.ws + '=' + this.ws;
  str += codegen(node.value, indent);

  return str;
};

},{}],15:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var identifier = require('./helper/identifier');
/**
 * Constant usage
 */
module.exports = function (node) {
  if (typeof node.name === 'string') {
    return identifier(node);
  }
  return identifier(node.name);
};

},{"./helper/identifier":32}],16:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  if (node.level) {
    return 'continue ' + codegen(node.level, indent);
  }

  return 'continue';
};

},{}],17:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, items = [], k;
  codegen = this.process.bind(this);
  for (k in node.what) {
    if (node.what.hasOwnProperty(k) && node.what[k]) {
      items.push(k + this.ws + '=' + this.ws + codegen(node.what[k]));
    }
  }
  str = 'declare(' + items.join(',' + this.ws) + ')';
  if (node.mode !== 'none') {
    str += this.ws + '{' + this.nl;
    str += doBody.call(this, codegen, indent, node.children);
    str += indent + '}' + this.nl;
  } else {
    str += ';' + this.nl;
    str += doBody.call(this, codegen, indent, node.children, true);
  }
  return str;
};

},{"./helper/body":31}],18:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = 'do' + this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}' + this.ws + 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  return str;
};

},{"./helper/body":31}],19:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var self = this, union, body;

  if (node.alreadyParsed) {
    return '';
  }

  if (node.isDoc) {
    body = node.lines.join(this.nl + indent + ' * ');
    if (body.substring(body.length - 3) === ' * ') {
      body = body.substring(0, body.length - 3);
    }
    return this.nl + indent + '/** ' + body + ' */';
  }

  union = self.nl + indent + self.ws + self.ws;
  return node.lines.reduce(function (acc, line) {

    if (line.indexOf('\n') > -1) {
      return acc.concat('/*' + line.split("\n").join(union) + '*/');
    }

    return acc.concat('// ' + line);
  }, []).join(self.nl + indent);

};

},{}],20:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  var str = params(node.arguments, indent, this);

  if (node.isInlineEcho) {
    return str + this.ws + '?>';
  }

  return 'echo ' + str;
};

},{"./helper/parameters":33}],21:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'empty(' + codegen(node.arguments[0], indent) + ')';
};

},{}],22:[function(require,module,exports){
/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node, indent, opt) {
  var body = '', codegen = this.process.bind(this);

  node.value.forEach(function (item) {
    if (item.kind === 'string') {
      body += item.value;
    } else {
      body += '{' + codegen(item, indent) + '}';
    }
  });

  if (node.type === 'heredoc') {
    return '<<<' + node.label + this.nl + body + node.label;
  }

  if (node.type === 'nowdoc') {
    return '<<<\'' + node.label + '\'' + this.nl + body + node.label;
  }

  if (node.type === 'shell') {
    return '`' + body + '`';
  }

  if (node.isDoubleQuote) {
    return '"' + body + '"';
  }

  return '\'' + body + '\'';
};

},{}],23:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'eval(' + codegen(node.source, indent) + ')';
};

},{}],24:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

/**
 * Exit statement
 */
module.exports = function (node, indent) {
  var codegen;
  codegen = this.process.bind(this);
  if (node.status === null) {
    return 'exit';
  }
  return 'exit(' + codegen(node.status, indent) + ')';
};

},{}],25:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;

  codegen = this.process.bind(this);
  str = 'for' + this.ws + '(';

  if (node.init) {
    str += node.init.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ';' + this.ws;

  if (node.test) {
    str += node.test.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ';' + this.ws;

  if (node.increment) {
    str += node.increment.map(function (x) {
      if (x) {
        return codegen(x, indent);
      }
      return '';
    }).join(',' + this.ws);
  }
  str += ')';
  if (this.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children || [node.body]);

  if (this.shortForm) {
    str += indent + 'endfor;';
  } else {
    str += indent + '}';
  }
  return str;
};

},{"./helper/body":31}],26:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  str = 'foreach' + this.ws + '(' + codegen(node.source, indent) + this.ws + 'as' + this.ws;
  if (node.key) {
    str += codegen(node.key, indent) + this.ws + '=>' + this.ws;
  }
  str += codegen(node.value, indent) + ')';
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children || [node.body]);
  if (node.shortForm) {
    str += indent + 'endforeach;';
  } else {
    str += indent + '}';
  }
  return str;
};

},{"./helper/body":31}],27:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// name, params, isRef, returnType, body
module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  str = 'function ';
  if (node.byref) {
    str += '&';
  }
  str += node.name;
  str += args(node.arguments, indent, this);

  // php7 / return type
  if (node.type) {
    str += this.ws + ':' + this.ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}' + this.nl;

  return str;
};

},{"./helper/arguments":30,"./helper/body":31,"./helper/identifier":32}],28:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'global ' + node.items.map(function (x) {
    return codegen(x, indent);
  }).join(',' + this.ws);
};

},{}],29:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return 'goto ' + node.label;
};

},{}],30:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

// name, type, value, isRef, isVariadic
function processElement(indent, ws, codegen) {
  return function (arg) {
    var str = '';

    if (arg.nullable) {
      str += '?';
    }

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

},{}],31:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var noSemiColons = [
  'class', 'interface', 'trait', 'namespace', 'try',
  'if', 'switch', 'for', 'foreach', 'function', 'method',
  'while', 'doc', 'comment', 'label', 'declare',
  'usegroup', 'traituse', 'inline', 'block'
];

module.exports = function (codegen, currentIndent, body, isProgram, dontIncreaseIndent) {

  var str = '', expr, i, indentation, delimiter, that = this, line, next, after, dontUseNewLine, isInlineEcho;

  // Set the rows delimiter
  delimiter = that.options.collapseEmptyLines ? '' : '\n';

  // Set the indentation
  if (dontIncreaseIndent) {
    indentation = currentIndent;
  } else {
    indentation = isProgram ? '' : currentIndent + that.indent;
  }

  // Force body as an array
  if (!Array.isArray(body)) {
    body = [body];
  }

  for (i = 0; i < body.length; i += 1) {
    expr = body[i];
    next = body[i + 1] || {};
    after = body[i + 2] || {};

    // Return empty string
    if (expr !== null) {


      /**
       * If this expression is an inline, the next is an echo, and the one after
       * is another expression inline, treat it as an inline echo
       */
      if (expr.kind === 'inline' && next.kind === 'echo' && after.kind === 'inline') {
        expr.isInlineEcho = true;
        next.isInlineEcho = true;
        after.omitClosingTag = true;
        dontUseNewLine = true;
      }


      // Is this expr the echo of an inline echo?
      isInlineEcho = expr.kind === 'echo' && expr.isInlineEcho === true;

      if (expr.kind === 'label' || isInlineEcho || expr.omitClosingTag) {
        line = codegen(expr, indentation);
      } else {
        line = indentation + codegen(expr, indentation);
      }

      // This expressions don't require semicolons
      if (noSemiColons.indexOf(expr.kind) === -1 && !isInlineEcho) {
        line += ';';
      }

      // Check if the next expression is a comment that should be
      // on the same line as this expression
      if (next.kind === 'doc' && next.loc && expr.loc && next.loc.start.line === expr.loc.start.line) {
        line += that.ws + codegen(next, '').trim();
        next.alreadyParsed = true; // prevent to parse again the comment
      }


      str += line;
      if (!dontUseNewLine && !isInlineEcho) {
        str += that.nl + delimiter;
      }
    }
  }

  // Return the generated string
  return str;
};

},{}],32:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function identifier(id) {
  if (id.resolution === 'rn') {
    return 'namespace\\' + id.name;
  }
  return id.name;
};

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  if (node.resolution === 'rn') {
    return 'namespace\\' + node.name;
  }
  return node.name;
};

},{}],35:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function processIf(node, indent, inner) {
  var codegen, str, that = this;

  codegen = this.process.bind(this);

  str = 'if' + this.ws + '(' + codegen(node.test, indent) + ')';

  if (node.body) {
    if (node.shortForm) {
      str += ':' + this.nl;
    } else {
      str += this.ws + '{' + this.nl;
    }

    str += doBody.call(this, codegen, indent, node.body.children || [node.body]);

    if (!node.shortForm) {
      str += indent + '}';
    }
  } else if (!node.alternate) {
    return str + ';';
  }

  if (node.alternate) {
    str += (function () {
      var out = '';
      // is an "elseif"
      if (node.alternate.kind === 'if') {
        if (node.shortForm) {
          return indent + 'else' + processIf.call(that, node.alternate, indent, true);
        }
        return that.ws + 'else' + processIf.call(that, node.alternate, indent, true);
      }

      // is an "else"
      if (node.shortForm) {
        out += indent + 'else:' + that.nl;
      } else {
        out += that.ws + 'else' + that.ws + '{' + that.nl;
      }

      out += doBody.call(that, codegen, indent, node.alternate.children || [node.alternate]);

      if (!node.shortForm) {
        out += indent + '}' + that.nl;
      }
      return out;
    }());
  }

  if (node.shortForm && !inner) {
    str += indent + 'endif;' + this.nl;
  }
  return str;
};

},{"./helper/body":31}],36:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var str, codegen;
  str = node.require ? 'require' : 'include';
  if (node.once) {
    str += '_once';
  }
  codegen = this.process.bind(this);
  return str + ' ' + codegen(node.target, indent);
};

},{}],37:[function(require,module,exports){
/*jslint node: true, indent: 2, nomen:true, evil: true */
'use strict';

var defaults = {
  indent: '    ',
  dontUseWhitespaces: false,
  shortArray: false,
  bracketsNewLine: true,
  forceNamespaceBrackets: false,
  collapseEmptyLines: true
};

function CodeGen(options) {

  // Get options
  this.options = Object.assign({}, defaults, options);
  this.ws = this.options.dontUseWhitespaces ? '' : ' ';
  this.indent = typeof this.options.indent === 'string' ? this.options.indent : '    ';
  this.nl = this.indent !== '' ? '\n' : '';
  this.shortArray = this.options.shortArray || false;
  this.forceNamespaceBrackets = this.options.forceNamespaceBrackets || false;

  this.process = function (node, indent) {
    var err;

    if (node === null) {
      return indent;
    }

    if (node && node.kind) {
      if (typeof this[node.kind] === 'function') {
        return this[node.kind](node, indent);
      }
      err = new Error(
        'Unhandled node type [' + node.kind + ']' + (
          node.loc ? ' at line ' + node.loc.start.line : ''
        )
      );
    } else {
      console.log('Node:', node);
      console.log('Node kind:', node.kind);
      err = new Error('Bad AST structure');
    }
    err.node = node;
    throw err;
  };
}

module.exports = CodeGen;

// node translators
CodeGen.prototype.array = require("./array.js");
CodeGen.prototype.assign = require("./assign.js");
CodeGen.prototype.bin = require("./bin.js");
CodeGen.prototype.block = require("./block.js");
CodeGen.prototype.boolean = require("./boolean.js");
CodeGen.prototype.break = require("./break.js");
CodeGen.prototype.call = require("./call.js");
CodeGen.prototype.cast = require("./cast.js");
CodeGen.prototype.classconstant = require("./classconstant.js");
CodeGen.prototype.class = require("./class.js");
CodeGen.prototype.clone = require("./clone.js");
CodeGen.prototype.closure = require("./closure.js");
CodeGen.prototype.constant = require("./constant.js");
CodeGen.prototype.constref = require("./constref.js");
CodeGen.prototype.continue = require("./continue.js");
CodeGen.prototype.declare = require("./declare.js");
CodeGen.prototype.doc = require("./doc.js");
CodeGen.prototype.do = require("./do.js");
CodeGen.prototype.echo = require("./echo.js");
CodeGen.prototype.empty = require("./empty.js");
CodeGen.prototype.encapsed = require("./encapsed.js");
CodeGen.prototype.eval = require("./eval.js");
CodeGen.prototype.exit = require("./exit.js");
CodeGen.prototype.foreach = require("./foreach.js");
CodeGen.prototype.for = require("./for.js");
CodeGen.prototype.function = require("./function.js");
CodeGen.prototype.global = require("./global.js");
CodeGen.prototype.goto = require("./goto.js");
CodeGen.prototype.identifier = require("./identifier.js");
CodeGen.prototype.if = require("./if.js");
CodeGen.prototype.include = require("./include.js");
CodeGen.prototype.inline = require("./inline.js");
CodeGen.prototype.interface = require("./interface.js");
CodeGen.prototype.isset = require("./isset.js");
CodeGen.prototype.label = require("./label.js");
CodeGen.prototype.list = require("./list.js");
CodeGen.prototype.magic = require("./magic.js");
CodeGen.prototype.method = require("./method.js");
CodeGen.prototype.namespace = require("./namespace.js");
CodeGen.prototype.new = require("./new.js");
CodeGen.prototype.nowdoc = require("./nowdoc.js");
CodeGen.prototype.number = require("./number.js");
CodeGen.prototype.offsetlookup = require("./offsetlookup.js");
CodeGen.prototype.parenthesis = require("./parenthesis.js");
CodeGen.prototype.post = require("./post.js");
CodeGen.prototype.pre = require("./pre.js");
CodeGen.prototype.print = require("./print.js");
CodeGen.prototype.program = require("./program.js");
CodeGen.prototype.property = require("./property.js");
CodeGen.prototype.propertylookup = require("./propertylookup.js");
CodeGen.prototype.retif = require("./retif.js");
CodeGen.prototype.return = require("./return.js");
CodeGen.prototype.silent = require("./silent.js");
CodeGen.prototype.static = require("./static.js");
CodeGen.prototype.staticlookup = require("./staticlookup.js");
CodeGen.prototype.string = require("./string.js");
CodeGen.prototype.switch = require("./switch.js");
CodeGen.prototype.throw = require("./throw.js");
CodeGen.prototype.trait = require("./trait.js");
CodeGen.prototype.traituse = require("./traituse.js");
CodeGen.prototype.try = require("./try.js");
CodeGen.prototype.unary = require("./unary.js");
CodeGen.prototype.unset = require("./unset.js");
CodeGen.prototype.usegroup = require("./usegroup.js");
CodeGen.prototype.variable = require("./variable.js");
CodeGen.prototype.variadic = require("./variadic.js");
CodeGen.prototype.while = require("./while.js");
CodeGen.prototype.yieldfrom = require("./yieldfrom.js");
CodeGen.prototype.yield = require("./yield.js");

},{"./array.js":2,"./assign.js":3,"./bin.js":4,"./block.js":5,"./boolean.js":6,"./break.js":7,"./call.js":8,"./cast.js":9,"./class.js":10,"./classconstant.js":11,"./clone.js":12,"./closure.js":13,"./constant.js":14,"./constref.js":15,"./continue.js":16,"./declare.js":17,"./do.js":18,"./doc.js":19,"./echo.js":20,"./empty.js":21,"./encapsed.js":22,"./eval.js":23,"./exit.js":24,"./for.js":25,"./foreach.js":26,"./function.js":27,"./global.js":28,"./goto.js":29,"./identifier.js":34,"./if.js":35,"./include.js":36,"./inline.js":38,"./interface.js":39,"./isset.js":40,"./label.js":41,"./list.js":42,"./magic.js":43,"./method.js":44,"./namespace.js":45,"./new.js":46,"./nowdoc.js":47,"./number.js":48,"./offsetlookup.js":49,"./parenthesis.js":50,"./post.js":51,"./pre.js":52,"./print.js":53,"./program.js":54,"./property.js":55,"./propertylookup.js":56,"./retif.js":57,"./return.js":58,"./silent.js":59,"./static.js":60,"./staticlookup.js":61,"./string.js":62,"./switch.js":63,"./throw.js":64,"./trait.js":65,"./traituse.js":66,"./try.js":67,"./unary.js":68,"./unset.js":69,"./usegroup.js":70,"./variable.js":71,"./variadic.js":72,"./while.js":73,"./yield.js":74,"./yieldfrom.js":75}],38:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  var str;

  str = node.omitClosingTag ? '' : '?>';
  str += node.value;

  if (node.isInlineEcho) {
    return str + '<?=' + this.ws;
  }

  return str + (node.isLast ? '' : '<?php' + this.nl);
};

},{}],39:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var identifier = require('./helper/identifier');

module.exports = function (node, indent) {
  var codegen, str = '';
  codegen = this.process.bind(this);

  // Start
  if (node.isFinal) {
    str = 'final ';
  }
  str += 'interface ' + node.name;

  if (node.extends) {
    str += ' extends ' + node.extends.map(identifier).join(',' + this.ws);
  }

  // begin curly brace
  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  // interface body
  str += doBody.call(this, codegen, indent, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};

},{"./helper/body":31,"./helper/identifier":32}],40:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  return 'isset(' + params(node.arguments, indent, this) + ')';
};

},{"./helper/parameters":33}],41:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return node.name + ':';
};

},{}],42:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';
var params = require('./helper/parameters');

module.exports = function (node, indent) {
  return 'list(' + params(node.arguments, indent, this) + ')';
};

},{"./helper/parameters":33}],43:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return node.value;
};

},{}],44:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var args = require('./helper/arguments');
var identifier = require('./helper/identifier');

// name, params, isRef, returnType, body, flags
module.exports = function (node, indent) {
  var codegen, str = '';

  if (node.isAbstract) {
    str += 'abstract ';
  }
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  // Fall back to public if nothing is specified
  if (!node.visibility) {
    node.visibility = 'public';
  }
  str += node.visibility + ' function ';
  if (node.byref) {
    str += '&';
  }
  str += node.name;
  str += args(node.arguments, indent, this);

  // php7 / return type
  if (node.type) {
    str += this.ws + ':' + this.ws;
    if (node.nullable) {
      str += '?';
    }
    str += identifier(node.type);
  }

  // It lacks body. Must be an abstract method declaration.
  if (node.isAbstract || !node.body) {
    return str + ';';
  }

  codegen = this.process.bind(this);

  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str +=  this.ws + '{' + this.nl;
  }

  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';
  return str;
};

},{"./helper/arguments":30,"./helper/body":31,"./helper/identifier":32}],45:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var str, codegen;

  str = 'namespace ' + node.name + this.ws + '\n{\n\n';
  codegen = this.process.bind(this);
  str += doBody.call(this, codegen, indent, node.children);
  str += '}';

  return str;
};

},{"./helper/body":31}],46:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';
var params = require('./helper/parameters');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);
  str = codegen(node.what, indent);
  if (node.what.kind !== 'class') {
    str += '(';
    if (node.arguments && node.arguments.length > 0) {
      str += params(node.arguments, indent, this);
    }
    str += ')';
  }
  return 'new ' + str;
};

},{"./helper/parameters":33}],47:[function(require,module,exports){
/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node) {
  return '<<<\'' + node.label + '\'' + this.nl + node.value + this.nl + node.label;
};

},{}],48:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node) {
  return node.value.toString();
};

},{}],49:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, offset;
  codegen = this.process.bind(this);
  offset = node.offset ? codegen(node.offset, indent) : '';
  return codegen(node.what, indent) + '[' + offset + ']';
};

},{}],50:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return '(' + codegen(node.inner, indent) + ')';
};

},{}],51:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node.what, indent) + node.type + node.type;
};

},{}],52:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return node.type + node.type + codegen(node.what, indent);
};

},{}],53:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'print ' + codegen(node.arguments, indent);
};

},{}],54:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node) {

  if (!node.children || node.children.length === 0) {
    return '';
  }

  var codegen = this.process.bind(this), str = '<?php' + this.nl;
  if (node.children[0].kind === 'inline') {
    str = '';
    node.children[0].omitClosingTag = true;
  }
  // Is the last expression and an inline
  if (node.children[node.children.length - 1].kind === 'inline') {
    node.children[node.children.length - 1].isLast = true;
  }
  if (
    !this.forceNamespaceBrackets &&
      node.children.length === 1 &&
      node.children[0].kind === 'namespace'
  ) {
    return str + 'namespace ' + node.children[0].name + ';' +
      this.nl + this.nl +
      doBody.call(this, codegen, '', node.children[0].children, true);
  }
  return str + doBody.call(this, codegen, '', node.children, true);
};

},{"./helper/body":31}],55:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function property(node, indent) {
  var codegen, str = '';
  if (node.isFinal) {
    str += 'final ';
  }
  if (node.isStatic) {
    str += 'static ';
  }
  str += node.visibility;
  str += ' $' + node.name;
  if (node.value) {
    codegen = this.process.bind(this);
    str += ' = ' + codegen(node.value, indent);
  }
  return str;
};

},{}],56:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, prop;
  codegen = this.process.bind(this);
  prop = (function () {
    var child = node.offset;

    if (child.kind === 'constref') {
      return child.name;
    }
    if (child.kind === 'variable') {
      return codegen(child, indent);
    }
    return '{' + codegen(child, indent) + '}';
  }());

  return codegen(node.what, indent) + '->' + prop;
};

},{}],57:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, left, right = '';
  codegen = this.process.bind(this);
  if (node.trueExpr) {
    left = codegen(node.trueExpr, indent);
  }
  if (node.falseExpr) {
    right = codegen(node.falseExpr, indent);
  }
  return codegen(node.test, indent) + this.ws + '?' +
    (left ? this.ws + left + this.ws : '') + ':' +
    (right ? this.ws + right : '');
};

},{}],58:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen;

  if (!node.expr) {
    return 'return';
  }

  codegen = this.process.bind(this);
  return 'return ' + codegen(node.expr, indent);
};

},{}],59:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);

  return '@' + codegen(node.expr, indent);
};

},{}],60:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'static ' + node.items.map(function (x) {
    return codegen(x, indent);
  }).join(',' + this.ws);
};

},{}],61:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return codegen(node.what, indent) + '::' + codegen(node.offset, indent);
};

},{}],62:[function(require,module,exports){
/*jslint node: true, indent: 2, unparam:true */
'use strict';

module.exports = function (node, indent, opt) {
  opt = opt || {};
  if (opt.raw) {
    return node.value;
  }
  return JSON.stringify(node.value).replace(/\$/g, '\\$');
};

},{}],63:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen, str, that = this, cases;

  codegen = this.process.bind(this);
  str = 'switch' + this.ws + '(' + codegen(node.test, indent) + ')';
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }
  cases = node.body.children.map(function (item) {
    var head;
    if (item.test) {
      head = indent + that.indent + 'case ' + codegen(item.test, indent) + ':' + that.nl;
    } else {
      head = indent + that.indent + 'default:' + that.nl;
    }
    if (item.body) {
      head += doBody.call(that, codegen, indent + that.indent, item.body.children || [item.body]);
    }
    return head;
  });
  str += cases.join('');
  if (node.shortForm) {
    str += indent + 'endswitch;';
  } else {
    str += indent + '}';
  }
  return str;
};

},{"./helper/body":31}],64:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'throw ' + codegen(node.what, indent);
};

},{}],65:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');
var identifier = require('./helper/identifier');

module.exports = function (node, indent) {
  var codegen, str;
  codegen = this.process.bind(this);

  str = 'trait ' + node.name;

  if (node.extends) {
    str += ' extends ' + identifier(node.extends);
  }

  if (node.implements) {
    str += ' implements ' + node.implements.map(identifier).join(',' + this.ws);
  }

  // begin curly brace
  if (this.options.bracketsNewLine) {
    str += this.nl + indent + '{' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }

  // trait body
  str += doBody.call(this, codegen, indent, node.body);

  // end curly brace
  str += indent + '}\n';

  return str;
};

},{"./helper/body":31,"./helper/identifier":32}],66:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var identifier = require('./helper/identifier');

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var str = 'use' + this.ws, items = [], glue, codegen;
  codegen = this.process.bind(this);
  node.traits.forEach(function (item) {
    items.push(
      codegen(item, indent)
    );
  });
  str += items.join(',' + this.ws);
  if (node.adaptations) {
    glue = this.nl +  indent + this.indent;
    str += this.ws + '{' + glue;
    str += node.adaptations.map(function (item) {
      var out = '';
      if (item.trait) {
        out += codegen(item.trait, indent) + '::';
      }
      if (item.method) {
        out += item.method;
      }
      if (item.kind === 'traitprecedence') {
        out += ' insteadof ';// + codegen(item.insteadof);
        out += item.instead.map(identifier).join(', ');
      } else {
        out += ' as ';
        if (item.visibility) {
          out += item.visibility + ' ';
        }
        out += item.as;
      }
      return out + ';';
    }).join(glue) + this.nl;
    str += indent + '}';
  } else {
    str += ';';
  }
  return str + this.nl;
};

},{"./helper/identifier":32}],67:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var identifier = require('./helper/identifier');

function resolveExceptions(items) {
  var result = [], i;
  for (i = 0; i < items.length; i += 1) {
    result.push(identifier(items[i]));
  }
  return result.join('|');
}

module.exports = function (node, indent) {
  var codegen, str;


  codegen = this.process.bind(this);
  str = 'try' + this.ws + '{' + this.nl;
  str += doBody.call(this, codegen, indent, node.body.children);
  str += indent + '}';

  str += node.catches.map(function (except) {
    var out = this.ws + 'catch' + this.ws + '(' + resolveExceptions(except.what) + ' ' + codegen(except.variable) + ')' + this.ws + '{' + this.nl;
    out += doBody.call(this, codegen, indent, except.body.children);
    out += indent + '}';
    return out;
  }, this).join('');

  if (node.always) {
    str += this.ws + 'finally' + this.ws + '{' + this.nl;
    str += doBody.call(this, codegen, indent, node.always.children);
    str += indent + '}';
  }

  return str;
};

},{"./helper/body":31,"./helper/identifier":32}],68:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return node.type + codegen(node.what, indent);
};

},{}],69:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  return 'unset(' + params(node.arguments, indent, this) + ')';
};

},{"./helper/parameters":33}],70:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

/**
 * Usage declaration
 */
module.exports = function (node, indent) {
  var str = 'use' + this.ws, items, glue;
  if (node.type) {
    str += node.type + this.ws;
  }

  items = (node.items || []).map(function (item) {
    var useItem = item.name;
    if (item.alias) {
      useItem += ' as ' + item.alias;
    }
    return useItem;
  });

  if (node.items.length > 1) {
    glue = this.nl +  indent + this.indent;
    str += node.name + this.ws + '{' + glue;
    str += items.join(',' + glue) + this.nl;
    str += indent + '};' + this.nl;
  } else {
    str += items[0] + ';' + this.nl;
  }
  return str;
};

},{}],71:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  if (typeof node.name !== 'string') {
    var codegen = this.process.bind(this);
    node.name = codegen(node.name, indent);
  }
  return (node.byref ? '&$' : '$') + node.name;
};

},{}],72:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return '...' + codegen(node.what, indent);
};

},{}],73:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen = this.process.bind(this), str;

  str = 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  if (!node.body) {
    return str;
  }
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }
  str += doBody.call(this, codegen, indent, node.body.children || [node.body]);
  if (node.shortForm) {
    str += indent + 'endwhile;';
  } else {
    str += indent + '}';
  }
  return str;
};

},{"./helper/body":31}],74:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen, str;
  str = 'yield';
  if (node.value) {
    codegen = this.process.bind(this);
    if (node.key) {
      // yield $key => $value
      str += ' ' + codegen(node.key, indent) + ' =>';
    }
    // yield $value
    str += ' ' + codegen(node.value, indent);
  }
  return str;
};

},{}],75:[function(require,module,exports){
/*jslint node: true, indent: 2 */
'use strict';

module.exports = function (node, indent) {
  var codegen = this.process.bind(this);
  return 'yield from ' + codegen(node.value, indent);
};

},{}]},{},[1])(1)
});
