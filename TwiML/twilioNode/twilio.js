
module.exports = (app,data) => {

	app.route('/postTwiResWebhook')
		.post((req,res) => {
			console.log('[datat is ]',data);
			res.send(data);
		});
};
