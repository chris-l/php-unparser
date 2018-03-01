/*jslint node: true, indent: 2, nomen:true, evil: true */
'use strict';

var options, parser, unparser, file, fs;

fs = require('fs');
parser = require('php-parser');
unparser = require('../index');
options = {
  parser: {
    extractDoc: true,
    php7: true
  },
  ast: {
    withPositions: true
  }
};

module.exports = function (str) {
  return unparser(parser.parseCode(str, options));
};

