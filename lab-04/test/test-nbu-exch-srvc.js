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
var srvc = require('../services/nbu-exch-srvc');

// описание общего тестовго кейса
describe('Тестируем модуль nbu-exch-srvc', function() {
      before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        done();
      });
      it('function getExchRateByDate - ожидаем курсы валют за дату', function(done){
          // заглушка - пропуск тестового кейса 
          //this.skip();
          // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
          var l_param = { exchdate: '2020-11-01' } ;
          srvc.getExchRateByDate( l_param, function(err, result){
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    console.log( JSON.stringify(  result  )  );
                    done();
                }    
          });
  
      }); //it 
      it('function getExchRateByDate - ожидаем ошибку! ', function(done){
        // заглушка - пропуск тестового кейса 
        //this.skip();
        // url=https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201101&json
        var l_param = { exchdate: '2020-10-28' } ;
        srvc.getExchRateByDate( l_param, function(err, result){
              if (err) {
                  console.log(err.message);
                  done();
              } else {
                  console.log( JSON.stringify(  result  )  );
                  var err = new Error('Ошибка при тестироании');
                  done(err);
              }    
        });

    }); //it 

      after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        done();
    
      });
});
