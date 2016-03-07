module.exports = function (articles) {
	console.log(articles);
	return {
		packages: [{
			id: Math.floor(Math.random() * 10000000),
			isHidden: false,
			packageName: (Math.random()+1).toString(36).substring(7),
			created: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return startDate.toISOString();
			})(new Date()),
			createdBy: 'fabio.crisci@guardian.co.uk',
			lastModify: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())).toISOString();
			})(new Date()),
			lastModifyBy: 'fabio.crisci@guardian.co.uk',
			lastModifyByName: 'Fabio Crisci'
		}, {
			id: Math.floor(Math.random() * 10000000),
			isHidden: false,
			packageName: (Math.random()+1).toString(36).substring(7),
			created: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return startDate.toISOString();
			})(new Date()),
			createdBy: 'fabio.crisci@guardian.co.uk',
			lastModify: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())).toISOString();
			})(new Date()),
			lastModifyBy: 'fabio.crisci@guardian.co.uk',
			lastModifyByName: 'Fabio Crisci'
		}, {
			id: Math.floor(Math.random() * 10000000),
			isHidden: false,
			packageName: (Math.random()+1).toString(36).substring(7),
			created: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return startDate.toISOString();
			})(new Date()),
			createdBy: 'fabio.crisci@guardian.co.uk',
			lastModify: (function (startDate) {
				startDate.setMonth(startDate.getMonth() - 3);
				return new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())).toISOString();
			})(new Date()),
			lastModifyBy: 'fabio.crisci@guardian.co.uk',
			lastModifyByName: 'Fabio Crisci'
		}]
	};
};

