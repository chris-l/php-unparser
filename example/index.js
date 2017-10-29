var unparse = require('../index.js');

// The AST object to parse
var astClass = {
  "kind": "program",
  "children": [
    {
      "kind": "class",
      "name": "Test",
      "body": [
        {
          kind: 'property',
          name: 'foo',
          value: {
            kind: 'string',
            value: 'bar',
            isDoubleQuote: false
          },
          visibility: 'public'
        },
        {
          kind: 'method',
          name: 'foo',
          arguments: [],
          byref: false,
          type: null,
          nullable: false,
          body: {
            kind: 'block',
            children: []
          },
          isAbstract: false,
          isFinal: false,
          visibility: 'public',
          isStatic: false
        }
      ]
    }
  ],
  "errors": []
};

console.log( unparse(astClass, {
  indent: false,
  dontUseWhitespaces: false,
  shortArray: false,
  bracketsNewLine: false,
  forceNamespaceBrackets: false
}) );