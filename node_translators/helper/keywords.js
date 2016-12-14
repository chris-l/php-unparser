/*jslint node: true, indent: 2 */
'use strict';

module.exports = function addKeywords(x) {
  var out = '';

  if (x[2] === 1) {
    out += 'abstract ';
  }
  if (x[2] === 2) {
    out += 'final ';
  }
  switch (x[0]) {
  case 0:
    out += 'public ';
    break;
  case 1:
    out += 'protected ';
    break;
  case 2:
    out += 'private ';
    break;
  }
  if (x[1] === 1) {
    out += 'static ';
  }
  return out;
};
