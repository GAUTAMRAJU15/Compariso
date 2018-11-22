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
		scraper(req.params.search).then((scrapedData)=>{
			console.log(scrapedData.toString());
			res.send('this  is a response');
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};
