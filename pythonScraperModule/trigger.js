const { spawn } = require('child_process');
let data = null;

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

let callWebhook = (scrapedData,res) => {
	data = scrapedData.toString();
	console.log(data);
	res.redirect('/getTwiResWebhook');
};

module.exports = (app) => {
	app.post('/getScrapedData/:search',  (req,res)=>{
		scraper(req.params.search).then((scrapedData)=>{
			callWebhook(scrapedData.toString(),res);
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};

module.exports.data = data;
