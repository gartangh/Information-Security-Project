const { SHA3 } = require('sha3');
var express = require("express");
var session = require("express-session");
var app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({
	secret: "monkey",
	resave: false,
	saveUninitialized: true,
	cookie: { 
		maxAge: 60000,
		secure: true
	}
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
		api.checkUserCredentials(sess.nr, sess.hash).then((cred)=>{
			if(cred === true){
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
			api.checkUserVoted(id).then((voted) => {
				if (voted === false) {
					req.session.nr = id;
					req.session.hash = hexHash;

					console.log(req.session.nr);

					console.log('Redirecting');
					res.redirect('form.html');
				}
				else {
					console.log('User already voted');
					res.send('<script>alert("The entered credentials have already been used to voted. You can only vote once."); window.location.href="/index.html";</script>');
					res.redirect('index.html');
				}
			});
		}
		else {
			res.send('<script>alert("The entered credentials do not match an entitled voter. Please check if the entered national registry number and pincode are correct and try again."); window.location.href="/index.html";</script>');
		}
	});

	// Reset hash.
	hash.reset();
});

app.post('/get-user-info', (req, res) => {
	api.getUserInfo(req.session.nr).then((user) => {
		console.log(user);
		res.send(user);
	});
});

app.post('/vote', (req, res) => {


	console.log(req.body);

	api.addVoter(req.session.nr);
	api.addVote(req.body['national-federal-elections'], 'Federal');
	api.addVote(req.body['regional-elections'], 'Regional');
	api.addVote(req.body['european-elections'], 'Europe');


	console.log("yolojieo");
	var sess = req.session;
	sess.destroy((err) => console.log("helaas"));
	console.log(sess);

	res.redirect('voted.html');


});

