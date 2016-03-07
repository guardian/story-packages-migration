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
			const pack = packagesMap[key];
			const sortedArticlesByDate = pack.articles.sort((a, b) => {
				return a.CREATED_ON.localeCompare(b.CREATED_ON);
			});
			const sortedArticlesByOrder = pack.articles.sort((a, b) => {
				return parseInt(a.TRAILBLOCK_SORT_ORDER, 10) - parseInt(b.TRAILBLOCK_SORT_ORDER);
			});

			console.log(sortedArticlesByDate);

			return {
				id: pack.id,
				r2id: key,
				isHidden: false,
				packageName: sortedArticlesByOrder[0].LINK_TEXT,
				created: parseDate(sortedArticlesByDate[0].CREATED_ON),
				createdBy: 'R2',
				lastModify: parseDate(sortedArticlesByDate[sortedArticlesByDate.length - 1].MODIFIED_ON),
				lastModifyBy: 'R2',
				lastModifyByName: 'Imported from R2',
				articles: sortedArticlesByOrder
			};
		})
	};
};

function parseDate (date) {
	return (new Date(date)).toISOString();
}
