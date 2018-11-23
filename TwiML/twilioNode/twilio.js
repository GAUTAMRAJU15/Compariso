module.exports = (app,data) => {

	app.route('/getTwiResWebhook/')
		.post((req,res) => {
			console.log('twil ml file inside');
			console.log(data);
		});

	app.get('/',(req,res) => {
		res.send('You Just entered a TwilMl area');
	});
};
