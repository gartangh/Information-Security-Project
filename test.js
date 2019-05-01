const api = require('./csvapi.js')


api.initFiles()


console.log('Welcome to My Console,');
setTimeout(function() {
api.addParty("groen")
}, 1000);

/*setTimeout(function() {
api.addVote("groen")
}, 2000);

setTimeout(function() {
api.addVote("groen")
}, 3000);

setTimeout(function() {
api.addVote("groen")
}, 4000);

*/