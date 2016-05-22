var studentRouter = require('express').Router();

var optionalMiddleware = function(options){
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
studentRouter.param('name', function(req, res, next){
    
    next();
});

// this get's called for any route - GET, - POST, - DELETE, - PUT.
studentRouter.all('/', function(req, res, next){
    console.log("Thsi gets called first and then goes to next route as we're calling next()");
    next();
});

studentRouter.get('/studentsCallingMiddleware', optionlaMiddlwware({name:''}), function(req, res, next){
    
});

studentRouter.get('/',function(req, res){
    res.send('Welcome!');
});

studentRouter.get('/callError',function(req, res, next){        
    next(new Error('error called'););
});

studentRouter.get('/',function(req, res){        
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

studentRouter.get('/:name', function(req, res, next){
    
    res.send();
});

studentRouter.post('/',incrementId, function(req, res){
    var request = req.body;
    console.log(request);
    students.length = 0;
    students.push(request);
    res.json(students);    
});

studentRouter.delete('/:id',function(req, res){
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


module.exports = studentRouter;