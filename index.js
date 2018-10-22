const express =  require('express');
const bodyParser =  require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./TwiML/routeHandlers/routes')(app);
let responseWhatsApp =  require('./TwiML/routeHandlers/routes').QUERYSTRING;
require('./pythonScraperModule/trigger')(app,responseWhatsApp);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});
