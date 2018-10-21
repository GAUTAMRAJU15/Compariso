const express =  require('express');
const app = express();
require('./pythonScraperModule/trigger')(app);
require('./nodeScraperModule/amazonScraper')(app);

app.listen(3000,()=>{
    console.log("Running on 3000");
});
