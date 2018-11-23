const express =  require('express');
const bodyParser =  require('body-parser');

const PORT = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
require('./TwiML/routeHandlers/routes')(app);

let scraperWebhook= require('./pythonScraperModule/trigger').callWebhook(app);
require('./TwiML/twilioNode/twilio')(app,scraperWebhook[0],scraperWebhook[1]);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});
