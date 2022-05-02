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

const i_host = 'localhost';
const i_port = 3001;
const i_prot = 'http';

console.log(  'HOST: ' +  i_host );
console.log(  'PORT: ' +  i_port );


describe('Тестируем кодирование и декодирование base64', function() {
  let test_server;
  let app;





  before(done => {
    app = require(process.cwd() + '/bin/www');
    test_server = app.listen(process.env.PORT || 3001, done);
 
  });
 



  it('Post Кодируем в base64', function(done){
        var l_req = { msg: 'Текс для кодирования в Base64'}
 
        console.log('Запрос: ');
        console.log( JSON.stringify(l_req) );
        console.log('Ответ: ');
 

        request(i_prot + '://' + i_host +':'+ i_port.toString() )
        .post('/b64encode')
        .send( l_req )
        .set('Accept', 'application/json')
        //.expect('Content-Type', 'application/json; charset=utf-8')
        //.expect(200)
        .end(function(err, res) {
            if (err) {
                console.log(err.message);
                done(err);
            } else {
                var lrsp = res.body;
                console.log(  JSON.stringify(lrsp)  );
              
                done();
            }    
        });
    
  }); //it 

  it('Post ДеКодируем из base64', function(done){
    var l_req =  { str: '0KLQtdC60YEg0LTQu9GPINC60L7QtNC40YDQvtCy0LDQvdC40Y8g0LIgQmFzZTY0' }
    
    console.log('Запрос: ');
    console.log( JSON.stringify(l_req) );
    console.log('Ответ: ');
  

    request(i_prot + '://' + i_host +':'+ i_port.toString() )
    .post('/b64decode')
    .send( l_req )
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end(function(err, res) {
        if (err) {
            console.log(err.message);
            done(err);
        } else {
            var lrsp = res.body;
            console.log(  JSON.stringify(lrsp)  );
            lrsp.should.have.property('str');
            done();
        }    
    });

  }); //it 


  // end of test
  after(done => {
    test_server.close(done);
 
  });
});
