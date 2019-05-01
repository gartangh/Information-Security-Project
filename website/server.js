var express = require("express");
var app = express();
var https = require('https');
var fs = require('fs');


const NodeRSA = require('node-rsa');
const keyRSA = new NodeRSA({b: 4096});


// AES dictionary
var optionsAES = {
  key: fs.readFileSync('privatekeyaes.pem'),
  cert: fs.readFileSync('certificateaes.pem'),
  passphrase: 'informationsecurity'
};

// RSA dictionary
/*var optionsRSA = {
	key: keyRSA,
	cert:
};*/

//const crypto = require('crypto');

var port = process.env.PORT || 5000;

/*app.listen(port, function() {
	console.log("Listening on " + port);
});*/

var httpsServer = https.createServer(optionsAES, app);
httpsServer.listen(port, function() {
	console.log("Listening on " + port);
});

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


