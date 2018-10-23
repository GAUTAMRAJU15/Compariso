let QUERY_STRING = '';
module.exports = (app) => {

	app.route('/getTwiRes')
		.post((req,res) => {
			QUERY_STRING =  req.body.Body;
			res.redirect(`/getScrapedData/${QUERY_STRING}`);
		});
};
