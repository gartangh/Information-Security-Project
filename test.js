const api = require('./csvapi.js');

api.initFiles();

setTimeout(() => {
  api.addParty('groen');
}, 500);

setTimeout(() => {
  api.addParty('vlaams belang');
}, 1000);


setTimeout(() => {
  api.addVote('groen');
}, 1500);

setTimeout(() => {
  api.addVote('groen');
}, 2000);


setTimeout(() => {
  api.addVote('vlaams belang');
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
