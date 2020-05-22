var request = require('request');

request({
        uri: 'http://beta.taringa.net/api/user/username/SkereBot',
        method: 'GET'
    }, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(body, res.statusCode);
        }
    });
