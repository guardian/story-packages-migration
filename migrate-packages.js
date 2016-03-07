const index = require('./lib/index');

index(process.argv[2])
.then(() => {
	console.log('DONE');
})
.catch(err => {
	console.error(err);
});
