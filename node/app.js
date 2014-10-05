var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var routes = require(__dirname + '/routes/routes');
var authConfig = require(__dirname + '/authConfig');
var WinkAPI = require('node-winkapi');

var app = express();

// VIEW ENGINE
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('view options', {layout: false});

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// END VIEW ENGINE

winkapi = new WinkAPI.WinkAPI({ clientID     : authConfig.auth.client_id
                              , clientSecret : authConfig.auth.client_secret }).login(
                              authConfig.auth.username, authConfig.auth.password, function(err) {
  if (!!err) return console.log('login error: ' + err.message);

  // otherwise, good to go!
}).on('error', function(err) {
  console.log('background error: ' + err.message);
});

winkapi.setOutlet(20582, function(err, outlet) {
  if (!!err) return console.log('setOutlet: ' + err.message);

  // inspect outlet{}
});

app.get('/', routes.index);
// Uncomment the next line to test the database
// app.get('/test-database', routes.testDatabase);

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});