/** 
 * Роутер для работы со  счетами
 *
 */
const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const serviceManager = require(process.cwd() +'/server/services/service-manager');

const winston = require('../config/winston');
var logger = winston ;  





/**
 * @see https://riptutorial.com/ru/node-js/example/28740/%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C-cors-%D0%B2-express-js
 *
 */

const resp_headers = {
                    'Accept': 'application/json', 
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Headers': 'Content-Type,ad-name, x-powered-by, date',
                    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
                    'Content-Type': 'application/json; charset=utf-8'        
};


/**
 * app.get('/loadcas', function(req, res) {
  var logmsg = {message: '', label: 'server', state: 'none'};
  logmsg.message = 'Рендеринг странички загрузки файла настройки CAs';
  logmsg.label = 'server.get.uploadcas';
   
  logger.info( logmsg );


  res.render('uploadcas', {layout: true});
});

app.post('/loadcas',  function(req, res) {
  return eds_cfg.loadcas(req, res);
});

 */


module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
    const path = require('path');               // Used for manipulation with path
    const fs = require('fs-extra');
    const hfr = require('../services/HFReader3')   
    app.use(busboy({
        highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
    })); // Insert the busboy middle-ware

    const uploadPath = path.join(__dirname, '../../fu/'); // Register the upload path
    fs.ensureDir(uploadPath); // Make sure that he upload path exits


  /**
	 * Проверяет, что переменная на undefined и не null
	 * если OK возвразает true, если не сложилось - false
	 * @param {any} p_value любая переменная
	 * @returns {boolean} l_result результат проверки переменной 
	 */
	const isDefined = function (p_value) {
		let l_result = true ;
		if (typeof p_value === "undefined"){
			l_result=false;
		} else if ( p_value === null){
			l_result=false;
		} else {
			// do nothing
		};
		return l_result ;     
	};

  /**
   */
  const i_api_url='/upload'; 
  const router_upload = express.Router();
  app.use(i_api_url, router_upload);

  /**
  * options
  */
  router_upload.options('/', function(req, res) {
      
      return res.status(200).end();
  });  

  /**
  * get accounts list
  */
  router_upload.get('/', function(req, res) {
      logger.info( { message: 'router get:' + i_api_url, label: 'upload_router'});
      logger.info( { message: 'Req.Headers:', label: 'upload_router'});
      logger.info( { message: JSON.stringify(req.headers) , label: 'upload_router'});
      res.render('uploadhfile', {layout: true});

  });  

  router_upload.post('/', function(req, res) {
    logger.info( { message: 'router post:' + i_api_url, label: 'upload_router'});
    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
        logger.info( { message: `Upload of '${filename}' started` , label: 'upload_router'});

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            logger.info( { message: `Upload of '${filename}' finished` , label: 'upload_router'});
            hfr.readFile(path.join(uploadPath, filename), (err, rsp) => {
              if (err) {
                 console.log('!!!!!!ERROR====' + err.message);
                 res.status(500).json({error: err.message})
              }
              //res.redirect('back');
              res.status(200).json(rsp);
            })
            
        });
    });
  

});    



  //==============================
} // Module exports
  //==============================