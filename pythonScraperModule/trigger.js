const { spawn } = require('child_process');

let scraper = (req) => {

	return new Promise((resolve, reject) =>{

		const childProcess =  spawn('python',['./pythonScraperModule/flipkartScraper.py',req.query.psearch]);

		childProcess.stdout.on('data', function(data) {
			resolve(data);
		});
		childProcess.stderr.on('data',(data)=>{
			reject(data);
		});

	});

};
module.exports = (app) => {

	app.get('/getScrapedData',  (req,res)=>{
		res.write('s');
		scraper(req).then((scrapedData)=>{
			res.end(scrapedData);
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};
