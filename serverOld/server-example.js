// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

var express = require('express');
var app = express();
var fs = require('fs');

var jsonData = {count: 12, message: 'hey'};

//sending data
app.get('/',function(req,res){
    res.json(jsonData);
});

//sending a file
app.get('/getFile',function(req, res){
    res.sendFile(__dirname+'', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

//Sending Object
app.get('/getObject',function(req, res){
    res.send(jsonData);
});

//
app.get('/getFileUsingFS',function(req, res){  
    fs.readFile('index.html',function(err, buffer){
        var html = buffer.toString();
        res.setHeader('Content-Type','text/html');
        res.send(html);            
    });
});


var port = 3400;
app.listen(port,function(){
    console.log("Server running on http://localhost:3400")
});


