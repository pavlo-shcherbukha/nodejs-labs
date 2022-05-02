/**
 * HFReader3
 */

const fs = require('fs');
var utf8 = require('to-utf-8')
const readline = require('readline');
const winston = require('../config/winston');
var logger = winston ;

var logmsg = {message: 'Подключаю  БД', label: 'sevice'};
logger.info( logmsg );

const dbo = require('./service-db');
const serviceManager = require('./service-manager');
dbo.dbClose(); 
dbo.init( null, serviceManager);
 

function readFile( a_fullpath, cb ){
    
try {
    var l_icnt = 0 ;
    console.log( 'Открываю файл: [' + a_fullpath + ']' );
    let l_crtopts = {
        input: fs.createReadStream(a_fullpath).pipe(utf8('utf16-be')),
        crlfDelay: Infinity
    };

    const rl = readline.createInterface( l_crtopts );

    rl.on('line', (line) => {
        l_icnt++;
        //console.log(`Line from file: ${line}`);
        console.log('line N=' + l_icnt);
        saveLineToDB(  line, (err, rezult) => {
            if (err) {
               console.log( 'ERROR line N=' + l_icnt + ' :' + err.message )
            } else {
                console.log('line N=' + l_icnt + ' saved');
            }
        })


    });

    rl.on('close',()=>{
       console.log( 'close event ' + 'reqd lines ' +  l_icnt);
       cb(null, {ok: true, cnt: l_icnt});

    });

} catch (err){
     cb(err, null);
}    

    //rl.close();


};

/**
 * Записать строку в БД
 */
function saveLineToDB( a_line, cb ){
    var l_docs ;
    var l_doccnt ;
    var logmsg = {message: '', label: 'HFReader3.saveLineToDB', state: ''};
    logmsg.message =  "Подключаюсь к DB"  ;
    logger.info( logmsg ) ;
    return dbo.dbConnect()
    .then( dbo_res =>{
        logmsg.message =  "Результат подключения к DB = " + JSON.stringify(dbo_res);
        logger.info( logmsg ) ;
        if (  !dbo_res.ok ){
            throw new Error('fuser.saveToDB: : dbo.dbConnect fails ! Ошибка подключения к DB');
        }
 
        logmsg.message = 'Готовлю структур документа для вставки' ;
        var l_line = {  
                        flname: 'flname' ,
                        flline: a_line,
                        doctype: 'FLLINE'

        };
        logger.info( logmsg );
        return dbo.dbInsert(l_line) 
    })
    .then( dbo_res => {
        logmsg.message =  'Обработка результата вставки в DB нового обьекта ' + JSON.stringify(dbo_res) ;
        logger.info( logmsg );
        
        logmsg.message = 'Отправляю успешный ответ';
        logger.info( logmsg );
        if (typeof cb === 'function') {
            cb( null, dbo_res) 
        } else {
            return Promise.resolve( dbo_res );
        } 	
    })  
    .catch ( err => {
      logmsg.message =  'Возникла ошибка при обработке!' + err.message  ;
      logger.error( logmsg );
      if (typeof cb === 'function') {
          cb( err, null ) ;
      } else {
        return Promise.reject( err) ;

      }    
    });

}


module.exports.readFile = readFile;
module.exports.saveLineToDB = saveLineToDB;