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
// Federal; Regional; Europe
setTimeout(() => {
  api.addParty('cd-v', 'Federal');
}, 5000);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 5500);
setTimeout(() => {
  api.addParty('n-va', 'Federal');
}, 6000);
setTimeout(() => {
  api.addParty('open-vld', 'Federal');
}, 6500);
setTimeout(() => {
  api.addParty('pvda', 'Federal');
}, 7000);
setTimeout(() => {
  api.addParty('sp-a', 'Federal');
}, 7500);
setTimeout(() => {
  api.addParty('vlaams-belang', 'Federal');
}, 8000);
setTimeout(() => {
  api.addParty('blanco', 'Federal');
}, 8500);

setTimeout(() => {
  api.addParty('groen', 'Regional');
}, 9000);
setTimeout(() => {
  api.addParty('vlaams-belang', 'Regional');
}, 9500);
setTimeout(() => {
  api.addParty('open-vld', 'Regional');
}, 10000);
setTimeout(() => {
  api.addParty('uf', 'Regional');
}, 10500);
setTimeout(() => {
  api.addParty('sp-a', 'Regional');
}, 11000);
setTimeout(() => {
  api.addParty('n-va', 'Regional');
}, 11500);
setTimeout(() => {
  api.addParty('cd-v', 'Regional');
}, 12000);
setTimeout(() => {
  api.addParty('pvda', 'Regional');
}, 12500);
setTimeout(() => {
  api.addParty('blanco', 'Regional');
}, 13000);


setTimeout(() => {
  api.addParty('open-vld', 'Europe');
}, 13500);
setTimeout(() => {
  api.addParty('n-va', 'Europe');
}, 14000);
setTimeout(() => {
  api.addParty('vlaams-belang', 'Europe');
}, 14500);
setTimeout(() => {
  api.addParty('pvda', 'Europe');
}, 15000);
setTimeout(() => {
  api.addParty('cd-v', 'Europe');
}, 15500);
setTimeout(() => {
  api.addParty('groen', 'Europe');
}, 16000);
setTimeout(() => {
  api.addParty('sp-a', 'Europe');
}, 16500);
setTimeout(() => {
  api.addParty('volt', 'Europe');
}, 17000);
setTimeout(() => {
  api.addParty('blanco', 'Europe');
}, 17500);


setTimeout(() => {
  console.log(api.getUserInfo('01502363'));
}, 18000);
