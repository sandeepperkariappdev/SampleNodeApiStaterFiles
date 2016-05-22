var employeeRouter = require('express').Router();
var employee = [];


var optionalMiddleware = function (options) {
    return function (req, res, next) {
        next();
    };
};

var staticId = 1100;
var employees = [];
var id = 0;

var incrementId = function (req, res, next) {
    var employeeReq = req.body;
    if (!employeeReq.id) {
        id++;
        employeeReq.id = id;
    }
    next();
};

// this get's called before the /employee/:name route
employeeRouter.param('name', function (req, res, next) {

    next();
});
// this get's called for any route - GET, - POST, - DELETE, - PUT.
employeeRouter.all('/', function (req, res, next) {
    console.log("Thsi gets called first and then goes to next route as we're calling next()");
    next();
});


employeeRouter.get('/employeesCallingMiddleware', optionlaMiddlwware({
    name: ''
}), function (req, res, next) {

});

employeeRouter.get('/', function (req, res) {
    res.send('Welcome!');
});

employeeRouter.get('/callError', function (req, res, next) {
    next(new Error('error called'));
});

employeeRouter.get('/', function (req, res) {
    for (var i = 0; i < 5; i++) {
        var x = {};
        x.name = "name" + i;
        x.class = "1st";
        x.school = "ABCD";
        x.id = staticId + i;
        employees.push(x);
    }
    res.json(employees);
});

employeeRouter.get('/:name', function (req, res, next) {

    res.send();
});

employeeRouter.post('/', incrementId, function (req, res) {
    var request = req.body;
    console.log(request);
    employees.length = 0;
    employees.push(request);
    res.json(employees);
});

employeeRouter.delete('/:id', function (req, res) {
    var employee = _.findIndex(employees, {
        id: req.params.id
    });
    if (!employees[employee]) {
        res.send();
    } else {

        //next(err)//-- this will throw error.
        var delStu = employees[employee];
        employees.splice(employee, 1);
        res.json(delStu);
    }
});

/// another way of calling
employeeRouter.route('/').get(function(req, res){
    for (var i = 0; i < 5; i++) {
        var x = {};
        x.name = "name" + i;
        x.class = "1st";
        x.school = "ABCD";
        x.id = staticId + i;
        employees.push(x);
    }
    res.json(employees);
}).post(function(req, res){
     var request = req.body;
    console.log(request);
    employees.length = 0;
    employees.push(request);
    res.json(employees);
});


employeeRouter.route('/:id').get(function(){
    
}).post(function(){
    
}).delete(function(){
    
});

module.exports = employeeRouter;