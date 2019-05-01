const { SHA3 } = require('sha3');
var express = require("express");
var session = require("express-session");
var app = express();
app.set('trust proxy', 1);
app.use(express.json());
var https = require('https');
var fs = require('fs');
const crypto = require('crypto');

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

	// test purpose -> needs to be moved
	app.use(session({
		secret: hexHash,
		resave: false,
		saveUninitialized: true,
		cookie: { 
			maxAge: 60000,
			secure: true
		}
	}));
	res.redirect('form.html');
	// TODO: Log user in if id and hexHash is correct.
	if (checkUserCredentials(id, hexHash))
		res.redirect();
	else
		res.end();
});

