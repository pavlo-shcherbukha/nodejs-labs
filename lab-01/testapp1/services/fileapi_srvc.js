/**
 * Сервис по управелнию файлами
 *  (в терминах Node.js - контроллер)
 * 
 * 
 */
var fs = require('fs');
var i_uploaddir = './uploads';

/** классс по работе с файлами */
var flsrvc = {

    /**
     * API Получить список файлов 
     * @param {http.ClientRequest} req 
     * @param {http.ServerResponse} res 
     */
    FileList: function (req, res) {
        var flist = [];
        var directoryPath = i_uploaddir ;
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                console.log('Dir: '+ directoryPath + ' Unable to scan directory: ' + err);
                return res.status(500).json( {ok: false, code: 500, error: err.message});
            } 
            //listing all files using forEach
            var l_flcnt = 0 ;
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
                flist.push(file) ;
                l_flcnt++ ;
                // на последнем елементе вызывем callback
                if (l_flcnt === files.length ) {
                    return res.status(200).json( {ok: 'true', filelist: flist });
                }    
            });
            
        });
    },
    
    
    /**
     * UI Получить список файлов для рендеринга странице
     * @param {callback} cb 
     * 
     * @returns {object} filelist
     *   @returns {array}  flist массив имен файлов
     * {filelist: [ filename1, filename2, filename3] } 
     * 
     */
    FileListui: function (  cb ) {
        var flist = [];
        var directoryPath = i_uploaddir;
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                console.log('Dir: '+ directoryPath + ' Unable to scan directory: ' + err.message);
                cb(err, null);
                return ;
            } 
            //Просканировать массив  используя **асинхронный** forEach
            var l_flcnt = 0 ;
            files.forEach(function (file, index) {
                console.log(file);
                var flo = {
                      filename: file,
                      download: 'http://localhost:3000/upload/' + file  ,
                      delete: `fileDelete('${file}');`
                }
                flist.push(flo) ;
                l_flcnt++ ;
                // на последнем елементе вызывем callback
                if (l_flcnt === files.length ) {
                    cb(null, {filelist: flist }) ;
                    return;
                }
               
            });
            
        });
    },
    /**
     * API Удаление файла
     * @param {*} req 
     * @param {*} res 
     */
    FileDelete: function (req, res) {
        var l_directoryPath = i_uploaddir;
        //var l_filename = req.query.filename;
        var l_filename = req.params.filename;
        // пороверяем наличие файла
        fs.access( l_directoryPath + '/' + l_filename, fs.constants.F_OK, function (err){
            
            if (err) {
                // генерируем ошибку
                console.log(`${l_filename} ${err ? 'does not exist' : 'exists'}`);
                return res.status(404).json( {ok: false, error: err.message});
            } else {
                fs.unlink(l_directoryPath + '/' + l_filename, function(err){

                    if (err) {
                        // возвращаем ошибку
                        return res.status(500).json( {ok: false, error: err.message});
                    } else {
                        // возвращаем успешный ответ
                        return res.status(200).json({  ok: true, message: l_filename + ' успешно удален!'});    
                    }

                });
            }

        });



    },
	
    /**
     * Скачать файл с сервера
     * @param {*} req 
     * @param {*} res 
     */
    FileDownload: function (req, res) {
        var l_directoryPath = i_uploaddir;
        //var l_filename = req.query.filename;
        var l_filename = req.params.filename;
        // пороверяем наличие файла
        fs.access( l_directoryPath + '/' + l_filename, fs.constants.F_OK, function (err){
            
            if (err) {
                // генерируем ошибку
                console.log(`${l_filename} ${err ? 'does not exist' : 'exists'}`);
                return res.status(404).json( {ok: false, error: err.message});
            } else {
                res.download(l_directoryPath + '/' + l_filename,l_filename, function(err){
                     console.log( `файл ${l_filename} успешно скачался!` );
                });

            }

        });



    },
 }
 module.exports = flsrvc ;