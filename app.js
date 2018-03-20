var dbConfig = require('./config/database.config.js');
var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

var User = require('./app/models/user.model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
})

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//const router = express.Router()
//router.get('/users',(req,res) => {
app.get('/users', (req, res) => {
    User.find(function (err, users) {
        if (err)
            res.send(err);
        res.send(users);
    });
  /*var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
	mongoose.count({},function(err,totalCount) {
	 if(err) {
	   response = {"error" : true,"message" : "Error fetching data"}
	 }
	 mongoose.find({},{},query,function(err,data) {
		  // Mongo command to fetch all data from collection.
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			var totalPages = Math.ceil(totalCount / size)
			response = {"error" : false,"message" : data,"pages": totalPages};
		}
		res.json(response);
	 });
	})*/
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
