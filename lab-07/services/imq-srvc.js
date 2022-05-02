/**
 * Класс по работе с очередями ibm mq
 * 
 * 
 *  
 */ 
const IBMCloudEnv = require('ibm-cloud-env');
const mq = require('ibmmq'); 
var MQC = mq.MQC;

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');


IBMCloudEnv.init('/config/mappings.json');

class MQBase {
    
    constructor (){
        this.mqm_qm= IBMCloudEnv.getString('mq_qm');
        this.mqm_host= IBMCloudEnv.getString('mq_host');
        this.mqm_port = IBMCloudEnv.getString('mq_port');
        this.mqm_channel = IBMCloudEnv.getString('mq_channel');
        this.mqm_username = IBMCloudEnv.getString('mq_username');
        this.mqm_apikey = IBMCloudEnv.getString('mq_apikey');
        this.hConn = null;
    }

    log( a_msg ){
        if (  (typeof a_msg === "undefined") ||  (a_msg ===  null) ) {
           return ;    
        } else {
            console.log(a_msg);
            return ;
        }

    }

    toHexString(byteArray) {
        return byteArray.reduce((output, elem) =>
          (output + ('0' + elem.toString(16)).slice(-2)),
          '');
    }

    hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }
    

    mq_connect( cb ){
        this.log('mq_connect=start');
        try {
            if (  (typeof this.hConn === "undefined") ||  (this.hConn ===  null) ){
              // do nothing
            } else {   
                var l_msg='mq_connect.ERR:' + 'Подключение уже существует. Вызовите mq_disconnect!';
                this.log(l_msg);
                new Error (l_msg) 
                return ;
            
            }
        } catch {
            cb( err, null);
            return;
        }

        var cd = new mq.MQCD();
        cd.ConnectionName = this.mqm_host + '('+ this.mqm_port +')'; 
        cd.ChannelName = this.mqm_channel;

        var csp = new mq.MQCSP();
        csp.UserId = this.mqm_username;
        csp.Password = this.mqm_apikey;

        var cno = new mq.MQCNO();
        cno.Options = MQC.MQCNO_NONE; // use MQCNO_CLIENT_BINDING to connect as client
        cno.SecurityParms = csp;
        cno.ClientConn = cd;
        var that = this;
        this.log('mq_connect: Подключаюсь!');
        mq.Connx( this.mqm_qm, cno, function(err, xhConn){

            if (err){
                that.log('mq_connect: Err=' + err.message);
                cb( err, null);

            } else {
                that.hConn = xhConn;
                that.log('mq_connect: OK=Подключились');
                cb( null, xhConn);
            }

        });

    } // mq_connect


    mq_disconnect(cb){
        var that = this;
        if (  (typeof this.hConn === "undefined") ||  (this.hConn ===  null) ){
            that.log('mq_disconnect: INF=' + 'Не подлючены!');
            return ;
        }

        mq.Disc(this.hConn, function(err) {
            if (err) {
                that.log('mq_disconnect: Err=' + err.message);
                cb(err, null);
            } else {
                that.log('mq_disconnect: OK=' + 'отключились!' );
                cb(null, true);
            }
          });
    } //mq_disconnect


} // end class MQBase

 class MQSender extends MQBase{
    
    constructor(){
        super();
    }

    mq_openq(  a_qname, cb){

        var od = new mq.MQOD();
        od.ObjectName = a_qname;
        od.ObjectType = MQC.MQOT_Q;
        var openOptions = MQC.MQOO_OUTPUT;
        var that = this ;
        mq.Open( this.hConn,od,openOptions,function(err,hObj) {
            if (err){
                that.log('mq_openq: Err=' + err.message);
                cb(err, null); 
            } else {
                that.log('mq_openq: OK=' + 'подключились' );
                cb(null, hObj);
            }

        });

    } //mq_openq

    mq_closeq( a_hObj, cb ){
        var that = this ;
        mq.Close(a_hObj, 0, function(err) {
            if (err){
                that.log('mq_closeq: Err=' + err.message);
                cb( err, null);
            } else {
                that.log('mq_closeq: OK=' + 'Соединение закрыто!');
                 cb(null, true);

            }

        });

    } // mq_closeq


    mq_putMessage(a_hObj, a_msg, cb){
        var that = this ;
        var mqmd = new mq.MQMD(); // Defaults are fine.
        mqmd.CodedCharSetId = 1208;
        mqmd.Encoding = 1208;

        var pmo = new mq.MQPMO();

        // Describe how the Put should behave
        pmo.Options = MQC.MQPMO_NO_SYNCPOINT |
                        MQC.MQPMO_NEW_MSG_ID |
                        MQC.MQPMO_NEW_CORREL_ID;
        
        
        that.log('mq_putMessage: mqmd before send ' + JSON.stringify( mqmd ) );
        that.log('mq_putMessage: ' + 'Отправляю сообщение в очередь');

        mq.Put(a_hObj,mqmd,pmo,a_msg,function(err) {
                if (err) {
                    that.log('mq_putMessage: ERR=' + err.message);
                    cb(err, null) ;
                } else {

                    var l_result= { msgid: that.toHexString(mqmd.MsgId)  } 
                    that.log('mq_putMessage: mqmd after send ' + JSON.stringify( mqmd ) );
                    that.log('mq_putMessage: OK=' + ' MsgId='+ l_result.msgid);
                    that.log('mq_putMessage: OK=' + ' Отправил!!!');
                    cb( null, l_result) ;
                }
        });


    };

 } // end class MQSender


 class MQReciever extends MQBase {

    
    constructor(){
        super();
    }

    
    mq_openq(  a_qname, cb){

        var od = new mq.MQOD();
        od.ObjectName = a_qname;
        od.ObjectType = MQC.MQOT_Q;
        var openOptions = MQC.MQOO_INPUT_AS_Q_DEF;;
        var that = this ;
        mq.Open( this.hConn,od,openOptions,function(err,hObj) {
            if (err){
                that.log('mq_openq: Err=' + err.message);
                cb(err, null); 
            } else {
                that.log('mq_openq: OK=' + 'подключились' );
                cb(null, hObj);
            }

        });

    } //mq_openq

    mq_closeq( a_hObj, cb ){
        var that = this ;
        mq.Close(a_hObj, 0, function(err) {
            if (err){
                that.log('mq_closeq: Err=' + err.message);
                cb( err, null);
            } else {
                that.log('mq_closeq: OK=' + 'Соединение закрыто!');
                 cb(null, true);

            }

        });

    } // mq_closeq


    mq_getMessage(a_hObj,  cb){
        var that = this ;
        var buf = Buffer.alloc(1024*9);
        var hdr;
        var mqmd = new mq.MQMD(); 
        var gmo = new mq.MQGMO();
        mqmd.CodedCharSetId = 1208;
        mqmd.Encoding = 1208;

        // Describe how the Put should behave
        gmo.Options = MQC.MQGMO_NO_SYNCPOINT |
                      MQC.MQGMO_NO_WAIT |
                      MQC.MQGMO_CONVERT |
                      MQC.MQGMO_FAIL_IF_QUIESCING;
        that.log('mq_getMessage: ' + 'Читаю сообщение из очереди');
        mq.GetSync(a_hObj,mqmd,gmo,buf,function(err, len) {
                if (err) {
                    if (err.mqrc == MQC.MQRC_NO_MSG_AVAILABLE) {
                        that.log('mq_getMessage: INFO=' + 'NO MESSAGES!!!!');
                        cb(null, {msg: 'empty'})
                    } else {
                        that.log('mq_getMessage: ERR=' + err.message);
                        cb(err, null) ;
                    }    
                } else {

                    //var l_result= { msgid: that.toHexString(mqmd.MsgId)  } 
                    //that.log('mq_putMessage: OK=' + ' MsgId='+ l_result.msgid);
                    //that.log('mq_putMessage: OK=' + ' Отправил!!!');
                    //cb( null, l_result) ;
                    var l_mqstr = 'MQSTR'
                    var format = mqmd.Format;
                    switch (format) {
                    case MQC.MQFMT_RF_HEADER_2:
                      hdr   = mq.MQRFH2.getHeader(buf);
                      var props = mq.MQRFH2.getProperties(hdr,buf);
                      that.log("RFH2 HDR is %j",hdr);
                      that.log("Properties are '%s'",props);
                      that.printBody(hdr.Format,buf.slice(hdr.StrucLength),len-hdr.StrucLength);
                      var l_result = {msghdr: hdr, msgprop: props} ;
                      cb( null, l_result) ;
                      break;
                    case MQC.MQFMT_DEAD_LETTER_HEADER:
                      hdr = mq.MQDLH.getHeader(buf);
                      that.log("DLH HDR is %j",hdr);
                      that.printBody(hdr.Format,buf.slice(hdr.StrucLength),len-hdr.StrucLength);
                      var l_result = {msghdr: hdr, msgprop: props} ;
                      cb( null, l_result) ;
                      break;
                    case l_mqstr:
                        var l_mqmdh = {
                            msgid: that.toHexString(mqmd.MsgId),
                            corelid: that.toHexString(mqmd.CorrelId),
                            format: mqmd.Format,
                            putdate: mqmd.PutDate,
                            puttieme: mqmd.Puttime,
                            encoding: mqmd.Encoding,
                            CodedCharSetId: mqmd.CodedCharSetId
                        }
                        var l_result = { mqmdhdr: l_mqmdh,   msg: JSON.parse( decoder.write(buf.slice(0,len)) )} ;
                        cb( null, l_result) ;
                        break;

                    default:
                        that.printBody(format,buf,len);
                        var l_result = {msghdr: hdr, msgprop: props, bbuf: buf} ;
                        cb( null, l_result) ;
  
                    
                      break;
                    }
              
                }
        });
     


    };

    printBody(format,buf,len) {
        if (format=="MQSTR") {
          console.log("message len=%d <%s>", len,decoder.write(buf.slice(0,len)));
        } else {
          console.log("binary message: " + buf);
          console.log("binary message: " + hexToBytes(buf));
        }
        
      }


   





 }

 module.exports.MQSender = MQSender; 
 module.exports.MQReciever =  MQReciever;