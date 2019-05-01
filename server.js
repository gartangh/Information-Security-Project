const { SHA3 } = require('sha3');
var express = require("express");
var session = require("express-session");
var app = express();
app.set('trust proxy', 1);
var https = require('https');
var fs = require('fs');
const crypto = require('crypto');
const api = require('./csvapi');

const port = process.env.PORT || 5000;
const hash = new SHA3();

// AES dictionary
var optionsAES = {
  key: fs.readFileSync('prkeyaes.pem'),
  cert: fs.readFileSync('ca.crt'),
  passphrase: 'informationsecurity15'
};

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
	//console.log('static file request : ' + req.params[0]);
	res.sendfile( __dirname + req.params[0]);
});

app.post('/submit-form', (req, res) => {
	console.log('Trying to log in');

	const id = req.body.id;
	const pin = req.body.pin;

	console.log(id);
	console.log(pin);

	// Reset hash.
	hash.reset();
	// Hash pin, salted by id.
	hash.update(pin).update(id);
	// Hash returned as a hex-encoded string.
	var hexHash = hash.digest('hex');
	
	console.log(hexHash);

	// Log user in if id and hexHash is correct.
	if (api.checkUserCredentials(id, hexHash) === true) {
		console.log('Redirecting')
		res.redirect('form.html');
	}
	else {
		console.log('Wrong credentials')
		res.redirect('index.html');
	}

	app.use(session({
		secret: hexHash,
		resave: false,
		saveUninitialized: true,
		cookie: { 
			maxAge: 60000,
			secure: true
		}
	}));

	// Reset hash.
	hash.reset();
});

