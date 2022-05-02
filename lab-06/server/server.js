const appName = require('./../package').name;
const http = require('http');
const express = require('express');

const winston = require('./config/winston');
var morgan = require('morgan');

var logger = winston ;

const localConfig = require('./config/local.json');
const path = require('path');

const axios = require('axios');

const SERVICE_HOST = process.env.BANKIDP_SERVICE_HOST;
const SERVICE_PORT = process.env.BANKIDP_SERVICE_PORT;


const SERVICE_URL = 'http://' + SERVICE_HOST + ':' + SERVICE_PORT ;

const app = express();
const server = http.createServer(app);

/*
var fs = require('fs');
var fileUpload = require('express-fileupload');

// File upload configuration
app.use(fileUpload( { //useTempFiles: true, 
    //tempFileDir: './uploads', 
      debug: true, 
      limits: { fileSize: 50 * 1024 * 1024 }  
  })  
);*/



app.use(morgan('combined', { stream: winston.stream }));


const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init('/server/config/mappings.json');




/** 
 * health checking for kubernetes 
 * @see=https://developer.ibm.com/technologies/node-js/tutorials/health-checking-kubernetes-nodejs-application/
 * 
*/

const health = require('@cloudnative/health-connect');
let healthCheck = new health.HealthChecker();

const startPromise = () => new Promise(function (resolve, _reject) {
  setTimeout(function () {
    console.log('STARTED!');
    resolve();
  }, 10);
});

let startCheck = new health.StartupCheck("startCheck", startPromise);
healthCheck.registerStartupCheck(startCheck);

const livePromise = () => new Promise((resolve, _reject) => {

  const appFunctioning = true;
  // You should change the above to a task to determine if your app is functioning correctly
  if (appFunctioning) {
    //resolve();
    setTimeout(function () {
      console.log('ALIVE!');
      resolve();
    }, 10);

  } else {
    reject(new Error("App is not functioning correctly"));
  }

});

let liveCheck = new health.LivenessCheck("LivenessCheck", livePromise);
healthCheck.registerLivenessCheck(liveCheck);

let readyCheck = new health.PingCheck("example.com");
healthCheck.registerReadinessCheck(readyCheck);


const shutdownPromise = () => new Promise(function (resolve, _reject) {
  setTimeout(function () {
    console.log('DONE!');
    resolve();
  }, 10);
});
let shutdownCheck = new health.ShutdownCheck("shutdownCheck", shutdownPromise);
healthCheck.registerShutdownCheck(shutdownCheck);
/*==== END:  health checking for kubernetes */ 





// pasha:  It is needed  in routers o services but  not in server
const serviceManager = require('./services/service-manager');
require('./services/index')(app, serviceManager);

require('./routers/index')(app, server);





//CustomerDataService = require('./services/service-cudata');
//var custdata = new CustomerDataService();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add your code here
const port =  process.env.SHAPPDB_SERVICE_PORT  || localConfig.port;


//OAuth20

cookieParser    = require('cookie-parser'),
session         = require('express-session'),
bodyParser      = require('body-parser');

query           = require('querystring');



app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/** health check */

app.use('/live', health.LivenessEndpoint(healthCheck));
app.use('/ready', health.ReadinessEndpoint(healthCheck));
app.use('/health', health.HealthEndpoint(healthCheck));



/** Right call listen 
 *  in include possibilisty to run application from mocha
*/
if(!module.parent){ 

  server.listen(port, function(){
    var logmsg = {message: '', label: 'server', state: 'none'};
    //logger.info(`listening on http://localhost:${port}/appmetrics-dash`);
   
    logmsg.message = `listening on http://localhost:${port}`; 
    logger.info( logmsg );

    logmsg.message = 'Server has started';
    logger.info( logmsg );


  
  });
}






module.exports.server = server;
