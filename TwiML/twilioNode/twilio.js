
module.exports = (app,data,res) => {

	res.redirect('/postTwiResWebhook');
	app.route('/postTwiResWebhook')
		.post((req,res) => {
			res.send('asdsa');
		});
};
