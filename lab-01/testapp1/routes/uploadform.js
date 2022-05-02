/**
 * Роутре для отсвечивания формочки по загрузке файла
 */

var express = require('express');
var router = express.Router();

/** 
 *  отрендеить форму по загрузке файла
*/
router.get('/', function(req, res, next) {
  res.render('uploadfile.pug');
});

module.exports = router;
