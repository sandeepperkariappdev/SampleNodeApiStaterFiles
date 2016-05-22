var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var app = express();
//var employeeRouter = require('./employee-server');
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
//app.use('/employees',employeeRouter);
app.use(bodyParser.json());



var optionlaMiddleware = function(options){
  return function(req, res, next){
    next();  
  };  
};

var staticId = 1100;
var students = [];
var id = 0;

var incrementId = function(req, res, next){
  var studentReq = req.body;
    if(!studentReq.id){
        id++;
        studentReq.id = id;       
    } 
     next();
};

// this get's called before the /student/:name route
app.param('name', function(req, res, next){
    
    next();
});
// this get's called for any route - GET, - POST, - DELETE, - PUT.
app.all('/', function(req, res, next){
    console.log("Thsi gets called first and then goes to next route as we're calling next()");
    next();
});


app.get('/studentsCallingMiddleware', optionlaMiddleware({name:''}), function(req, res, next){
    next();
});

app.get('/',function(req, res){
    res.send('Welcome!');
});

app.get('/callError',function(req, res, next){        
    next(new Error('error called'));
});

app.get('/students',function(req, res){        
    for(var i=0 ; i<5 ; i++){
        var x = {};
        x.name = "name"+i;
        x.class = "1st";
        x.school = "ABCD";
        x.id = staticId+i;
        students.push(x);    
    }    
    res.json(students);
});

app.get('/student/:name', function(req, res, next){
    
    res.send();
});

app.post('/students',incrementId, function(req, res){
    var request = req.body;
    console.log(request);
    students.length = 0;
    students.push(request);
    res.json(students);    
});

var users = [];
app.post('/users',incrementId, function(req, res){
    var request = req.body;
    console.log(request);
    users.length = 0;
    users.push(request);
    res.json(users);    
});

app.delete('/students/:id',function(req, res){
    var student = _.findIndex(students,{id:req.params.id});
    if(!students[student]){
        res.send();        
    } else {
        
        //next(err)//-- this will throw error.
        var delStu = students[student];
        students.splice(student,1);
        res.json(delStu);
    }
});

// this will be called first as this is top of the second error function,
app.use(function(err, req, res, next){
    console.log('here in error');
    console.log(err);
});
//error handling middleware
app.use(function(err, req, res, next){    
    req.status(500).send(err);
});
app.listen("3400",function(){
    console.log("Server running on http://localhost:3400");
});