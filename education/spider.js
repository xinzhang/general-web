
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/education';
var async = require('async');
var request = require('request');
var fs = require('fs');

MongoClient.connect(url, function(err, db){	
	console.log("Connected correctly to server.");

	var cnt = 0;

	var list = db.collection('schools').find({}).limit(1);

// 	async.forEach(list, function(item, callback){
// 		console.log(item.link);		
// 		cnt++;	
// //		callback();

// 	}, function(err){
// 		console.log('iterating done');
// 	})

	list.toArray(function(err, result) {
		for (var i=0;i<result.length;i++)
		{
			var link = result[i].link;
			var detailUrl = 'http://www.bettereducation.com.au' + link.substr(8);
			console.log('send request to ' + detailUrl);

			request({'url':detailUrl,
     				 'proxy':'http://192.168.11.22:8080'}, function (error, response, body) {
				     if (!error && response.statusCode == 200) {
				         //console.log(body);
				         //fs.writeFile('test.htm', body);
				     }
				     else
				     {
				     	console.log(response.statusCode);
				     	console.log(error);
				     }
			});
		}

		db.close();
	});

	//db.close();
});

