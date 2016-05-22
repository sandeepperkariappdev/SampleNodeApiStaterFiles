var config = require("./server/config/config");
var app = require("./server/server.js")
var logger = require("./server/util/logger");

app.listen(config.port);
logger.log("Listening on http://localhost" + config.port);


//var app = require('./server/server-updated.js');
//
//app.listen("3400",function(){
//    console.log("Server running on http://localhost:3400");
//});