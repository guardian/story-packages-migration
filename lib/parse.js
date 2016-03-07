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
	return data.split('\n').slice(0, 5);
}
