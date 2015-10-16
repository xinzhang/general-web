var fs = require('fs');

var htmlparser = require("htmlparser2");

var startedTable = false, startedTr = false, startedLink = false;

function School() {
    var name, branch, link, locality, overall, rank, suburb, state, postcode;

    return {
        name: name,   
        branch: branch,         
        link: link,
        locality: locality,
        overall: overall,
        rank: rank,
        suburb: suburb, 
        state: state, 
        postcode: postcode
    }
};

var currentAttr = '';
var currentSchool;
var schoolList = [];
var counter = 0;

var parser = new htmlparser.Parser({	
    onopentag: function(name, attribs){
        if(name === "a" && attribs.id !=undefined 
            && attribs.id.indexOf('ctl00_ContentPlaceHolder1_GridView1')==0)
        {            
            console.log (attribs.id);
    		startedLink = true;
            currentAttr = attribs.id;

            if (attribs.id.indexOf("LinkSchool") > 0)
            {
                counter++;

                currentSchool = new School();                                
                currentSchool.link = attribs.href;
                currentSchool.rank = counter;
                schoolList.push(currentSchool);
            }

        }
    },

    ontext: function(text){
        if (startedLink) {
    	   console.log(text)
            if (currentAttr.indexOf("LinkSchool") > 0)
            {
                var splits = text.split(',');
                if (splits.length == 4)
                {
                    currentSchool.name = splits[0];
                    currentSchool.suburb = splits[1];
                    currentSchool.state = splits[2];
                    currentSchool.postcode = splits[3];
                }

                if (splits.length == 5)
                {
                    currentSchool.name = splits[0];
                    currentSchool.branch = splits[1];
                    currentSchool.suburb = splits[2];
                    currentSchool.state = splits[3];
                    currentSchool.postcode = splits[4];
                }
            }
            
            if (currentAttr.indexOf("LinkLocality") > 0)
            {
                currentSchool.locality = text;
            }
            if (currentAttr.indexOf("LinkOverall") > 0)
            {
                currentSchool.overall = text;
            }

        }	    	
    },

    onclosetag: function(name){    
        if (name === "a") {
            startedLink = false;
            currentAttr = ''
        }
    }
}, {decodeEntities: true});


var path = 'nsw_top_primary_schools.htm';

fs.readFile(path, 'utf8', function(err, data){
	if (err) throw err;

	parser.write(data);
	parser.end();	

    //console.log(JSON.stringify(schoolList));

    fs.writeFile('schools.json', JSON.stringify(schoolList), function(err){
        if (err) throw err;
        console.log('file saved');
        console.log('total ' + counter + ' items');
    });

});


