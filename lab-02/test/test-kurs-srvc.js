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

    var t_reqstr='Test String ';  
    var t_resexp='VGVzdCBTdHJpbmcg';
    try{
        var t_res = tobj.base64encode( t_reqstr );
        console.log(t_res);
        assert.typeOf(t_res, 'string');
        expect(t_res).to.equal('safsafsafdsa');
        done();
    } 
    catch(err){
        console.log(err.message);
        done(err);
    }
    



  }); //it 


  it('function base64encode - ожидается ошибка ValidationError', function(done){
    this.skip();
    done();
    
  }); //it 




  // end of test
  after(done => {
    test_server.close(done);
  });
});
