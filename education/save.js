
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/education';

var fs = require('fs');
var jsonfile = 'schools.json';
var list = JSON.parse( fs.readFileSync(jsonfile, 'utf8'));

MongoClient.connect(url, function(err, db){	
	console.log("Connected correctly to server.");

	if (db.collection("schools") != undefined)
	{
		db.collection("schools").drop();
	}

	for (i=0; i< list.length; i++)
	{
		var school = list[i];
		db.collection("schools").insert(school);

		if (i == list.length-1)
		{
			console.log('finished!')
		}
	}

	db.close();

});



