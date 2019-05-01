

const addUser = (natreg,first,last,birth, sex, pass) => {
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({  
	  path: 'data/users.csv',
	  header: [
	    {id: 'natreg', title: 'nationalRegistry'},
	    {id: 'first', title: 'nationalRegistry'},
	    {id: 'last', title: 'nationalRegistry'},
	    {id: 'pass', title: 'password'},
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






module.exports.addUser = addUser