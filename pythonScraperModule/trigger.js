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

let callWebhook =  async (app) => {
	return await app.post('/getScrapedData/:search',async (req,res)=>{
		await scraper(req.params.search).then((scrapedData)=>{
			data = scrapedData;
			return [data,res];
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};


module.exports.callWebhook = callWebhook;
