php-unparser
============

This project is a JavaScript based [unparser](https://en.wikipedia.org/wiki/Unparser) for the AST produced by glayzzle's [php-parser](https://github.com/glayzzle/php-parser).

It aims to produce code that uses the style format recommended by PSR-1 and PSR-2.

It's at an early development stage, but it is already able to generate code for most of the produced AST.
It has no dependencies.

## How to use

```javascript
var unparse = require('php-unparser');
var ast = ["program",[["sys","echo",[["string","hello world"]]]]];

console.log(unparse(ast)); // Will output -> echo "hello world";
```
## Demo

[See it working](https://chris-l.github.io/php-unparser/)

## License

MIT License, Copyright 2016 Christopher Luna
