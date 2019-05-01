const api = require('./csvapi.js');

api.initFiles();

// Users
// (natreg, first, last, pass)
setTimeout(() => {
  api.addUser('01406181', 'Thomas', 'Uyttenhove', 'Password');
}, 0);
setTimeout(() => {
  api.addUser('01500322', 'Jaime', 'Roelandts', 'Password');
}, 500);
setTimeout(() => {
  api.addUser('01501457', 'Garben', 'Tanghe', 'Password');
}, 1000);
setTimeout(() => {
  api.addUser('01502363', 'Bram', 'De Smet', 'Password');
}, 2000);
setTimeout(() => {
  api.addUser('01503573', 'Olivier', 'Van den Nest', 'Password');
}, 2500);
setTimeout(() => {
  api.addUser('01507157', 'Robbe', 'De Vilder', 'Password');
}, 3000);
setTimeout(() => {
  api.addUser('802000272949', 'Dirk', 'Deschrijver', 'Password');
}, 3500);
setTimeout(() => {
  api.addUser('801000974707', 'Eric', 'Laermans', 'Password');
}, 4000);
setTimeout(() => {
  api.addUser('20046160', 'Bert', 'Vankeirsbilck', 'Password');
}, 4500);

// Parties
// (name, election)
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 5000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 5500);