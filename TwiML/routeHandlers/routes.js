let queryString = null;
module.exports = (app) => {
	app.route('/getTwiRes')
		.post((req,res) => {
			queryString =  req.body.Body;
			console.log(queryString);
			res.send(queryString);
		});
};

module.exports.QUERYSTRING = queryString;
