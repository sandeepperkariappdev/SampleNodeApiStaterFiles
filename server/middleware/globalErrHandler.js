module.exports = function(){
    return function(err, req, res, next){
        console.log(err.stack);// gives the stack trace
        console.log(err);// error [ERROR:message]
        console.log(err.message);// error message
        res.status(500);
    };
}
    
    