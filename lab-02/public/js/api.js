function fileDelete(afn) {

  fetch (
    'http://localhost:3000/upload/' + afn,
    { method: 'DELETE' }
  )
  .then(res => {
    if (res.status === 200){
      alert("Функция удаления файлов отработала!");
    } else if(res.status === 404) {
      alert("Файл не найден!");
    } 
    else {
      alert("Ошибка удаления файла: status=" + res.status );
      throw new Error('Ошибка удаления файла! статус: ' + res.status);
    }
    
  })
  .catch(err => {
    console.error(err)
    alert("Ошибка удаления!" + err.message);
  });  



}


    