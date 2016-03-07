const mkdirp = require('mkdirp');
const path = require('path');
const parse = require('./parse');
const organize = require('./organize');
const validate = require('./validate');
const generateDynamo = require('./generateDynamo');

module.exports = function (source) {
	if (!source) {
		return Promise.reject(new Error('You must provide a source file path'));
	}

	return Promise.resolve().then(() => {
		mkdirp.sync(path.join(__dirname, '../tmp'));
	})
	.then(() => {
		console.log('Parse source file ' + source);
		return parse(source);
	})
	.then(organize)
	.then(model => {
		console.log('Validating ' + model.packages.length + ' packages');
		return validate(model);
	})
	.then(model => {
		console.log('Generating Dynamo dump for ' + model.packages.length + ' packages');
		return generateDynamo(model.packages, path.join(__dirname, '../tmp/dynamo.txt'))
			.then(() => model);
	})
	.then(model => {
		console.log(model);
	});
};
