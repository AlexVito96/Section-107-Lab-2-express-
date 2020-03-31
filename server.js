var http = require('http');
var express = require('express');

/***********************************************
 *  Configuration Section
 **********************************************/

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// to serve HTML
var ejs = require('ejs');
console.log(__dirname);
app.set('views', __dirname + '/public'); // the folder that contains HTML files
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// to serve static files
app.use(express.static(__dirname + '/public')); // serve  ***all files from this location



// Database Connection Settings
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;

/***********************************************
 *  Web Server Functionality
 **********************************************/
app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/admin',(req, res) => {
    res.render('admin.html');
});

app.get('/about', function(req, res){
    res.render('about.html');
    /**
    * Render some html page (name, )
    * when the user visits /about
    */
});


/***********************************************
 *  API Functionality
 **********************************************/

var ItemDB; // this is the model for DB items

app.get('/api/items', function (req, res) {
    ItemDB.find({}, function (error, data) {
        if (error) {
            console.log("Error reading items");
            res.status(500);
            res.send(error);
        }

        //no error
        res.status(200);
        res.json(data);

    });
});

app.get('/api/items/:name', function(req, res){
    var name = req.params.name;
    ItemDB.find({user: name},function(error, data){
        if (error) {
            console.log("Error reading items");
            res.status(500);
            res.send(error);
        }

        //no error
        res.status(200);
        res.json(data);
    });
});

app.get('/api/items/priceLowerThan/:price', function(req, res){
    var val = req.params.price;
    ItemDB.find({ price: {$lte: val} }, function(error, data){
        if(error){
            console.log("Error reading items");
            res.status(500);
            res.send(error);
        }

        // no error
        res.status(200);
        res.json(data);
    })
 });

app.post('/api/items', function (req, res) {
    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(function (error, savedItem) {
        if (error) {
            console.log("Error saving object", error);
            res.status(500); // http status 500:Internal Server Error
            res.send(error);
        }

        // No error
        console.log("Object saved!!");
        res.status(201); // 201: Created
        res.json(savedItem);

    });

});


/** Start the server and Database check connection */

db.on('open', function () {
    console.log('Yes sir, connected to DB');

    /* 
        Data types allowed for schemas:
        String, Number, Date, Buffer, Boolean, ObjectId, Array
    */

    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String
    });

    //create object constructor
    ItemDB = mongoose.model('itemsCH7', itemSchema);

});

db.on('error', function (details) {
    console.log("Error: DB connection error")
    console.log("Error details: " + details);
});

app.listen(8080, function () {
    console.log("Server running at localhost:8080");
});