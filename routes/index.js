var express = require('express');
var router = express.Router();

// Connect to mongoDB
// 1. Require the module
var mongodb = require('mongodb');
// 2. Make a mongoClient so that Express can talk to Mongo
var mongoClient = mongodb.MongoClient;
// console.log(mongoClient);
// 3. Set up a var for the path to our mongoDB
// protocol://host:PORT/DBName
const mongoUrl = 'mongodb://localhost:27017/movieSite';
// Make global var to use over and over
var db;

// Actually connect to Mongo with:
// MongoClient to the mongoUrl
// connect takes 2 args:
// 	1. Where to connect to
// 	2. Callback to run when connected, with error and the connected db
mongoClient.connect(mongoUrl, (error, database)=>{
	if(error){
		throw error;
	}else{
		db = database;
		console.log("Connected to mongo successfully!");
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {

	// This is a module. So it's not the same as native mongo.
	// Unlike the command line:
	// db.collection, you pass collection the collection name
	// then you can add "find", "remove", "update", etc.
	db.collection('movies').find().toArray((error, results)=>{
		res.json(results);
	});
	// res.render('index', { title: 'Express' });
});

module.exports = router;
