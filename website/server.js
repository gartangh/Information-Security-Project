var express = require("express");
var app = express();


app.use(express.urlencoded())

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html');
 });

 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });


 app.post('/submit-form', (req, res) => {
  const username = req.body.username
  //...
  console.log(req.body.username);
  res.end()
})

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });

