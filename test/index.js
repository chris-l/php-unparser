/**
 * Brute Force Code Coverage with magento2 repository
 */
var parser = require('php-parser');
var fs = require('fs');
var unparse = require('../index');

// scans a path
var scanDir = function(path) {
  fs.readdir(path, function(err, files) {
    if (files) {
      files.forEach(function(name) {
        if (name.substring(0, 1) !== '.') {
          fs.stat(path + '/' + name, function(err, info) {
            if (info.isDirectory()) {
              scanDir(path + '/' + name);
            } else {
              if (
                name.substring(name.length - 4) === '.php' ||
                name.substring(name.length - 6) === '.phtml'
              ) {
                total ++;
                testFile(path + '/' + name);
              }
            }
          });
        }
      });
    }
  });
};

var hasError = false;
var counter = 0;
var total = 0;
// try to parse the file
var testFile = function(filename, isDebug) {
  fs.readFile(filename, function(err, data) {
    if (!err) {
      counter ++;
      try {
        var ast = parser.parseCode(data.toString(), {
          parser: {
            extractDoc: true,
            debug: isDebug
          },
          ast: {
            withPositions: true
          }
        });
        var code = unparse(ast);
        if (isDebug) console.log(code);
        if (counter === total) {
          console.log('Finished to test ' + total + ' file(s)');
          process.exit(0);
        }
        if (counter % 500 === 0) {
          console.log(counter + ' of ' + total + ' - ' + Math.round(counter / total * 100) + '%');
        }
      } catch(e) {
        console.log('Error into ' + filename);
        console.error(e.stack);
        hasError = true;
        process.exit(1);
      }
    }
  });
};

var fIndex = process.argv.indexOf('--file');
if (fIndex > -1) {
  testFile(process.argv[fIndex + 1], true);
} else {
  scanDir(__dirname + '/spec');
}
