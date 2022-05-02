/**
 * Тестирования вызова сервиса НБУ - напрямую
 */
  // подключнеие инструментов тестирования
const mocha = require('mocha');
//const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();


// сервсиные модули
var fs = require('fs');
var path = require('path');
var b64srvc = require('../services/base64-srvc.js');

// подключаем модуль 
var srvc = require('../services/cloudant-srvc');

// временные переменные для переачи между тестамти

var i_docref1={docId: null, rev: null} ;

// описание общего тестовго кейса
describe('Тестируем модуль c Cloudant DB', function() {
      before(done => {
        // тут заглушка, так как нет кода
        // код, который должен выполниться перед началом тестовго кейса "describe" в целом      
        done();
      });
      it('function nextid - генерируем uids', function(done){
          // заглушка - пропуск тестового кейса 
          //this.skip();
          var l_param = { count: 10 } ;
          srvc.nextid( l_param)
          .then(result => {
                console.log( JSON.stringify(  result  )  );
                done();
          })
          .catch (err => {
                console.log(err.message);
                done(err);
          });
  
      }); //it 


      it('function postDocument - Создание документа в БД.', function(done){
            // заглушка - пропуск тестового кейса 
            //this.skip();
            var l_doc = { 
                  _id: 'small-appliances:1000042',
                  type: 'product',
                  productid: '1000042',
                  brand: 'Salter',
                  name: 'Digital Kitchen Scales',
                  description: 'Slim Colourful Design Electronic Cooking Appliance for Home / Kitchen, Weigh up to 5kg + Aquatronic for Liquids ml + fl. oz. 15Yr Guarantee - Green',
                  price: 14.99,
                  image: 'assets/img/0gmsnghhew.jpg'
                  } ;
                  srvc.docCreate( l_doc)
                  .then(result => {
                        console.log( JSON.stringify(  result  )  );
                        i_docref1.docId = result.id;
                        i_docref1.rev = result.rev;
                        done();
                  })
                  .catch (err => {
                        console.log(err.message);
                        done(err);
                  });

        }); //it 
  
        it('function docGetById - Прочитать документ из БД. по его ID', function(done){
            // заглушка - пропуск тестового кейса 
            //this.skip();
            var l_doc =  { docId: i_docref1.docId} ;
            srvc.docGetById( l_doc)
            .then(result => {
                  console.log( JSON.stringify(  result  )  );
                  done();
            })
            .catch (err => {
                  console.log(err.message);
                  done(err);
            });
    
        }); //it 


        it('function deleteDocument - Удаление документа из БД.', function(done){
            // заглушка - пропуск тестового кейса 
            //this.skip();
            var l_doc =  i_docref1 ;
            srvc.docDelete( l_doc)
            .then(result => {
                  console.log( JSON.stringify(  result  )  );
                  done();
            })
            .catch (err => {
                  console.log(err.message);
                  done(err);
            });
    
        }); //it 

        it('function fileUpload - Загрузка файла в БД. в качестве вложения', function(done){
            // заглушка - пропуск тестового кейса 
            //this.skip();
            var l_imgpth = './upload/botico.png';
            var l_img = fs.readFileSync(  path.resolve(__dirname, l_imgpth) );
            var l_imgb64 = b64srvc.base64encode(l_img);
            var l_imgdsc = { 
                             doctype: 'FILE',
                             flname: 'botico.png',
                             fldsc: 'Тестовый файл ' + l_imgpth,
                             "_attachments": {
                                                "botico.png": {
                                                "content_type": "image/png",
                                                "data": l_imgb64
                                           }
                              }
 
            };
            srvc.docCreate( l_imgdsc)
            .then(result => {
                  console.log( JSON.stringify(  result  )  );
                  i_docref1.docId = result.id;
                  i_docref1.rev = result.rev;
                  done();
            })
            .catch (err => {
                  console.log(err.message);
                  done(err);
            });
    

    
        }); //it 
  

  
        it('function fileUpload-2 - Загрузка файла в БД. в качестве вложения', function(done){
            // заглушка - пропуск тестового кейса 
            //this.skip();
            var l_imgpth = './upload/readme.pdf';
            var l_img = fs.readFileSync(  path.resolve(__dirname, l_imgpth) );
            var l_imgb64 = b64srvc.base64encode(l_img);
            var l_imgdsc = { 
                             doctype: 'FILE',
                             flname: 'readme.pdf',
                             fldsc: 'Тестовый файл ' + l_imgpth,
                             "_attachments": {
                                                "readme.pdf": {
                                                "content_type": "image/png",
                                                "data": l_imgb64
                                           }
                              }
 
            };
            srvc.docCreate( l_imgdsc)
            .then(result => {
                  console.log( JSON.stringify(  result  )  );
                  i_docref1.docId = result.id;
                  i_docref1.rev = result.rev;
                  done();
            })
            .catch (err => {
                  console.log(err.message);
                  done(err);
            });
    

    
        }); //it 

        it('function docSelect - Запрос документов из БД', function(done){
                  // заглушка - пропуск тестового кейса 
                  //this.skip();
                  var l_selector = { 
                                "doctype": {
                              "$eq": "FILE"
                              }
                        
                  };
              
                  srvc.docSelect( l_selector)
                  .then(result => {
                        console.log( JSON.stringify(  result  )  );
                        i_docref1.docId = result.id;
                        i_docref1.rev = result.rev;
                        done();
                  })
                  .catch (err => {
                        console.log(err.message);
                        done(err);
                  });

        }); //it 
  


  
      after(done => {
        // код, который должен выполниться после окончания тестовго кейса "describe" в целом      
        // тут заглушка, так как нет кода
        done();
    
      });
});
