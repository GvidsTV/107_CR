

var express = require('express');
var app = express(); // create the app

/********************************
 * Configurations
 ********************************/

 // Enable CORS
 // FOR TEST ONLY (not in PROD)





// Allow CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});

// to config body-parser to read request payloads
var bparser = require('body-parser');
app.use(bparser.json());

// Render HTML using EJS
var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// To Server static files (css, js, images, pdf, doc, ....)
app.use(express.static( _dirname + '/public'));

//DB connection with mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var mongoDB = mongoose.connection;


/********************************
 ** Web Server endpoints **
 ********************************/


 app.get('/', function(req, res){
     res.render('index.html');
    });

app.get('/admin', function(req, res){
    res.render('admin.html');
    });


app.get('/about', function(req, res){
    res.render('about.html');
    });


app.get('/contact', function(req, res){
    res.render('contact.html');
    });

    //****************************************
    // REST API endpoints ********************
    // ***************************************

var db = [];
var lasted = 1;

app.post('/ap1/items', (req, res) => {
    
    // create a db object
var itemForMongo = itemDB(req.body);

    // save the object
    itemForMongo.save(function(error, savedItem){
        
    });
    // wait for response, respond back to the client


});

app.get('/api/items', (req, res) => {
    console.log("Client wants the DB");
    res.json(db);
});

mongoDB.on('error', function(error){
    console.log("Db connection error: " + error);
});

mongoDB.on('open', function(){
    console.log('Yeah, db connection opened');

    /* The allowed SchemaTypes are:String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array*/

    
// define schema for  DB collection
    var itemSchema = mongoose.Schema({ code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String

    });

    itemDB = mongoose.model("catCohort8", itemSchema);
});


app.listen(8080, function(){
    console.log('Server running!! at http://localhost:8080');
});