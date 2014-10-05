var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var routes = require(__dirname + '/routes/routes');
var authConfig = require(__dirname + '/authConfig');
var WinkAPI = require(__dirname + '/winkapi');

var app = express();
var toggleStatus = false;

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

  winkapi.setOutlet(20582, !toggleStatus, function(err, outlet) {
    if (!!err) return console.log('setOutlet: ' + err.message);
  });
  var dial = {};
  
  dial.path = '/dials/33321';
  dial.label = 'cat';
  dial.labels = ['cats'];
  dial.position = 40;
  dial.props =      {
      "dial_template_id": "10",
      "dial_configuration": {
          "min_value": 0,
          "max_value": 360,
          "min_position": 0,
          "max_position": 360,
          "scale_type": "linear",
          "rotation": "cw",
          "num_ticks": 12
      },
      "channel_configuration": {
          "channel_id": "10"
      },
      "name": "Manual control"
  }
  winkapi.setDial(dial, { enabled: true }, function(err, dial) {
    if (!!err) return console.log('setDial: ' + err.message);
    // inspect dial{}
  });


}).on('error', function(err) {
  console.log('background error: ' + err.message);
});



app.get('/', routes.index);
// Uncomment the next line to test the database
// app.get('/test-database', routes.testDatabase);

app.post('/toggle', function(req, res) {
  console.log('post')
  toggleStatus = !toggleStatus;
  winkapi.setOutlet(20582, toggleStatus, function(err, outlet) {
    console.log('toggled!' + toggleStatus);
    if (!!err) return console.log('setOutlet: ' + err.message);
  });
  res.end();
});

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});