var express = require('express')
var app = express();
var request= require('request-json');
//const nodemailer = require ('nodemailer');
//const xoauth2 =  require ('xoauth2') ;


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var convert = require('xml-js');
var app = express();
// var url = 'mongodb://root:secure@ds161483.mlab.com:61483/asefall17';
var url = 'mongodb://appstest:appstest123@ds137003.mlab.com:37003/apps';
var url1 = 'mongodb://htata31:tata1994@ds135993.mlab.com:35993/htata';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var client = request.createClient('http://127.0.0.1:5000/');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/getHackData', function (req, res) {
    var searchKeywords = req.query.keywords.substring(0,req.query.keywords.indexOf('!!!'));
    var searchKeywords1 = req.query.keywords.substring(req.query.keywords.indexOf('!!!')+3,req.query.keywords.indexOf('@@@'));
    var searchKeywords2 = req.query.keywords.substring(req.query.keywords.indexOf('@@@')+3,req.query.keywords.length);
    console.log("Param are "+req.query.keywords);
    console.log("Param are searchKeywords"+searchKeywords);
    console.log("Param are "+searchKeywords1);
    console.log("Param are "+searchKeywords2);

    console.log(typeof(searchKeywords));

    MongoClient.connect(url1, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while cosnnecting to Database");
            res.end();
        }
        if (err) throw err;
        var dbo = db.db("htata");
        var query = { max_players: {$lt:  parseInt(searchKeywords)},avg_time: parseInt(searchKeywords1),category:new RegExp(searchKeywords2, "i")};
        var mysort = { avg_rating: -1 };
        dbo.collection("hackathon").find(query).sort(mysort).toArray(function(err, result) {
            if (err) throw err;

            console.log('here');
            db.close();
            res.json(result);
            // console.log(res.json(result));
        });
    });
});

app.get('/kg', function (req, res) {
    var searchKeyword = req.query.query;
    console.log("searchKeyword is XXXXX",searchKeyword);
    client.get("https://www.boardgamegeek.com/xmlapi/boardgame/"+searchKeyword+"&indent=True", function (error, response, body) {
        var xml = body;
        var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
        res.send(result1);
    });
});








var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
})

app.listen(port, function() {
	console.log('app running')
    console.log("Example app listening at http://:%s", port)
})

