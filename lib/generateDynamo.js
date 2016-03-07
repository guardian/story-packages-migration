const fs = require('fs');

module.exports = function (packages, destination) {
	return new Promise((resolve, reject) => {
		fs.writeFile(destination, formatPackages(packages), function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

function formatPackages (packages) {
	return packages.map((pack) => {
		return [
			line('id', string(pack.id)),
			line('packageName', string(pack.packageName)),
			line('isHidden', bool(pack.isHidden)),
			line('lastModify', string(pack.lastModify)),
			line('lastModifyBy', string(pack.lastModifyBy)),
			line('lastModifyByName', string(pack.lastModifyByName)),
			line('created', string(pack.created)),
			line('createdBy', string(pack.createdBy)),
			line('importedFromR2', bool(true))
		].join(String.fromCharCode(2));
	}).join(String.fromCharCode(10)) + String.fromCharCode(10);
}

function line (key, value) {
	return key + String.fromCharCode(3) + value;
}

function string (value) {
	return JSON.stringify({
		s: value
	});
}

function bool (value) {
	return JSON.stringify({
		bOOL: value
	});
}
