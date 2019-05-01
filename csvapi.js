const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const initFiles = () => {
  fs.writeFile('data/users.csv', 'NationalRegistry,Firstname,Lastname,Password\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/votes.csv', 'Party,Votes\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/voted.csv', 'NationalRegistry\n', (err) => {
    if (err) throw err;
  });
};

const addUser = (natreg, first, last, pass) => {
  const csvWriter = createCsvWriter({
    path: 'data/users.csv',
    header: [
      { id: 'natreg', title: 'NationalRegistry' },
      { id: 'first', title: 'Firstname' },
      { id: 'last', title: 'Lastname' },
      { id: 'pass', title: 'Password' },
    ],
    append: true,
  });

  const data = [{
    natreg,
    first,
    last,
    pass,
  }];

  csvWriter
    .writeRecords(data);
};

const checkUserCredentials = (natreg, pass) => {
  let cred = false;
  fs.createReadStream('data/users.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.NationalRegistry === natreg) {
        if (row.pass === pass) {
          cred = true;
        }
      }
    });
  return cred;
};

const addVoter = (natreg) => {
  const csvWriter = createCsvWriter({
    path: 'data/voted.csv',
    header: [
      { id: 'natreg', title: 'NationalRegistry' },
    ],
    append: true,
  });

  const data = [{
    natreg,
  }];

  csvWriter
    .writeRecords(data);
};

const addParty = (party) => {
  const csvWriter = createCsvWriter({
    path: 'data/votes.csv',
    header: [
      { id: 'party', title: 'Party' },
      { id: 'votes', title: 'Votes' },
    ],
    append: true,
  });

  const data = [{
    party,
    votes: '0',
  }];

  csvWriter
    .writeRecords(data);
};

const addVote = (party) => {
  const data = [];
  fs.createReadStream('data/votes.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.Party === party) {
        data.push({
          party: row.Party,
          votes: String(parseInt(row.Votes, 10) + 1),
        });
      } else {
        data.push({
          party: row.Party,
          votes: row.Votes,
        });
      }
    })
    .on('end', () => {
      const csvWriter = createCsvWriter({
        path: 'data/votes.csv',
        header: [
          { id: 'party', title: 'Party' },
          { id: 'votes', title: 'Votes' },
        ],
      });


      csvWriter
        .writeRecords(data);
    });
};

const checkVoted = (natreg) => {
  let voted = false;
  fs.createReadStream('data/voted.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.NationalRegistry === natreg) {
        voted = true;
      }
    });
  return voted;
};

const getParties = () => {
  const parties = [];
  fs.createReadStream('data/voted.csv')
    .pipe(csv())
    .on('data', (row) => {
      parties.push(row.Party);
    });
  return parties;
};

const getResults = () => {
  const results = [];
  fs.createReadStream('data/voted.csv')
    .pipe(csv())
    .on('data', (row) => {
      results.push({
        Party: row.Party,
        Votes: row.Votes,
      });
    });
  return results;
};

module.exports.checkUserCredentials = checkUserCredentials;
module.exports.getResults = getResults;
module.exports.getParties = getParties;
module.exports.checkVoted = checkVoted;
module.exports.addVoter = addVoter;
module.exports.addVote = addVote;
module.exports.addUser = addUser;
module.exports.addParty = addParty;
module.exports.initFiles = initFiles;
