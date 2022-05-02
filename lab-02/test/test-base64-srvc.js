/**
 * Test cases for testing  service-docday.js  class
 * 
 * 
 */
 
 
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();


const tobj = require('../services/base64-srvc');




describe('Тестирую функции модуля base64-srvc', function() {
  let test_server;
  let app;
  this.timeout(0);



  before(done => {
    app = require(process.cwd() + '/bin/www');
    test_server = app.listen(process.env.PORT || 3001, done);
  });
 

  it('function base64encode - ожидается успешный результат ', function(done){
    
      var t_str = 'test data';
      try {
          var t_res = tobj.base64encode( t_str );
          expect( t_res ).to.be.a('string');
          console.log(t_res);
          done();
      } catch (err) {
          console.log(  err.message );
          done(err);
      }    
      
  }); //it 


  it('function base64encode - ожидается ошибка ValidationError', function(done){
    
    var t_str  ;
    try {
        var t_res = tobj.base64encode( t_str );
        console.log(t_res);
        var err_test = new Error('Ошибка тестироания!');
        done( err_test );
    } catch (err) {
        err.should.have.property('name');
        err.name.should.equal('NonValidationError'); 
        console.log(  err.message );
        console.log(  err.name );
        done();
    }    
    
  }); //it 


  it('function base64decode - ожидается успешный результат ', function(done){
    
      var t_str = 'dGVzdCBkYXRh';
      try {
          var t_res = tobj.base64decode( t_str );
          expect( t_res ).to.be.a('string');
          console.log(t_res);
          done();
      } catch (err) {
          console.log(  err.message );
          done(err);
      }    
      
  }); //it 

  
  it('function base64decode - ожидается ошибка ValidationError', function(done){
    
    var t_str  ;
    try {
        var t_res = tobj.base64decode( t_str );
        console.log(t_res);
        var err_test = new Error('Ошибка тестирвания!');
        done( err_test );
    } catch (err) {
        err.should.have.property('name');
        err.name.should.equal('ValidationError'); 
        console.log(  err.message );
        console.log(  err.name );
        done();
    }    
    
  }); //it 



  // end of test
  after(done => {
    test_server.close(done);
  });
});
