/*jslint node: true, indent: 2, nomen:true, evil: true */
/*global describe,it,expect*/
'use strict';

var parseUnparse = require('./helper'),
  fs = require('fs');

describe('Array', function () {
  it('should convert the array keyword to lowercase', function () {
    expect(parseUnparse('<?php $a = Array(1,2);')).toBe(['<?php', '$a = array(1, 2);', ''].join('\n'));
  });
  it('must remove the last comma', function () {
    expect(parseUnparse('<?php $a = array(1,2,);')).toBe(['<?php', '$a = array(1, 2);', ''].join('\n'));
  });
});
describe('Encapsed interpolation', function () {
  it('should not enclose variables into brackets', function () {
    expect(parseUnparse('<?php $a = "hello, $world";')).toBe(['<?php', '$a = "hello, $world";', ''].join('\n'));
  });
});
describe('Comments', function () {
  it('must correcty convert multiline comments that start with only one *', function () {
    expect(parseUnparse('<?php /*\naa\naa\naa\ncc\n*/')).toBe(['<?php', '/*aa', '  aa', '  aa', '  cc*/', ''].join('\n'));
  });
  it('must correcty convert multiline comments that dont have an space', function () {
    expect(parseUnparse('<?php { /******\nbbb\nccc\n*****/\n//echo $ee;\n}')).toBe(['<?php', '', '{', '    /******', '      bbb', '      ccc', '      *****/', '    // echo $ee;', '}', '', ''].join('\n'));
  });
});
describe('Comments', function () {
  it('', function () {
    expect(parseUnparse('<?php\necho 1; //comment on the same line\n')).toBe(['<?php', 'echo 1; // comment on the same line', '', ''].join('\n'));
  });
});
describe('Blocks', function () {
  it('must correcty convert nested blocks', function () {
    expect(parseUnparse('<?php {{\n// Code generation for this\n}}')).toBe(['<?php', '', '{', '    ', '    {', '        // Code generation for this', '    }', '', '}', '', ''].join('\n'));
  });
});
describe('Blocks', function () {
  it('should be present even if it was a blockless foreach', function () {
    expect(parseUnparse('<?php\nforeach($a as $c) $c;')).toBe(['<?php', 'foreach ($a as $c) {', '    $c;', '}', ''].join('\n'));
  });
});
describe('Declare', function () {
  it('', function () {
    expect(parseUnparse('<?php\ndeclare(strict_types=1);echo 1;')).toBe(['<?php', 'declare(strict_types = 1);', 'echo 1;', '', ''].join('\n'));
  });
});

describe('BinaryExpressions', function () {
  it('should use multiple lines if they are longer than 80 chars', function () {
    expect(parseUnparse('<?php\n{echo "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;" . "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;" . "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;";}')).toBe([ '<?php', '', '{', '    echo "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;" .', '        "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;" .', '        "background:#F9F7D8;color:#A79F00; border:1px solid #F0EEBD;";', '}', '', '' ].join('\n'));
  });
});
describe('inline', function () {
  it('', function () {
    expect(parseUnparse('<div class="<?= "hola" ?>">')).toBe('<div class="<?= "hola" ?>">');
  });
});

// describe('acid1.php', function () {
//   it('must correcty convert nested blocks', function (done) {
//     fs.readFile('./test/spec/acid1-parsed.php', function (err, strparsed) {
//       expect(err).toBe(null);
//       fs.readFile('./test/spec/acid1.php', function (err, str) {
//         var output = null;

//         expect(err).toBe(null);
//         try {
//           output = parseUnparse(str.toString());
//         } catch (e) {
//           console.log(e);
//         }
//         expect(output === null).toBe(false);
//         expect(output.trim()).toBe(strparsed.toString().trim());
//         done();
//       });
//     });
//   });
// });
