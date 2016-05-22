var express = require("express");
var app = express();
var api = require("./api/api");// this is a router
var err = require("./middleware/err");

require("./middleware/appMiddleware")(app);

app.use("/api/",api);

//set up global error handling
app.use(err());

module.exports = app;