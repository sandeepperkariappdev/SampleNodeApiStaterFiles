var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;




describe('students',function(){
    
    beforeEach(function(){
        console.log('calls for each call');
    });
    it('should get all students', function(done){
        request(app)
            .get('/students')
            .set('Accept','application/json')        
            .expect('Content-Type','json')
            .expect(200)
            .end(function(err, resp){
                chai(resp.body).to.be.an('array');
                done();
            });
    });    
    it('should get a given student', function(done){
        request(app)
                .get('/students/:sandeep')
                .set('Accept','application/json')
                .expect('Content-Type','json')
                .expect(200)
                .end(function(err, resp){
                        chai(resp.body).to.be.an("object");
                        done();
                    });
    });
    it('should send student',function(done){
       request(app)
           .post('/students')
           .send({
                name : "name11",
                class : "1st",
                school : "ABCD",
                id : 1111
            })
             .set('Accept','application/json')
             .expect('Content-Type','json')
            .expect(200)
            .end(function(err, resp){
                   var sandeep = resp.body;
                chai(sandeep).to.be.an('object');
                chai(sandeep.name).to.be('sandeep');
                done();
               });             
        });
        it('should update student', function(done){
            request(app)
                    .post('/students/:name')
                    .send({
                        name : "name11",
                        class : "1st",
                        school : "ABCD",
                        id : 1111
                    })
                    .set('Accept','application/json')
                    .end(function(err, resp){
                        var respObj = resp.body;
                        request(app).put('/students/'+student.id)
                        .send({name:"new name"})
                        .end(function(err, resp){
                            var respBody = resp.body;   
                            chai(respBody.name).to.equal('new name');
                            done();
                        });
                    });                        
            });
});