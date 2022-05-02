/**
 * Роутер для отсвечивания формочки по загрузке файла
 */

var express = require('express');
var router = express.Router();
var srvc = require('../services/base64-srvc');



/** 
 *  API Для кодирования строки в Base64
 *  Запрос: { "msg_encoded": "Текс для кодирования в Base64"  }
 *  Ответ-ok:  { "str": "Строка, закодированная в base64" }
 *  Ответ-err: { "error_code": "valodation error", "error_dsc": " message" }
 * 
*/
router.post('/', function(req, res, next) {

  try { 
      
      var reqo = req.body;
      console.log('Входной запрос: ' + JSON.stringify(reqo)   );
      var rsp = srvc.base64decode(reqo.str);
      return res.status(200).json(  { str: rsp } );
  } catch(err) {
        if (err instanceof ValidationError) {
              console.log(err.message);
              console.log(err.name);        
              return res.status(500).json({error_code: err.name, error_dsc: err.message});
        }  else {
              console.log(err.message);
               return res.status(500).json({error_code: 'server-error', error_dsc: err.message});

        }     
  }

      
});



module.exports = router;
