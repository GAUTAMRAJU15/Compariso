
module.exports = (app,data,res) => {

	res !== undefined ? res.redirect('/postTwiResWebhook') :  null;
	app.route('/postTwiResWebhook')
		.post((req,res) => {
			res.send('asdsa');
		});
};
