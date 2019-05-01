const { SHA3 } = require('sha3');
var express = require("express");
var app = express();
var https = require('https');
var fs = require('fs');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

const port = process.env.PORT || 5000;
const hash = new SHA3();
const key = new NodeRSA({b: 4096});

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('privatekeyaes.pem'),
  cert: fs.readFileSync('certificateaes.pem'),
  passphrase: 'informationsecurity'
};

var httpsServer = https.createServer(options, app);
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
	const id = req.body.id
	// Reset hash.
	hash.reset();
	// Hash pin, salted by id.
	hash.update(id).update(req.body.pin);
	// Hash returned as a hex-encoded string.
	var hexHash = hash.digest('hex');
	// Reset hash.
	hash.reset();

	console.log(hexHash);

	// TODO: Log user in if id and hexHash is correct.
	if (checkUserCredentials(id, hexHash))
		res.redirect();
	else
		res.end();
});

https.createServer(options, app).listen(port, function() {
	console.log("Listening on " + port);
});
