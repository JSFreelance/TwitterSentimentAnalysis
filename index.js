require('dotenv').config();
var sentiment = require('sentiment');
var twitter   = require('twitter');
var request = require('request');
var config = require('./modules/config.js');
var async   = require('async');
var consumer_bearer = null;
var params = {screen_name: config.data.screen_name};
var sum = 0;
var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "redis", port: 6379, ns: "rsmq"} );

rsmq.createQueue({qname:"sentiment_queue"}, function (err, resp) {
    if (resp===1) {
        console.log("queue created");
    }else{
        console.log("unable to create queue");
    }
});


request.post(config.data.oauthOptions, function(e, r, body) {
    const body_json = JSON.parse(body);
    consumer_bearer = body_json['access_token'];

    var client = new twitter({
        consumer_key: config.data.consumer_key,
        consumer_secret: config.data.consumer_secret,
        bearer_token: consumer_bearer,
        access_token: config.data.access_token,
        access_token_secret: config.data.access_token_secret
    });

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var tweetIndex in tweets.slice(0,20))
            {
                sum += parseInt(sentiment(tweets[tweetIndex]['text'])['score'])
            }

            rsmq.sendMessage({qname:"sentiment_queue", message: sum}, function (err, resp) {
                if (resp) {
                    console.log("Message sent. ID:", resp);
                }
            });
        }
    });
});


rsmq.receiveMessage({qname:"sentiment_queue"}, function (err, resp) {
    if (resp.id) {
        console.log("Message received.", resp)
    }
    else {
        console.log("No messages for me...")
    }
});




