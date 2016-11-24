program: lint

lint:
	node_modules/jslint/bin/jslint.js --indent 2 --color package.json index.js node_translators/*.js node_translators/**/*.js
