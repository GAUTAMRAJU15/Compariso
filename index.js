const express =  require('express');
const { spawn } = require('child_process');

const app = express();

let scraper = (req) => {
    
    return new Promise( (resolve, reject)=>{

    
    const childProcess =   spawn('python',['./flipkart_scraper.py',req.query.psearch]);
    
    childProcess.stdout.on('data', function(data) { 
         resolve(data)
    }); 
    childProcess.stderr.on('data',(data)=>{
           reject(error)
           
    })
      
});    

}
app.get('/getScrapedData',  (req,res)=>{
    res.write("")
    scraper(req).then((scrapedData)=>{
        res.end(scrapedData)
    })
    .catch((err) => {
        console.log("Error occured: " +err)
    })
});

app.listen(3000,()=>{
    console.log("Running on 3000");
});

