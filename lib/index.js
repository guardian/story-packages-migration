const mkdirp = require('mkdirp');
const path = require('path');
const parse = require('./parse');
const organize = require('./organize');
const validate = require('./validate');
const generateDynamo = require('./generateDynamo');
const logErrors = require('./logErrors');
const generateCollections = require('./generateCollections');

module.exports = function (source) {
	if (!source) {
		return Promise.reject(new Error('You must provide a source file path'));
	}

	return Promise.resolve().then(() => {
		mkdirp.sync(path.join(__dirname, '../tmp'));
		return source;
	})
	.then(parse)
	.then(organize)
	.then(validate)
	.then(model => {
		return Promise.all([
			generateDynamo(model.packages, path.join(__dirname, '../tmp/dynamo.txt')),
			logErrors(model.errors, path.join(__dirname, '../tmp/errors.log')),
			generateCollections(model.packages, path.join(__dirname, '../tmp/collections/'))
		]);
	});
};
