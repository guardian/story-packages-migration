const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function (packages, destination) {
	console.log('Generating collections json for ' + packages.length + ' packages');
	return Promise.map(
		packages,
		function (pack) {
			const outFile = path.join(destination, '/' + pack.id + '/collection.json');
			return new Promise((resolve, reject) => {
				mkdirp.sync(path.join(destination, '/' + pack.id));
				fs.writeFile(outFile, stringify(pack), function (err) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		},
		{ concurrency: 3 }
	);
};

function stringify (pack) {
	return JSON.stringify({
		live: pack.articles.map(article => {
			return {
				id: 'internal-code/page/' + article.PAGE_ID,
				frontPublicationDate: milliseconds(article.MODIFIED_ON),
				meta: {
					group: '1'
				}
			};
		}),
		lastUpdated: milliseconds(pack.lastModify),
		updatedBy: pack.lastModifyByName,
		updatedEmail: pack.lastModifyBy
	}, null, '\t');
}

function milliseconds (date) {
	return +new Date(date);
}
