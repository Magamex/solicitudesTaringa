var querystring = require('querystring');       //GET FORM DATA
var setCookieParser = require('set-cookie-parser');     //SET PARSE COOKIE
var request = require('request');       //REALIZAR REQUEST GET o POST
var dateTime = require('node-datetime');

var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

var user = 'usuarioaqui';
var pass = 'contraseñaaqui';

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
            if(res.statusCode == 200){

                var cookies = setCookieParser.parse(res)

                var token = cookies[1].value

                var shoutMencion = JSON.stringify({
                    title: "",  //Opcional
                    content: [{
                        type: "markdown",
                        body: `hola <mention user="22matutex22" /> son las ${formatted} y saludos a todos!!!`
                    }],
                    nsfw: false
                })

                request({
                    uri: `https://www.taringa.net/apiv7/c/user-${user}/new`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Content-Length': shoutMencion.length,
                        'authorization':`Bearer ${token}`
                    },
                    body: shoutMencion,
                },function (err, res, body){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(body,res.statusCode);
                    }
                })
            }else{
                console.log(body, res.statusCode);
                request(res.headers['location'], function(error, response, html) {
                    console.log(response);
                });
            }
        }
    });

