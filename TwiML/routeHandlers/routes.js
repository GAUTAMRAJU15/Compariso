

module.exports = (app) => {

  app.route('/getTwiRes')
  .post((req,res)=> {
    console.log(req.body);
  })
  .get((req,res) => {
    res.send("Just a GET request!");
  });


}
