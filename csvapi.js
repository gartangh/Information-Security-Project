const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { SHA3 } = require('sha3');
const hash = new SHA3();

const initFiles = () => {
  fs.writeFile('data/users.csv', 'NationalRegistry,Firstname,Lastname,Password\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/votesRegional.csv', 'Party,Votes\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/votesFederal.csv', 'Party,Votes\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/votesEurope.csv', 'Party,Votes\n', (err) => {
    if (err) throw err;
  });
  fs.writeFile('data/voted.csv', 'NationalRegistry\n', (err) => {
    if (err) throw err;
  });
};

const addUser = (natreg, first, last, pass) => {
  // Reset hash.
  hash.reset();
  // Hash pin, salted by id.
  hash.update(pass).update(natreg);
  // Hash returned as a hex-encoded string.
  var pass = hash.digest('hex');
  
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


function checkUserCredentials(natreg, pass) {
  return new Promise((resolve,reject) => {
    let cred = false;
    fs.createReadStream('data/users.csv').pipe(csv()).on('data', (row) => {
      if (String(row.NationalRegistry) === String(natreg)) {
        console.log('Id correct');
        if (String(row.Password) === String(pass)) {
          console.log('Pin correct');
          cred = true;
        }
      }
    }).on('end', () => {resolve(cred);});
  });
}

function checkUserVoted(natreg) {
  return new Promise((resolve,reject) => {
    let voted = false;
    fs.createReadStream('data/voted.csv').pipe(csv()).on('data', (row) => {
      if (String(row.NationalRegistry) === String(natreg)) {
        voted = true;
      }
    }).on('end', () => {resolve(voted);});
  });
}

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

const addParty = (party, election) => {
  const path = `data/votes${election}.csv`;
  const csvWriter = createCsvWriter({
    path,
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

const addVote = (party, election) => {
  const data = [];
  const path = `data/votes${election}.csv`;
  console.log(party)
  fs.createReadStream(path)
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
        path,
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

function getUserInfo (natreg){
  return new Promise((resolve, reject) => {
    fs.createReadStream('data/users.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (natreg == row.NationalRegistry){
        user = {
          nationalRegistryNumber: row.NationalRegistry,
          firstName: row.Firstname,
          lastName: row.Lastname,
        };

        resolve(user);
      }
    })
    .on('end', () => {
        user = {
        NationalRegistry: '',
        Firstname: '',
        Lastname: '',
    };
      resolve(user);
    });


  });
}

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
module.exports.checkUserVoted = checkUserVoted;
module.exports.getResults = getResults;
module.exports.getParties = getParties;
module.exports.checkVoted = checkVoted;
module.exports.addVoter = addVoter;
module.exports.addVote = addVote;
module.exports.addUser = addUser;
module.exports.addParty = addParty;
module.exports.initFiles = initFiles;
module.exports.getUserInfo = getUserInfo;