/**
 * Тестирования вызова сервиса НБУ - напрямую
 */
  // подключнеие инструментов тестирования
const mocha = require('mocha');
//const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();


// подключаем модуль 
var srvc = require('../services/nbu-exch-srvc-dsdf');

// описание общего тестовго кейса
describe('Тестируем модуль nbu-exch-srvc-dsdf', function() {
      before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        done();
      });
      it('function getExchRateByDateP - ожидаем курсы валют за дату', function(done){
          // заглушка - пропуск тестового кейса 
          this.skip();
          // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
          var l_param = { exchdate: '2020-10-01' } ;
          srvc.getExchRateByDateP( l_param )
          .then (result => {
                console.log( JSON.stringify(  result  )  );
                
                // Пример ответа: {"ok":true,"filename":"exch20201001.json"}
                // проверяю наличие полей в ответе
                res.body.should.have.property('ok');
                res.body.should.have.property('filename');

                // проверяю значение поля "ok"
                assert.typeOf( res.body.ok, 'boolean');
                expect(res.body.ok).to.equal( true );
                // проверяю значение поля "filename"
                assert.typeOf( res.body.filename, 'string');
                done();

          }) 
          .catch(err => {
            console.log(err.message);
            done(err);
          })
      }); //it 


    it('function getExchRateByRngP - ожидаем курсы валют за период', function(done){
        // заглушка - пропуск тестового кейса 
        //this.skip();
        // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
        var l_param = { exchds: '2020-10-01', exchdf: '2020-10-11' } ;
        srvc.getExchRateByRngP( l_param )
        .then (result => {
              console.log( JSON.stringify(  result  )  );
              
              // Пример ответа: {"ok":true,"filename":"exch20201001.json"}
              // проверяю наличие полей в ответе
              //res.body.should.have.property('ok');
              //res.body.should.have.property('filename');

              // проверяю значение поля "ok"
              //assert.typeOf( res.body.ok, 'boolean');
              //expect(res.body.ok).to.equal( true );
              // проверяю значение поля "filename"
              //assert.typeOf( res.body.filename, 'string');
              done();

        }) 
        .catch(err => {
          console.log(err.message);
          done(err);
        })
    }); //it 



      after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        done();
    
      });
});
