const MessagingResponse = require('twilio').twiml.MessagingResponse;
const parser = require('xml2json');


function hasArray (data) {
	return function(req,res,next) {
		req.body = data.pop();
		console.log('[req body]',req.body);
		next();
	};
}

function convertValidJSON (req, res, next){
	if (/\/xml$/.test(req.headers['content-type'])) {
		req.body = parser.toJson(req.body.toString(), { object: true });
	}
	next();
}

module.exports = (app,data) => {
	let filterArray =  hasArray(data);
	app.use(filterArray);
	app.use(convertValidJSON);

	app.route('/postTwiResWebhook')
		.post(filterArray,(req,res) => {

			const response = new MessagingResponse();
			const message = response.message();
			res.send(	message.body(req.body));
		});
};
