const express =  require('express');
const bodyParser =  require('body-parser');

const PORT = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
require('./TwiML/routeHandlers/routes')(app);

require('./pythonScraperModule/trigger').callWebhook(app);
let dataWebhook = require('./pythonScraperModule/trigger').dataWebhook;
console.log('[here is datawebhook]',dataWebhook);
require('./TwiML/twilioNode/twilio')(app,dataWebhook);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});
