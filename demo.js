/* This program is released under the MIT license http://opensource.org/licenses/MIT */
/*jslint indent: 2, regexp:true*/
/*global phpUnparser, phpParser, document, Prism*/

(function () {
  'use strict';
  var codeEle = document.querySelector('#code');

  function changeCode() {
    var code, output;

    code = codeEle.value;
    output = document.querySelector('#output');
    try {
      output.textContent = phpUnparser(phpParser.parseEval(code));
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
}());
