const csv = require('csv-parser');  
const fs = require('fs');


const initFiles = () => {
	fs.writeFile('data/users.csv', 'nationalRegistry,Firstname,Lastname,Password\n', function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});
	fs.writeFile('data/votes.csv', 'Party,Votes\n', function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	})


}

const addUser = (natreg,first,last, pass) => {
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({  
	  path: 'data/users.csv',
	  header: [
	    {id: 'natreg', title: 'NationalRegistry'},
	    {id: 'first', title: 'Firstname'},
	    {id: 'last', title: 'Lastname'},
	    {id: 'pass', title: 'Password'},
	  ],
	  append: true,
	});

	const data = [{
		natreg: natreg,
		first: first,
		last: last,
		pass:pass,
	}]

	csvWriter  
  		.writeRecords(data)
  		.then(()=> console.log('The CSV file was written successfully'));
}

const addVoter = (natreg) => {
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({  
	  path: 'data/voted.csv',
	  header: [
	    {id: 'natreg', title: 'NationalRegistry'},
	  ],
	  append: true,
	});

	const data = [{
		natreg: natreg,
	}]

	csvWriter  
  		.writeRecords(data)
  		.then(()=> console.log('The CSV file was written successfully'));
}

const addParty = (party) => {
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({  
	  path: 'data/votes.csv',
	  header: [
	    {id: 'party', title: 'Party'},
	    {id: 'votes', title: 'Votes'},
	  ],
	  append: true,
	});

	const data = [{
		party: party,
		votes: '0',
	}]

	csvWriter  
  		.writeRecords(data)
  		.then(()=> console.log('The CSV file was written successfully'));
}

async function addVote(party){
	data = []
	await fs.createReadStream('data/votes.csv')  
	  .pipe(csv())
	  .on('data', (row) => {
	  	console.log(row)
	  	if(row.Party === party){
	  		data.push({
	  			party: row.Party,
	  			votes: String(parseInt(row.Votes) + 1),
	  		})
	  		console.log(data)
	  	}
	  	else{
	  		data.push({
	  			party: row.Party,
	  			votes: row.Votes,
	  		})
	  		console.log(data)
	  	}
	    console.log(row.votes);
	  })
	  .on('end', () => {
	    console.log('CSV file successfully processed');
	    console.log(data)
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({  
	  path: 'data/votes.csv',
	  header: [
	    {id: 'party', title: 'Party'},
	    {id: 'votes', title: 'Votes'},
	  ],
	});

	console.log(data)

	csvWriter  
  		.writeRecords(data)
  		.then(()=> console.log('The CSV file was written successfully'));
	  })



	  console.log(data)


}

module.exports.addVote = addVote
module.exports.addUser = addUser
module.exports.addParty = addParty
module.exports.initFiles = initFiles