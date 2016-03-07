const fs = require('fs');

module.exports = function (filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(splitArticles(data.toString()));
			}
		});
	});
};

function splitArticles (data) {
	const lines = data.split('\n');
	const header = JSON.parse('[' + lines.shift() + ']');


	return lines.slice(0, 5).map(line => {
		const asArray = line.split(',');
		const article = {};
		header.forEach((key, index) => {
			article[key] = asArray[index].replace(/^['"]/, '').replace(/['"]$/, '');
		});
		return article;
	});
}
