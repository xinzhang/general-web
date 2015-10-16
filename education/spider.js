var http = require('http');


var url = 'http://www.bettereducation.com.au/school/Primary/nsw/nsw_top_primary_schools.aspx';

// function getSchools() {
// 	http.get({
// 		host: '192.168.11.22',
// 		port: 8080,
// 		path: ''url'',
// 		headers : {
// 			Host: 'www.bettereducation.com.au'
// 		}
// 	}, function(resp){
// 		var body = '';
// 		resp.on('data', function(d) {
//             body += d;
//         });		
// 		resp.on('end', function() {
// 			console.log(body);
// 		})
// 	});
// }

// getSchools();

// var req = http.request({
// 	host: '192.168.11.22',
// 	port: 8080,
// 	method: 'GET',
// 	path: 'http://www.google.com:8080'
// }, function(resp) {
// 	resp.on('data',function(data){
// 		console.log(data.toString());
// 	});
// });

// req.end();

 var request = require('request');

 request({'url':'http://www.bettereducation.com.au/school/Primary/nsw/nsw_top_primary_schools.aspx',
         'proxy':'http://192.168.11.22:8080'}, function (error, response, body) {
     if (!error && response.statusCode == 200) {
         console.log(body);
     }
     else
     {
     	console.log(error);
     }
});

