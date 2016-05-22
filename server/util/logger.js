require("colors");
var _ = require("lodash");

var config = require("../config/config");
//create no operation function for when loggin is disabled
var noOp = function(){};

var consoleLog = config.logging ? console.log.bind(console) : noOp;

var logger = {
  log: function(){
      var args = _.toArray(arguments).map(function(args){
          if(typeof arg === "object"){
              var string = JSON.stringify(arg,2);
              return string.magenta;              
          } else {
              arg +="";
              return arg.magenta;
          }
      });
      
      consoleLog.apply(console, args);      
  }  
};

module.exports = logger;