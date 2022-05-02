/**
 * Тестирования вызова сервиса НБУ - напрямую
 */
  // подключнеие инструментов тестирования
const mocha = require('mocha');
//const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

//дополнитлеьные модули
var fs = require('fs');
var path = require('path');

// подключаем модуль 
var xsrvc = require('../services/imq-srvc');
var srvc = new xsrvc.MQReciever();
var i_hConn = null // Указатель подключения к серверу MQ
var i_hObj = null // Указатель на подключение к обьекут MQ (в нашем случае к очереди)
var i_qname = 'DEV.QUEUE.1';

// описание общего тестовго кейса
describe('Тестируем модуль imq-srvc', function() {
    before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        done();
    });

    it('function mq_connect - подключиться к серверу', function(done){
          //this.skip();
          srvc.mq_connect(  function(err, result){
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    i_hConn = result
                    console.log( JSON.stringify(  result  )  );

                    //srvc.mq_disconnect();
                    done();
                }    
          });
  
    }); //it 

    it('Открыаю очередь для записи сообщений', function( done ){
        //this.skip();
        
        try{
            if (  ( typeof i_qname === "undefined"  )   || (i_qname === null) ) {

                throw new Error(' Не задано имя очереди! ');
            }
            srvc.mq_openq(i_qname, function(err, result){
                if (err) {
                    done(err);
                } else {
                    i_hObj = result;
                    console.log(  'i_hObj=' + JSON.stringify(i_hObj)  );
                    done();
                }

            });
        } catch (err) {
            done(err) ;
        }

    });

    it('Прочитать из очереди сообщения', function(done){
        //this.skip();
        try{
            if (  ( typeof i_hObj === "undefined"  )   || (i_hObj === null) ) {

                throw new Error(' Не создано подключение к очереди! ');
            }

            srvc.mq_getMessage(i_hObj, function(err, result){

                if (err) {
                    done(err) ;
                } else {
                    console.log( JSON.stringify(  result ) );
                    done();
                }


            });

        } catch (err) {

            done(err);

        }

    });


    it( 'Отключиться от обьекта ОЧЕРЕДЬ', function(done){
        //this.skip();
        
        try{
            if (  ( typeof i_hObj === "undefined"  )   || (i_hObj === null) ) {

                throw new Error(' Не создано подключение к очереди! ');
            }
            srvc.mq_closeq(i_hObj, function(err){
                if (err) {
                    done(err);
                } else {
                    i_hObj = null;
                    console.log(  'i_hObj=' + ' Откоючились'  );
                    done();
                }

            });
        } catch (err) {
            done(err) ;
        }


    });


    it('Отключиться от  сервера MQ', function( done ){
        try{ 
                if (i_hConn === null) {
                    throw Error('Нет поключения');
                }
                srvc.mq_disconnect(function(err){
                    if( err) {
                        done(err);
                    } else {
                        done();
                    }
                });
        } catch  (err) {
            done(err) ;
        }        

    });
      

    after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        done();
    
    });

});
