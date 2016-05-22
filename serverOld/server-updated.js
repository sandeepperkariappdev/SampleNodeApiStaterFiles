var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var app = express();
var employeeRouter = require('./employee-server');
var morgan = require('morgan');


// this iwll log the incoming and outgoing requests in the console
// this will also log the request time and response time.
app.use(morgan('dev'));
// anything come from the client directory will be taken 
// automatically as a static directory using express.static
// also it will serve the index.html on the root of 
//that directory on a GET to '/'
app.use(express.static('client'));


//body parser makes it possible to post JSON to the 
//server, we can access data we post on as req.body

// data object we send from the client will be available
//with req.body using the bodyparser
app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());

app.use('/employees',employeeRouter);
app.use('/students',studentRouter);


// this will be called first as this is top of the second error function,
app.use(function(err, req, res, next){
    console.log('here in error');
    console.log(err);
});
//error handling middleware
app.use(function(err, req, res, next){
    
    req.status(500).send(err);
});


module.exports = app;
