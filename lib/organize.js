const uuid = require('node-uuid');
module.exports = function (articles) {
	const packagesMap = {};

	articles.forEach(article => {
		if (article) {
			if (!packagesMap[article.ID]) {
				packagesMap[article.ID] = {
					id: uuid.v1(),
					articles: []
				};
			}

			packagesMap[article.ID].articles.push(article);
		}
	});

	return {
		packages: Object.keys(packagesMap).map(key => {
			return generatePackage(key, packagesMap[key]);
		})
	};
};

function generatePackage (key, pack) {
	try {
		const sortedArticlesByOrder = pack.articles.sort((a, b) => {
			return parseInt(a.TRAILBLOCK_SORT_ORDER, 10) - parseInt(b.TRAILBLOCK_SORT_ORDER);
		});
		const createdOn = parseDate(sortedArticlesByOrder[0].CREATED_ON);
		const lastArticle = sortedArticlesByOrder[sortedArticlesByOrder.length - 1];

		return {
			id: pack.id,
			r2id: key,
			isHidden: false,
			packageName: sortedArticlesByOrder[0].LINK_TEXT,
			created: createdOn,
			createdBy: 'R2',
			lastModify: parseDate(lastArticle.MODIFIED_ON),
			lastModifyBy: 'R2',
			lastModifyByName: lastArticle.MODIFIED_BY || 'R2',
			articles: sortedArticlesByOrder
		};
	} catch (ex) {
		console.error('Error when processing', pack, ex);
		throw ex;
	}
}

function parseDate (date) {
	return (new Date(date)).toISOString();
}
