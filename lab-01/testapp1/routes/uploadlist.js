/**
 * Роутре для отсвечивания таблицы загруженных файлов
 */

var express = require('express');
var flsrvc = require('../services/fileapi_srvc');
var router = express.Router();

/** 
 *  отрендеить форму с таблицей загруженых файлов
*/
router.get('/', function(req, res, next) {

    flsrvc.FileListui( function( err, flist ){
        if (err) {
            //res.status(500).json({ ok: false, error: err.message })
            errobj = { message: err.message, error: { status: 500, 
                                                      stack: err.stack.split('\n').slice(0,2).join('\n') + '\n' + err.stack 
                                                  }
            } ;                                     
            return res.status(500).render('error.pug', {errobj})
        } else {
          var larr = flist.filelist
          return res.render('uploadlist.pug', {larr} );
        }
    });

  
});

module.exports = router;
