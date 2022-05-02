/**
 * Модуль по работе с курсами НБУ
 * @see https://old.bank.gov.ua/doccatalog/document?id=72819047
 * @see https://old.bank.gov.ua/control/uk/publish/article?art_id=38441973&cat_id=38459171#exchange
 * 
 */

var apperror = require('./error/AppError');
var superagent = require('superagent');
var fs = require('fs');

/**
 * Проверяет, что переменная на undefined и не null
 * если OK возвразает true, если не сложилось - false
 * @param {any} p_value любая переменная
 * @returns {boolean} l_result результат проверки переменной 
 */
function isDefined(p_value) {
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
 * Функция получения курса валют НБУ за дату
 * @param {object} a_param
 *    @param {string} exchdate дата в формате YYYY-MM-DD
 *  
 *  Пример:
 *  a_param = {exchdat: '2020-11-01'}
 */
function getExchRateByDate ( a_param, cb ) {
       
      var l_url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange' ;
      try{
            // Проверяю на то
            if (  !isDefined(  a_param.exchdate  ) )  {
	           throw new apperror.ValidationError('getExchRateByDate: Не передан параметр a_param.exchdate в формате YYYY-MM-DD');		
            }

            // Трансформирую в формат запроса: yyyymmdd
            var l_dt = new Date(a_param.exchdate);
            var l_exchdt = l_dt.toISOString().slice(0, 10).replace(/-/g, '');

            superagent.get(l_url)
            .query( {date: l_exchdt, json: null}  )
            .end( (err, res) => {
                  if (err) { 
                        console.log(err.message); 
                        throw new apperror.ServiceError('getExchRateByDate: Ошибка вызова внешнего API:' + err.message);		
                  }
                  //var l_result =  {ok: true, data: res.body};
                  //cb( null, l_result ) ;
                  var l_saveparam = { filename: 'exch' + l_exchdt + '.json', 
                                      data: res.body
                                    }; 
                  savetofile(l_saveparam, function(err, result){
                        if (err) {
                              console.log(err.message); 
                              throw new apperror.ServiceError('getExchRateByDate: Ошибка записи данных в файл:' + err.message);		
      
                        } else {
                              cb(null, result);
                              return ;
                        }
                  });                       

            });

      }  catch (err) {
               cb( err, null );
               return;
      }
}

/**
 * Получение курса за дату в виде Promise
 * @param {object} a_param
 *    @param {string} exchdate дата в формате YYYY-MM-DD
 *  
 *  Пример:
 *  a_param = {exchdat: '2020-11-01'}
 */
function getExchRateByDateP ( a_param ) {
    var l_url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange' ;
    // обьявляем Promeise, дальше обработка как обычный callback
    return new Promise(function(resolve, reject) {
        try{
              // Проверяю на то
              if (  !isDefined(  a_param.exchdate  ) )  {
                 throw new apperror.ValidationError('getExchRateByDate: Не передан параметр a_param.exchdate в формате YYYY-MM-DD');		
              }
  
              // Трансформирую в формат запроса: yyyymmdd
              var l_dt = new Date(a_param.exchdate);
              var l_exchdt = l_dt.toISOString().slice(0, 10).replace(/-/g, '');
  
              superagent.get(l_url)
              .query( {date: l_exchdt, json: null}  )
              .end( (err, res) => {
                    if (err) { 
                          console.log(err.message); 
                          throw new apperror.ServiceError('getExchRateByDate: Ошибка вызова внешнего API:' + err.message);		
                    }
                    //var l_result =  {ok: true, data: res.body};
                    //cb( null, l_result ) ;
                    var l_saveparam = { filename: 'exch' + l_exchdt + '.json', 
                                        data: res.body
                                      }; 
                    savetofile(l_saveparam, function(err, result){
                          if (err) {
                                console.log(err.message); 
                                throw new apperror.ServiceError('getExchRateByDate: Ошибка записи данных в файл:' + err.message);		
        
                          } else {
                                
                               // вместо вызова callback c OK вызываем resolve
                                return resolve( result ) ;
                          }
                    });                       
  
              });
  
        }  catch (err) {
                // вместо вызова callback c ERR вызываем reject
                 return reject(  err );
        }
  
    });
}




/**
 * Записть результата в файл
 * @param {object} a_param - парамтеры
 * Пример: a_param={ filename: 'exch20201101.json', data: [{ курс1 },{курс 2}] }
 * @param {callback} cb 
 */
function savetofile( a_param, cb ){
      var l_pth = './exchrates' ;
      try{
            // Проверяю на то
            if (  !isDefined(  a_param.filename  ) )  {
	           throw new apperror.ValidationError('savetofile: Не передан параметр a_param.filename');		
            } else if ( !isDefined(  a_param.data  )) {
                  throw new apperror.ValidationError('savetofile: Не передан параметр a_param.data');		 
            }
            var l_fdata = JSON.stringify(a_param.data ) ;
            fs.writeFile( l_pth +'/'+ a_param.filename, l_fdata,function (err, res) {
                  if (err) {
                        throw err ;
                         
                  } else {
                        var result = {ok: true, filename: a_param.filename};
                        cb( null,  result ) ;
                        return   
                  }
            });
            
      }  catch (err) {
               cb( err, null );
               return;
      }

   

}

/**
 * Получение курсов за период
 * @param {object} a_param
 *    @param {string} exchds дата начала периода в формате YYYY-MM-DD
 *    @param {string} exchdf дата окончания периода в формате YYYY-MM-DD
 *  Пример:
 *  a_param = {exchds: '2020-11-01', exchdf: '2020-11-01'}
 */
function getExchRateByRngP ( a_param ) {
    return new Promise(function(resolve, reject) {
        try {

            // массив промисов на выполннение
            var EachPromise = [];

            //сделать указатель на этот же модуль и использовать в inline функции 
            var that = this; 

            //непосредственно inline-функция, которая вызовет получение курса за одну дату
            var l_proc = function( p_param, p_that ){
                return getExchRateByDateP( p_param, p_that);    
            };
      
            if (  !isDefined(  a_param.exchds  ) )  {
                throw new apperror.ValidationError('getExchRateByDate: Не передан параметр a_param.exchds в формате YYYY-MM-DD');		
            } else if (  !isDefined(  a_param.exchdf  ) ) {
                throw new apperror.ValidationError('getExchRateByDate: Не передан параметр a_param.exchdf в формате YYYY-MM-DD');		 
            }

            // Трансформирую в формат запроса: yyyymmdd
            var l_dts = new Date(a_param.exchds);
            var l_exchdts = l_dts.toISOString().slice(0, 10).replace(/-/g, '');

            var l_dtf = new Date(a_param.exchdf);
            var l_exchdtf = l_dts.toISOString().slice(0, 10).replace(/-/g, '');

            // итерирую по массиву дат от первой даты до последней 
            // и накачиваю массив EachPromise вызовами inline-функции
            for (var d = l_dts; d <= l_dtf; d.setDate(d.getDate() + 1)) {
                var l_cdt = new Date(d);
                console.log(   l_cdt.toISOString().slice(0, 10) );
                var l_param = { exchdate: l_cdt.toISOString().slice(0, 10) };
                EachPromise.push(  l_proc( l_param, that ) ); 
            }
            // Вызываю  Promise.all
            Promise.all(EachPromise)
            .then( results => {
                // При успешной обработке  получим массив результатов
                // его и вернем в параметре "list:"
                resolve( {  ok: true, list: results} );
            })
            .catch( err => {
                // тут возврат  ошибки
                reject(err);
            })
            
        } 
        catch (err) {
            reject(err);
        }   
    }); // promise


}


module.exports.isDefined = isDefined; 
module.exports.getExchRateByDate = getExchRateByDate;
module.exports.getExchRateByDateP = getExchRateByDateP;
module.exports.getExchRateByRngP = getExchRateByRngP; 
module.exports.savetofile = savetofile;

