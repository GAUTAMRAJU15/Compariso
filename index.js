const express =  require('express');
const bodyParser =  require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
require('./TwiML/routeHandlers/routes')(app);
let [scraperWebhook,res]  = require('./pythonScraperModule/trigger')(app);

console.log('[index.js]',scraperWebhook);
require('./TwiML/twilioNode/twilio')(app,scraperWebhook,res);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});
