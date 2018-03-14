const express = require('express'),// server middleware
    app = express(),
    mongoose = require('mongoose'),// MongoDB connection library
    bodyParser = require('body-parser'),// parse HTTP requests
    bcrypt = require('bcryptjs'), // middleware to encrypt/decrypt passwords
    morgan = require("morgan"),
    config = require("./config"),
    mongo = require("mongodb").MongoClient,
    cors = require('cors'),
    api = require('./app/routes/api')(app, express);// Grab environment variables

//     User = require('./server/models/user.model');


mongoose.Promise = global.Promise;

mongoose.connect(config.database, {
    useMongoClient: true,
}).then((data)=> {
    console.log("connected to mongoose");
}).catch((err)=> {
    console.log("err in connecting to mongoose")
});

mongo.connect(config.database)
    .then(()=> {
        console.log(`the database is ${config.database}`);
}).catch((err) => {
    console.log("there is a error");
});


app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use("/api",api);

app.get('*', function(req, res){
    res.sendFile("/bagdkart/BagDKart-Back-end/index.html");
});

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("Node server running on " + appEnv.url);
});