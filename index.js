const express =  require('express');
const bodyParser =  require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
require('./TwiML/routeHandlers/routes')(app);
require('./pythonScraperModule/trigger')(app);
let scraperWebhook = require('./pythonScraperModule/trigger').data;
console.log('[index.js]',scraperWebhook);
require('./TwiML/twilioNode/twilio')(app,scraperWebhook);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});
