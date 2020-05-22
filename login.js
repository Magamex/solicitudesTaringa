var request = require('request');
var querystring = require('querystring');

var user = 'aquivausuario';
var pass = 'aquivacontraseña';

var form = {
    'username':user,
    'password':pass
}

var formData = querystring.stringify(form);

request({
    uri: `https://www.taringa.net/login`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': formData.length
    },
    form: formData,
}, function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        console.log(body, res.statusCode);
    }
});