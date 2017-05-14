var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "redis", port: 6379, ns: "rsmq"} );

rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
    if (resp===1) {
        console.log("queue created");
    }else{
        console.log("unable to create queue");
    }
});
