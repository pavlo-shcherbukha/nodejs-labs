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
//var http = require('http');
var https = require('https');

// описание общего тестовго кейса
describe('Тестируем вызов внешнего сервиса НБУ по возврату курсов валют', function() {
      before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        done();
      });
      it('Получить курсы валют от НБУ по всемм валютам.', function(done){
          // заглушка - пропуск тестового кейса 
          //this.skip();
          // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
          var l_date = '20201101';
          request('https://'+'bank.gov.ua')
          .get('/NBUStatService/v1/statdirectory/exchange')
          .query({date: l_date, json: null})
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', 'application/json')
          .expect(200)
          .end(function(err, res) {
              if (err) {
                  console.log(err.message);
                  done(err);
              } else {
                  console.log( JSON.stringify(  res.body  )  );
                  done();
              }    
          });
      }); //it 
      after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        done();
    
      });
});
