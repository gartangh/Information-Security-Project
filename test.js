const api = require('./csvapi.js');

api.initFiles();

setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 500);

setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 1000);


setTimeout(() => {
  api.addVote('groen', 'Federal');
}, 1500);

setTimeout(() => {
  api.addVote('groen', 'Federal');
}, 2000);


setTimeout(() => {
  api.addVote('vlaams belang', 'Federal');
}, 2500);

setTimeout(() => {
  api.addUser(42069, 'John', 'Doe', 'Password');
}, 3000);
/*
(natreg, first, last, pass) */

setTimeout(() => {
  const auth = api.checkUserCredentials(42069, 'Password');
  console.log(auth);
}, 3500);


setTimeout(() => {
  const auth = api.checkUserCredentials(42069, 'BADWORD');
  console.log(auth);
}, 3500);
