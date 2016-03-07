const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const parse = require('./parse');
const organize = require('./organize');
const validate = require('./validate');
const generateDynamo = require('./generateDynamo');
const logErrors = require('./logErrors');
const generateCollections = require('./generateCollections');
const logDistribution = require('./logDistribution');

module.exports = function (source) {
	if (!source) {
		return Promise.reject(new Error('You must provide a source file path'));
	}

	return Promise.resolve().then(() => {
		rimraf.sync(path.join(__dirname, '../tmp'));
		mkdirp.sync(path.join(__dirname, '../tmp/collections'));
		return source;
	})
	.then(parse)
	.then(organize)
	.then(validate)
	.then(model => {
		return Promise.all([
			generateDynamo(model.packages, path.join(__dirname, '../tmp/dynamo.txt')),
			logErrors(model.errors, path.join(__dirname, '../tmp/errors.log')),
			generateCollections(model.packages, path.join(__dirname, '../tmp/collections/')),
			logDistribution(model.distribution, path.join(__dirname, '../tmp/distribution.csv'))
		]);
	});
};
