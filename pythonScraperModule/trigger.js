const { spawn } = require('child_process');

let scraper = (psearch) => {

	return new Promise((resolve, reject) => {
		const childProcess =  spawn('python',['./pythonScraperModule/flipkartScraper.py',psearch]);

		childProcess.stdout.on('data', function(data) {
			resolve(data);
		});
		childProcess.stderr.on('data',(data)=>{
			reject(data);
		});

	});

};
module.exports = (app) => {

	app.post('/getScrapedData/:search',  (req,res)=>{
		res.write('s');
		scraper(req.params.search).then((scrapedData)=>{

			res.end(scrapedData);
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};
