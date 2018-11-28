const MessagingResponse = require('twilio').twiml.MessagingResponse;
const stream = require('stream');
const fs = require('fs');

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

// let checkWritableStream = (res) => {
// 	return (res instanceof stream.Stream || res instanceof stream.Writable)
// 		&&  (typeof(res._write) == 'function');
// };
//
//
// let checkReadableStream = (req) => {
// 	return (req instanceof stream.Stream || req instanceof stream.Readable)
// 		&& (typeof(req._read) == 'function');
// };

module.exports = (app,data) => {
	let filterArray =  hasArray(data);

	app.use('/postTwiResWebhook',filterArray,convertValidJSON);

	app.route('/postTwiResWebhook')
		.post(filterArray,convertValidJSON,  (req,res) => {
			let payload = null;
			payload =  req.body.pop();

			client.messages
				.create({
					body: 'the queried devices' ,
					from: `whatsapp:${process.env.SANDBOX_NUMBER}`,
					to: `whatsapp:${process.env.PHONE_NO}`
				})
				.then(message => console.log(message.sid))
				.catch(err => console.log('[error]', err))
				.done();

			const response = new MessagingResponse();
			const message = response.message();
			message.body(payload.slice(0,1518));
			// console.log(checkReadableStream(fs.createReadStream(response.toString())));
			// console.log(checkWritableStream(response.toString()));
			res.send(response.toString());
		});
};
