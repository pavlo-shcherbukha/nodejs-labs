/**
 * Роутер для отсвечивания формочки по загрузке файла
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var flsrvc = require('../services/fileapi_srvc');

var i_uploaddir = './uploads';


/** 
 *  API загрузка файла на сервер
*/
router.post('/', function(req, res, next) {
  if(!req.files){
    res.status(400).json({error_code:1,err_desc:"No file passed"});
    return;
  }
  try { 
      let rawdata = req.files.file.data ;
      console.log(rawdata);
      fs.writeFileSync(i_uploaddir+'/'+req.files.file.name,  rawdata);
  } catch(err) {
    console.log(err);        
    return res.status(500).json({error_code:2,err_desc: err.message});
  }

      
  return res.status(200).json({  ok: 'true', 
                                  status: 200, 
                                  data:  { 
                                          fname: req.files.file.name,
                                          fsize: req.files.file.size,
                                          fmime: req.files.file.mimetype,
                                          ftemp: req.files.file.tempFilePath
                                         } 
                              }); 
  
});


/** 
 *  API Получить список всех файлов в виде JSON
 *  @returns OK {"ok":"true","filelist":["CAs.Test.json","health.js","index.js","public.js","SchemaRouter.js"]}
 *  @returns ERR {ok: false, code: 500, error: err.message}
*/
router.get('/', function(req, res, next) {

     return  flsrvc.FileList(req,res, next);
});

router.delete('/:filename', function(req, res, next) {

  return  flsrvc.FileDelete(req,res);
});

router.get('/:filename', function(req, res, next) {

  return  flsrvc.FileDownload(req,res);
});

module.exports = router;
