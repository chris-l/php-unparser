php-unparser
============

[![Build Status](https://travis-ci.org/glayzzle/php-unparser.svg?branch=master)](https://travis-ci.org/glayzzle/php-unparser)
[![Coverage Status](https://coveralls.io/repos/github/glayzzle/php-unparser/badge.svg?branch=master)](https://coveralls.io/github/glayzzle/php-unparser?branch=master)

This project is a JavaScript based [unparser](https://en.wikipedia.org/wiki/Unparser) for the AST produced by glayzzle's [php-parser](https://github.com/glayzzle/php-parser).

It aims to produce code that uses the style format recommended by PSR-1 and PSR-2.

It's at an early development stage, but it is already able to generate code for most of the produced AST.

It has __no dependencies__.

## How to use

```javascript
var unparse = require('php-unparser');

var options = {
  indent: true,
  dontUseWhitespaces: false,
  shortArray: true,
  bracketsNewLine: true,
  forceNamespaceBrackets: false,
  collapseEmptyLines: true
};

var ast = {
  "kind": "program",
  "children": [
    {
      "kind": "echo",
      "arguments": [
        {
          "kind": "string",
          "value": "hello world",
          "isDoubleQuote": true
        }
      ]
    }
  ],
  "errors": []
};

// Will output -> echo "hello world";
console.log(unparse(ast, options));
```

## Options

| option                 | value   | default  | description |
|------------------------|---------|----------|-------------|
| indent                 | string  |          | The indentation size, default is four white spaces. |
| dontUseWhitespaces     | boolean | `false`  | If enabled removes all the whitespaces between stuff. |
| shortArray             | boolean | `false`  | If enabled write arrays in short array syntax enabled since PHP 5.4.0 |
| bracketsNewLine        | boolean | `true`   | If enabled will put brackets on new line. |
| forceNamespaceBrackets | boolean | `false`  | Force the namespace bracketed syntax (_recommended for combining namespaces_) |
| collapseEmptyLines     | boolean | `true`   | If enabled it will remove all empty lines between sections and properties. |

## Demo

[See it working](https://chris-l.github.io/php-unparser/)

## License

MIT License, Copyright 2016 Christopher Luna
