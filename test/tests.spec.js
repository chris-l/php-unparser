/*jslint node: true, indent: 2, nomen:true, evil: true */
/*global describe,it,expect*/
'use strict';

var parseUnparse = require('./helper'),
  fs = require('fs');

describe('acid1.php', function () {
  it('must correcty convert nested blocks', function (done) {
    fs.readFile('./test/spec/acid1-parsed.php', function (err, strparsed) {
      expect(err).toBe(null);
      fs.readFile('./test/spec/acid1.php', function (err, str) {
        var output = null;

        expect(err).toBe(null);
        try {
          output = parseUnparse(str.toString());
        } catch (e) {
          console.log(e);
        }
        expect(output === null).toBe(false);
        expect(output).toBe(strparsed.toString());
        done();
      });
    });
  });
});
