const fs = require('fs');

module.exports = function (errors, destination) {
	return new Promise((resolve, reject) => {
		fs.writeFile(destination, errors.join('\n') + '\n', err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
