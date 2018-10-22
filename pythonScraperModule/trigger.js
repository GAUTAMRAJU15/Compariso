const { spawn } = require('child_process');

let scraper = (psearch) => {

	return new Promise((resolve, reject) =>{

		const childProcess =  spawn('python',['./pythonScraperModule/flipkartScraper.py',psearch]);

		childProcess.stdout.on('data', function(data) {
			resolve(data);
		});
		childProcess.stderr.on('data',(data)=>{
			reject(data);
		});

	});

};
module.exports = (app,queryString) => {

	app.get('/getScrapedData',  (req,res)=>{
		res.write('s');
		scraper(queryString).then((scrapedData)=>{
			res.end(scrapedData);
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};
