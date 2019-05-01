var express = require("express");
var app = express();
var https = require('https');
var fs = require('fs');


const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 4096});


// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('privatekeyaes.pem'),
  cert: fs.readFileSync('certificateaes.pem')
};

app.use(express.urlencoded());

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('index.html');
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) { 
	console.log('static file request : ' + req.params);
	res.sendfile( __dirname + req.params[0]);
});

app.post('/submit-form', (req, res) => {
	const nr = req.body.nr;
	const pin = req.body.pin;
	// ...
	console.log(nr);
	console.log(pin);
	res.end();
});

var port = process.env.PORT || 5000;
/*app.listen(port, function() {
	console.log("Listening on " + port);
});*/

https.createServer(options, app).listen(port, function() {
	console.log("Listening on " + port);
})	;
