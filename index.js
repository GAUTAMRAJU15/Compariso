const express =  require('express');
const bodyParser =  require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./pythonScraperModule/trigger')(app);
require('./nodeScraperModule/amazonScraper')(app);
require('./TwiML/routeHandlers/routes')(app);

app.listen(3000,()=>{
    console.log("Running on 3000");
});
