const { SHA3 } = require('sha3');
var express = require("express");
var session = require("express-session");
var app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({
	secret: "monkey",
	/*resave: false,
	saveUninitialized: true,
	cookie: { 
		maxAge: 60000,
		secure: true
	}*/
}));

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

const bodyParser = require('body-parser');
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/* serves main page */
app.get("/", function(req, res) {
	res.sendfile('index.html');
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) {	
	console.log('static file request : ' + req.params[0]);
	var sess = req.session;
	if(req.params[0] == "/form.html"){
		console.log(sess);
		api.checkUserCredentials(sess.nr, sess.hash).then((cred)=>{
			console.log(cred);
			if(cred === true){
				console.log("aaaah");
				res.sendfile( __dirname + req.params[0]);
			}else{
				res.sendfile('index.html');
			}
		})
	}else{
		res.sendfile( __dirname + req.params[0]);
	}
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
	api.checkUserCredentials(id, hexHash).then((cred) => {
		console.log(cred);
		if (cred === true) {
			req.session.nr = id;
			req.session.hash = hexHash;
			console.log('Redirecting');
			res.redirect('form.html');
		}
		else {
			console.log('Wrong credentials');
			res.redirect('index.html');
		}
	});

	// Reset hash.
	hash.reset();
});

app.post('/vote', (req, res) => {
	//console.log(req)
	console.log(req.body)
	console.log(req.body['national-federal-elections'])
	api.addVote(req.body['national-federal-elections'], 'Federal')
	api.addVote(req.body['regional-elections'], 'Regional')
	api.addVote(req.body['european-elections'], 'Europe')
	res.redirect('voted.html');

});

