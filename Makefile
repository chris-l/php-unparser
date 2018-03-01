program: test lint index dist

index:
	sed -i -n '1,/^\/\/ node translators/ p' node_translators/index.js
	ls node_translators/|sed -n '/index.js/ !{ s/\([^\.]*\)\.js/CodeGen.prototype.\1 = require(".\/\1\.js");/p }' >> node_translators/index.js

dist: index
	node_modules/browserify/bin/cmd.js -s phpUnparser index.js | node_modules/uglifyjs/bin/uglifyjs > dist/php-unparser.min.js

lint:
	node_modules/jslint/bin/jslint.js --indent 2 --color package.json index.js node_translators/*.js node_translators/**/*.js test/**/*.js

test: index
	node_modules/jasmine-node/bin/jasmine-node test

cover: index lint
	node --stack-size=5000 node_modules/istanbul/lib/cli.js cover -x \"**/test/**\" test/index.js
