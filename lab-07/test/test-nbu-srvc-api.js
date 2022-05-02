/**
 * Тестирования вызова сервиса НБУ - напрямую
 */
  // подключнеие инструментов естирования
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();


// доп. библиотеки для поддрежки обмена
var http = require('http');
//var https = require('https');

// описание общего тестовго кейса
describe('Тестируем API по загрузке курсов валют', function() {
      let test_server;
      let app;
  
      before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        //done();
        app = require(process.cwd() + '/bin/www');
        test_server = app.listen(process.env.PORT || 3000, done);
    

      });
      it('/exchldr - ожидаем получение курсов за дату и сохранение в виде файла  ', function(done){
          // заглушка - пропуск тестового кейса 
          //this.skip();
          // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
          var l_date = '2020-10-29';
          request('http://'+'localhost:3000')
          .get('/exchldr')
          .query({date: l_date})
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function(err, res) {
              if (err) {
                  console.log(err.message);
                  done(err);
              } else {
                  console.log( JSON.stringify(  res.body  )  );
                  
                  // проверяю наличие полей в ответе
                  res.body.should.have.property('ok');
                  res.body.should.have.property('filename');

                  // проверяю значение поля "ok"
                  assert.typeOf( res.body.ok, 'boolean');
                  expect(res.body.ok).to.equal( true );
                  // проверяю значение поля "filename"
                  assert.typeOf( res.body.filename, 'string');
                  expect(res.body.filename).to.equal( 'exch20201029.json' );

                  done();
              }    
          });
      }); //it 
      after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        //done();
        test_server.close(done);
    
      });
});
