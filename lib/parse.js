const fs = require('fs');
const csv = require('csv');

module.exports = function (filePath) {
	return new Promise((resolve, reject) => {
		console.log('Parse source file ' + filePath);
		fs.readFile(filePath, function (err, data) {
			if (err) {
				reject(err);
			} else {
				csv.parse(data.toString(), {
					columns: true
				}, function (err, parsed) {
					if (err) {
						reject(err);
					} else {
						resolve(parsed.slice(-50));
					}
				});
			}
		});
	});
};
