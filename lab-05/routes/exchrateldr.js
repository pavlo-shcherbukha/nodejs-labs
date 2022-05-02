var express = require('express');
var router = express.Router();
var exchsrvc = require('../services/nbu-exch-srvc');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var l_date = req.query.date
  var l_param = { exchdate: l_date } ;
 
  exchsrvc.getExchRateByDate( l_param,  function(err, result){ 
    if (err) {
      res.status(500).json( {ok:false, error_code: err.name, error_dsc: err.message } );
    } else {
      res.status(200).json( result );
    }

  });
 
});

module.exports = router;
