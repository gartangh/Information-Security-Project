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
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 5000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 5500);
/*
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 6000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 6500);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 7000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 7500);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 8000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 8500);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 9000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 9500);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 10000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 10500);
setTimeout(() => {
  api.addParty('groen', 'Federal');
}, 11000);
setTimeout(() => {
  api.addParty('vlaams belang', 'Federal');
}, 11500);*/