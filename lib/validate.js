const Promise = require('bluebird');
const fetch = require('node-fetch');
const ProgressBar = require('progress');

const MIN_NUM_ARTICLES = 3;

module.exports = function (model) {
	model.distribution = {};

	return Promise.resolve(model)
	.then(model => {
		console.log('Validating ' + model.packages.length + ' packages');
		const pageCodeMap = {};

		model.errors = [];
		model.packages = model.packages.filter(pack => {
			if (pack.articles.length < MIN_NUM_ARTICLES) {
				model.errors.push('Package ' + pack.r2id + ' contains less than ' + MIN_NUM_ARTICLES + ' stories');
				return false;
			} else {
				pack.articles.forEach(article => {
					pageCodeMap[article.PAGE_ID] = false;
				});
				return true;
			}
		});

		return fetchFromCapi(model, pageCodeMap);
	})
	.then(pageCodeMap => {
		model.packages = model.packages.filter(pack => {
			pack.articles = pack.articles.filter(article => {
				return pageCodeMap[article.PAGE_ID] === true;
			});
			if (pack.articles.length < MIN_NUM_ARTICLES) {
				model.errors.push('Package ' + pack.r2id + ' contains less than ' + MIN_NUM_ARTICLES + ' stories');
				return false;
			} else {
				if (!model.distribution[pack.articles.length]) {
					model.distribution[pack.articles.length] = {
						count: 0,
						packages: []
					};
				}
				model.distribution[pack.articles.length].count += 1;
				model.distribution[pack.articles.length].packages.push(pack.r2id + ':' + pack.id);
				return true;
			}
		});

		Object.keys(pageCodeMap).forEach(key => {
			if (pageCodeMap[key] === false) {
				model.errors.push('Story internal-code/page/' + key + ' not found in CAPI');
			}
		});

		return model;
	});
};

function fetchFromCapi (model, pageCodeMap) {
	const capiEndpoint = process.env.CONTENT_API;
	const allCodes = Object.keys(pageCodeMap);
	const chunks = 40;

	if (!capiEndpoint) {
		return Promise.reject('Missing environment variable CONTENT_API');
	} else {
		const howManyRequests = Math.ceil(allCodes.length / chunks);
		const bar = new ProgressBar('  capi [:bar] :percent :etas', { total: howManyRequests });

		return Promise.map(
			new Array(howManyRequests),
			function (_, group) {
				const codes = allCodes.slice(group * chunks, (group + 1) * chunks)
					.map(code => 'internal-code/page/' + code);
				const capiUrl = capiEndpoint + '/search?ids=' + codes.join(',') + '&show-fields=internalPageCode&page-size=' + chunks;

				return fetch(capiUrl)
					.then(res => res.json())
					.then(json => {
						if (json && json.response && json.response.results) {
							json.response.results.forEach(result => {
								if (result && result.fields) {
									pageCodeMap[result.fields.internalPageCode] = true;
								}
							});
						}
						bar.tick();
					});
			},
			{ concurrency: 4 }
		).then(() => pageCodeMap);
	}
}
