var http = require('http');
var querystring = require('querystring');

var auth = {
    "client_id": "1e6a3acba0ea4f8dcd93be2639b13407",
    "client_secret": "030ade9940c62fc1c69a583f91dee014",
    "username": "victorhung92@gmail.com",
    "password": "K6ypZT",
    "grant_type": "password"
}

var url = "winkapi.quirky.com";

var data = querystring.stringify(auth);

var options = {
    host: url,
    port: 80,
    path: '/oauth2/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();