const api = require('./csvapi.js')

api.initFiles();

// Users
// (natreg, first, last, pass)
setTimeout(() => {
  api.addUser('01406181', 'Thomas', 'Uyttenhove', '9000');
}, 0);
setTimeout(() => {
  api.addUser('01500322', 'Jaime', 'Roelandts', '9000');
}, 500);
setTimeout(() => {
  api.addUser('01501457', 'Garben', 'Tanghe', '9000');
}, 1000);
setTimeout(() => {
  api.addUser('01502363', 'Bram', 'De Smet', '9000');
}, 2000);
setTimeout(() => {
  api.addUser('01503573', 'Olivier', 'Van den Nest', '9000');
}, 2500);
setTimeout(() => {
  api.addUser('01507157', 'Robbe', 'De Vilder', '9000');
}, 3000);
setTimeout(() => {
  api.addUser('802000272949', 'Dirk', 'Deschrijver', '9000');
}, 3500);
setTimeout(() => {
  api.addUser('801000974707', 'Eric', 'Laermans', '9000');
}, 4000);
setTimeout(() => {
  api.addUser('20046160', 'Bert', 'Vankeirsbilck', '9000');
}, 4500);

// Parties
// (name, election)
// open-vld; groen; vlaams-belang; n-va; pvda; cd-v; sp-a; volt; uf; blanco
// national-federal-elections; regional-elections; european-elections
setTimeout(() => {
  api.addParty('cd-v', 'national-federal-elections');
}, 5000);
setTimeout(() => {
  api.addParty('groen', 'national-federal-elections');
}, 5500);
setTimeout(() => {
  api.addParty('n-va', 'national-federal-elections');
}, 6000);
setTimeout(() => {
  api.addParty('open-vld', 'national-federal-elections');
}, 6500);
setTimeout(() => {
  api.addParty('pvda', 'national-federal-elections');
}, 7000);
setTimeout(() => {
  api.addParty('sp-a', 'national-federal-elections');
}, 7500);
setTimeout(() => {
  api.addParty('vlaams-belang', 'national-federal-elections');
}, 8000);
setTimeout(() => {
  api.addParty('blanco', 'national-federal-elections');
}, 8500);

setTimeout(() => {
  api.addParty('groen', 'regional-elections');
}, 9000);
setTimeout(() => {
  api.addParty('vlaams-belang', 'regional-elections');
}, 9500);
setTimeout(() => {
  api.addParty('open-vld', 'regional-elections');
}, 10000);
setTimeout(() => {
  api.addParty('uf', 'regional-elections');
}, 10500);
setTimeout(() => {
  api.addParty('sp-a', 'regional-elections');
}, 11000);
setTimeout(() => {
  api.addParty('n-va', 'regional-elections');
}, 11500);
setTimeout(() => {
  api.addParty('cd-v', 'regional-elections');
}, 12000);
setTimeout(() => {
  api.addParty('pvda', 'regional-elections');
}, 12500);
setTimeout(() => {
  api.addParty('blanco', 'regional-elections');
}, 13000);


setTimeout(() => {
  api.addParty('open-vld', 'european-elections');
}, 13500);
setTimeout(() => {
  api.addParty('n-va', 'european-elections');
}, 14000);
setTimeout(() => {
  api.addParty('vlaams-belang', 'european-elections');
}, 14500);
setTimeout(() => {
  api.addParty('pvda', 'european-elections');
}, 15000);
setTimeout(() => {
  api.addParty('cd-v', 'european-elections');
}, 15500);
setTimeout(() => {
  api.addParty('groen', 'european-elections');
}, 16000);
setTimeout(() => {
  api.addParty('sp-a', 'european-elections');
}, 16500);
setTimeout(() => {
  api.addParty('volt', 'european-elections');
}, 17000);
setTimeout(() => {
  api.addParty('blanco', 'european-elections');
}, 17500);
