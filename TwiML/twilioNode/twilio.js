const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const parser = require('xml2json');

function hasArray (data) {
	return function(req,res,next) {
		req.body =  [...data];

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

	app.use('/postTwiResWebhook',filterArray,convertValidJSON);

	app.route('/postTwiResWebhook')
		.post(filterArray,convertValidJSON,  (req,res) => {
			let payload = null;
			payload =  req.body.pop();

			client.messages
				.create({
					body: payload.slice(0,100) ,
					from: `whatsapp:${process.env.SANDBOX_NUMBER}`,
					to: `whatsapp:${process.env.PHONE_NO}`
				})
				.then(message => console.log(message.sid))
				.catch(err => console.log('[error]', err))
				.done();

			const response = new MessagingResponse();
			const message = response.message();
			message.body('the queried devoces');
			res.send(response.toString());
		});
};
