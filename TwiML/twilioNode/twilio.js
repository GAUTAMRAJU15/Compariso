module.exports = (app,data) => {

	app.route('/getTwiResWebhook')
		.post((req,res) => {
			console.log('[callTwiliofunc()]',data);
			console.log(data);
			res.send('asdsa');
		});

	app.get('/',(req,res) => {
		res.send('You Just entered a TwilMl area');
	});
};
