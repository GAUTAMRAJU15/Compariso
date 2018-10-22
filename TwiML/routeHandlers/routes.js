let queryString = null;
module.exports = (app) => {
	app.route('/getTwiRes')
		.post((req,res) => {
			queryString =  req.body.Body;
			res.send(queryString);
      
		})
		.get((req,res) => {
			res.send(queryString);
		});
};

module.exports.QUERYSTRING = queryString;
