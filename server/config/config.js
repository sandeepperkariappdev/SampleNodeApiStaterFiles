var _ = require("lodash");

var config = {
    dev:"development",
    test:"testing",
    prod:"production",
    port:process.env.PORT || 3000
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;
//TODO 
//envConfig is nothign right now , but it should be an object.
//depending on what ever config.env is, load up the appropriate file
// and assign the value to envConfig so the merge at the bottom actually
// What's happening here is that we have a base config in this fiel then
// conditionally load in another config file depending on what env we're in . 
//we then merge those objects with the env config overriding the default config if here, we then export that new object for our application.


var envConfig;

try{
    envConfig = require("./"+config.env);
    envConfig = envConfig || {};
} catch(e){
    envConfig = {};
}

module.exports = _.merge(config, envConfig);

