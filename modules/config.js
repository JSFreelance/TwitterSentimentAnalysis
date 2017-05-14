require('dotenv').config();
var request = require('request');
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const screen_name = process.env.SCREEN_NAME;

var enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');
var oauthOptions = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: 'grant_type=client_credentials'
};

this.data = {
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "access_token": process.env.ACCESS_TOKEN,
    "access_token_secret": process.env.ACCESS_TOKEN_SECRET,
    "enc_secret": enc_secret,
    "screen_name":screen_name,
    "oauthOptions": {
        url: 'https://api.twitter.com/oauth2/token',
        headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: 'grant_type=client_credentials'
    }
};

var getBearer = function () {
    request.post(oauthOptions, function(e, r, body) {
        const body_json = JSON.parse(body);
        consumer_bearer = body_json['access_token'];
        return consumer_bearer;
    });
};
