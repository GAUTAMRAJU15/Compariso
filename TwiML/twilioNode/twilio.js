const MessagingResponse = require('twilio').twiml.MessagingResponse;
const parser = require('xml2json');

function hasArray (data) {
	return function(req,res,next) {
		req.body = data.pop();
		console.log('[req body]',req.body);
		next();
	};
}

module.exports = (app,data) => {
	let filterArray =  hasArray(data);
	app.use(filterArray);

	app.route('/postTwiResWebhook')
		.post(filterArray,(req,res) => {

			const response = new MessagingResponse();
			const message = response.message();
			res.send(	message.body(req.body));
		});
};
