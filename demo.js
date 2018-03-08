/* This program is released under the MIT license http://opensource.org/licenses/MIT */
/*jslint indent: 2, regexp:true*/
/*global phpUnparser, document, Prism*/

(function (global) {
  'use strict';
  var codeEle, phpParser;

  phpParser = require('php-parser');
  codeEle = document.querySelector('#code');

  function changeCode() {
    var code, output;

    code = codeEle.value;
    output = document.querySelector('#output');
    try {
      global.ast = phpParser.parseCode(code, { parser : { extractDoc: true, ast: { withPositions: true } }});
      output.textContent = phpUnparser(global.ast);
      Prism.highlightAll();
    } catch (e) {
      output.textContent = '***Error***\nThe entered string seems to be invalid php';
    }
  }

  codeEle.addEventListener('change', changeCode);
  codeEle.addEventListener('keyup', changeCode);
  setTimeout(function () {
    changeCode();
  }, 1000);
}(this));
