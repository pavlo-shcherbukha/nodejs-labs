/**
 * Модуль создания БД kvt
 * для хранения квитанций
 * 
 */

const axios = require('axios');
const async = require('async');
//const log4js = require('log4js');
const IBMCloudEnv = require('ibm-cloud-env');
const winston = require('../config/winston');
var logger = winston ;
var apperror = require('../error/appError');

// CouchDB - пока не используем
const dbo = require('./service-db');
const serviceManager = require('./service-manager');
dbo.init(null, serviceManager);
 
const indexfile = {
  index: { fields: ['flname'] },
  name: 'idxfile'
};

const indexdtfile = {
  index: { fields: ['dtproc', 'flname'] },
  name: 'idxdtfl'
};


class kvtdbService {
  constructor () {
    /** тут прописывем instans переменные 
     *  Ели в конструкторе нужен асингхронный визов функции, то смотреть сюда:
     *  @see https://stackoverflow.com/questions/49694779/calling-an-async-function-in-the-constructor
     *  @see https://bytearcher.com/articles/asynchronous-call-in-constructor/
     *  @see https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise
     */
    
    this.i_reso ={ok: true, rdata: null};
    this.i_headers = { 'Content-Type': 'application/json',
        		           'accept': 'application/json'
    };

    IBMCloudEnv.init('/server/config/mappings.json');

  }

  

	/**
	 * Проверяет, что переменная на undefined и не null
	 * если OK возвразает true, если не сложилось - false
	 * @param {any} p_value любая переменная
	 * @returns {boolean} l_result результат проверки переменной 
	 */
	isDefined(p_value) {
		let l_result = true ;
		if (typeof p_value === "undefined"){
			l_result=false;
		} else if ( p_value === null){
			l_result=false;
		} else {
			// do nothing
		};
		return l_result ;     
	}

  
  /**
   * 
   */
  createKvtDB( callback ) {
          return dbo.dbConnect()
          .then( dbo_res => {
            if (  !dbo_res.ok ){
                throw new apperror.CouchDbError('createKvtDB: dbo.dbConnect fails !');
            }
            return dbo.dbCreateIdx(indexfile)
          })
          .then ( idxu_res => {
            return dbo.dbCreateIdx(indexdtfile)
          })
          .then ( idxc_res => {
          
            if (typeof callback === 'function') {
              callback( null, {ok: true} );  
            } else {
              return Promise.resolve( {ok: true} ) ;
            }    

          })
          .catch( function ( err ){
              if (typeof callback === 'function') {
                callback( err );
              } else {
                return Promise.reject( err) ;
              }; 	
          });
  }	

  
}  // end class

module.exports = kvtdbService;

