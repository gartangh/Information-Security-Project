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
  const auth = api.checkUserCredentials(42069, 'Password');
  console.log(auth);
}, 3500);


setTimeout(() => {
  const auth = api.checkUserCredentials(42069, 'BADWORD');
  console.log(auth);
}, 3500);

// Users
// (natreg, first, last, pass)
setTimeout(() => {
  api.addUser('01406181', 'Thomas', 'Uyttenhove', 'Password');
}, 4000);
setTimeout(() => {
  api.addUser('01500322', 'Jaime', 'Roelandts', 'Password');
}, 4500);
setTimeout(() => {
  api.addUser('01501457', 'Garben', 'Tanghe', 'Password');
}, 5000);
setTimeout(() => {
  api.addUser('01502363', 'Bram', 'De Smet', 'Password');
}, 5500);
setTimeout(() => {
  api.addUser('01503573', 'Olivier', 'Van den Nest', 'Password');
}, 6000);
setTimeout(() => {
  api.addUser('01507157', 'Robbe', 'De Vilder', 'Password');
}, 6500);
setTimeout(() => {
  api.addUser('802000272949', 'Dirk', 'Deschrijver', 'Password');
}, 7000);
setTimeout(() => {
  api.addUser('801000974707', 'Eric', 'Laermans', 'Password');
}, 7500);
setTimeout(() => {
  api.addUser('20046160', 'Bert', 'Vankeirsbilck', 'Password');
}, 8000);
