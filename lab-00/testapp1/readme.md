#  Пример первого приложения для проверки среды разработки
<!-- TOC BEGIN -->
- [Установка необходимых компонетнтов](#p1)
    - [Установка Node.js](#p2)
    - [Установка git](#p3)
    - [Установка Visual Studio Code](#p4)
- [Генерация шаблонного Node.js express приложения](#p5)

- [Поместить исходный код в локальный Git-репозиторий](#p6)
- [Отправить исходный код в  remote Git-репозиторий](#p7)


<!-- TOC END -->

<a name="p1"></a>
## Установка необходимых компонетнтов

<a name="p2"></a>
###  Установка Node.js

Для развретывания Node.js  необходимо скачть LTS ( последнюю устойчивую) версию с сайта:
[Node.js](https://nodejs.org/uk/). На даный момент там доступна 12
<kbd><img src="doc/pic-1.png" /></kbd>
<p style="text-align: center;">pic-1</p>


Дальше соглашаемся со всем, что предлагает установка.
Минимально проверить можно таким способом, результаты на pic-2 :

```bash
   node --version
```


```bash
   npm --version
```

<kbd><img src="doc/pic-2.png" /></kbd>
<p style="text-align: center;">pic-2</p>


Запустить можно с консоли node.exe . Выход всегда CTRL + C  
<a name="p3"></a>
###  Установка git

У многих git уже есть. Для тех у кого нет
Download and install using the following link [ http://git-scm.com/download/win](http://git-scm.com/download/win ]

Выполнить все пожелания по умолчанию. Единственное, интеграция с windows  не нужна. нам больше полезна git bash.

Для проверки установки git запусить с командной строки

```
    git

    git --version
```

получим:
 <kbd><img src="doc/pic-5.png" /></kbd>
<p style="text-align: center;">pic-5</p>

<a name="p4"></a>
### Установка Visual Studio Code

[Скачать VS Code](https://code.visualstudio.com/docs/setup/windows). Если будет спрашивать, выбирать для JavaScript.

<kbd><img src="doc/pic-3.png" /></kbd>
<p style="text-align: center;">pic-3</p>

в панели задач windows искать тут  (pic-4): 

<kbd><img src="doc/pic-4.png" /></kbd>
<p style="text-align: center;">pic-4</p>

Рабочий экран VS Code показан на pic-6
<kbd><img src="doc/pic-6.png" /></kbd>
<p style="text-align: center;">pic-6</p>


Для кофортной работы желательно установить такие плагины  pic-7:
<kbd><img src="doc/pic-7.png" /></kbd>
<p style="text-align: center;">pic-7</p>

Во всяком случаэ плагины по работе с Git, Beautify  для JS  и по рабоа с MD - файлами  - обязательны

Live Server и Live Share -  это плагины, позволяющие расшарить ваш экран редактирования с коллегами для чтения или даже изменения кода. Авторизация по e-mail  или github account (не github.ibm.com!).

Плагины ставяться в C:/users/<username>/.vscode и все написаны на Node.js

Да, а сама среда написана на Node.js фреймворке [electron](https://www.electronjs.org/) 

<a name="p5"></a>
## Генерация шаблонного Node.js express приложения

Для проверки результата установки компонетнов сгенерируем шаблонное Node.js express приложение. Для генерации используется последовтальеность команд. Можна с far,  можно с cmd или winshell  а  можно с терминала VSCode.

Описываю последовательность через терминал, так как всечаще работаю через него.

- В верхнем меню выбрать Terminal/New
получим окно, как на [pic-8] и  желательно перейти в пустой каталог комагдами cmd.
<kbd><img src="doc/pic-8.png" /></kbd>
<p style="text-align: center;">pic-8</p>


- С помощью менеджера пакетов npm установим глобально генератор express  приложения (npm, это типа агалог maven  для java)

``` 
 npm install -g express-generator
```

На pic-9 показан результат работы команды, с той разницей, что у меня только обновление одного пакета, а там где его нет - там будет установкак пакетов. Каталог устанвке виден на картинке

<kbd><img src="doc/pic-9.png" /></kbd>
<p style="text-align: center;">pic-9</p>


- генерируем непосредственно приложение 

Сгенерируем тестовое приложение testapp1  с генератором html страничек на стороне сервера [pug](https://pugjs.org/api/getting-started.html). 

```
   express testapp1 --view=pug
```

результат генерации показан ниже:

```
PS C:\PSHDEV\PSH-WorkShops\TeamTrain\JS-stack\L-0\lab-00>  express testapp1 --view=pug

   create : testapp1\
   create : testapp1\public\
   create : testapp1\public\javascripts\
   create : testapp1\public\images\
   create : testapp1\public\stylesheets\
   create : testapp1\public\stylesheets\style.css
   create : testapp1\routes\
   create : testapp1\routes\index.js
   create : testapp1\routes\users.js
   create : testapp1\views\
   create : testapp1\views\error.pug
   create : testapp1\views\index.pug
   create : testapp1\views\layout.pug
   create : testapp1\app.js
   create : testapp1\package.json
   create : testapp1\bin\
   create : testapp1\bin\www

   change directory:
     > cd testapp1

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=testapp1:* & npm start

PS C:\PSHDEV\PSH-WorkShops\TeamTrain\JS-stack\L-0\lab-00>
```

Команда dir выводит список каталогов:

<kbd><img src="doc/pic-10.png" /></kbd>
<p style="text-align: center;">pic-10</p>

В списке видим новый каталог testapp1.

- Скачиваем зависимости, необходимые для работы

ЗависимостиЮ необходимые для работы описаны в файлах:
testapp1.package.json [pic-11]

<kbd><img src="doc/pic-11.png" /></kbd>
<p style="text-align: center;">pic-11</p>

Установка зависимостей выполняется командой менеджера пакетов npm

```
   cd testapp1
   npm install
```

В каталоге testapp1 появится node_modules
<kbd><img src="doc/pic-12.png" /></kbd>
<p style="text-align: center;">pic-12</p>

- выполнить запуск приложения локально

Типичная команда запуска приложения

```
    npm start
```

 что аналогчино node ./bin/www

 после этого у вас стартует web приложение по порту 3000. Смотриите файл ./bin/www.js, строка 15

 ```js

        /**
         * Get port from environment and store in Express.
         */

        var port = normalizePort(process.env.PORT || '3000');
        app.set('port', port);

        /**
         * Create HTTP server.
         */

        var server = http.createServer(app);

        /**
         * Listen on provided port, on all network interfaces.
         */

        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
 ```

Переход по адресу http://localhost:3000/ в browser выведет страничку
<kbd><img src="doc/pic-13.png" /></kbd>
<p style="text-align: center;">pic-13</p>

остановить прилождние: CTRL-C в терминале

<a name="p6"></a>
## Поместить исходный код в локальный Git- репозиторий

Исходный код сначала помещается в локальный Git-репозиторий. Потом отправляется в удаленны (remote) репозиторий (github, gitlab, .....)

Не все файлы помещаются в git репозиторий. В git не пишутся логи, файлы конфигурации (особенно с API-KEY, паролями....) и node_modules.  Для этого в корне каталога testapp1 необходимо создать файл
**.gitignore**

``` bash
node_modules
*.log

```

- создаем пустой локальный git - ропозиторий

В терминале выполнить команду в папке testapp1

```
  git init

```  
Результат работы [pic-14]:
<kbd><img src="doc/pic-14.png" /></kbd>
<p style="text-align: center;">pic-14</p>


Краткие пояснения [pic-15]:
<kbd><img src="doc/pic-15.png" /></kbd>
<p style="text-align: center;">pic-15</p>


<a name="p7"></a>
## Отправить исходный код в  remote Git- репозиторий

- Создать на github.ibm  пустой репозиторий
<kbd><img src="doc/pic-16.png" /></kbd>
<p style="text-align: center;">pic-16</p>

readme.md не включаем!

- скпировать команду git remote и выполнить ее в терминале

```
git remote add origin https://github.ibm.com/pvx-dev-team/lab-00.git
```
В  результате, в файле /.git/config увидим лин на связанный репозиторий. Но, на github IBM в него нужно включть ваш логин и токен, который сгенерируете.

```
[remote "origin"]
	url = https://github.ibm.com/pvx-dev-team/lab-00.git
	fetch = +refs/heads/*:refs/remotes/origin/*

```

- Генерация токена
Токе генерируется 1 раз, и дальше его помните. Шаги по генерации показаны на pic-17

<kbd><img src="doc/pic-17.png" /></kbd>
<p style="text-align: center;">pic-17</p>


После этого трансформируем url репозитория:

было:

```
    https://github.ibm.com/pvx-dev-team/lab-00.git
```

Стало:

```
 https://login:token@github.ibm.com/pvx-dev-team/lab-00.git

```

- Отправить данные из локлаьного репозитория в remote

```
   git push --set-upstream origin master

```

<kbd><img src="doc/pic-18.png" /></kbd>
<p style="text-align: center;">pic-18</p>



И вуаля - на github.ibm появился исходный код

<kbd><img src="doc/pic-19.png" /></kbd>
<p style="text-align: center;">pic-19</p>




