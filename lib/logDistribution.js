const fs = require('fs');

module.exports = function (distribution, destination) {
	return new Promise((resolve, reject) => {
		const values = Object.keys(distribution);
		const csv = values
			.sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
			.map(key => [
				key,
				distribution[key].count,
				distribution[key].packages.slice(0, 5).join('|')
			].join(','));

		csv.unshift('"number of stories","packages count","top 5"');
		fs.writeFile(destination, csv.join('\n'), err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
