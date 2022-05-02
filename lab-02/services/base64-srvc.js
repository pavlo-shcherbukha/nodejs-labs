var apperror = require('./error/AppError');



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


function base64encode ( a_str ) {

        try{
              if (  !isDefined( a_str  ) )  {
	           throw new apperror.ValidationError('base64encode: Не передан параметр a_str');		
              }
	        var buff = Buffer.from ( a_str, 'utf8' );
              var base64data = buff.toString('base64');
              return base64data

        }  catch (err) {
               throw err; // unknown error, rethrow it (**)
        }
}

function base64decode ( a_str ) {

      try{
            if (  !isDefined( a_str  ) )  {
               throw new apperror.ValidationError('base64decode: Не передан параметр a_str');		
            }
            var buff = Buffer.from ( a_str, 'base64' );
            var data = buff.toString('utf8');
            return data;

      }  catch (err) {
             throw err; // unknown error, rethrow it (**)
      }
}



module.exports.base64encode = base64encode;
module.exports.base64decode = base64decode;
module.exports.isDefined = isDefined; 