var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var routes = require(__dirname + '/routes/routes');
var authConfig = require(__dirname + '/authConfig');
var WinkAPI = require(__dirname + '/winkapi');
var Firebase = require("firebase");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

winkapi = new WinkAPI.WinkAPI({ clientID     : authConfig.auth.client_id
                              , clientSecret : authConfig.auth.client_secret }).login(
                              authConfig.auth.username, authConfig.auth.password, function(err) {
  if (!!err) return console.log('login error: ' + err.message);
  init();
}).on('error', function(err) {
  console.log('background error: ' + err.message);
});

init = function() {
  var fref = new Firebase("https://poofytoo.firebaseio.com/nimbus");

  fref.on('value', function(snapshot) {
    var data = snapshot.val();

    for (i = 1; i < 5; i++) {
      var dial = {};
      dial.path = '/dials/3332' + i;
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
            "name": "Manual control",
            "value": data[i].pointer,
            "label": data[i].label
        }
      winkapi.setDial(dial, { enabled: true }, function(err, dial) {
        if (!!err) return console.log('setDial: ' + err.message);
        // inspect dial{}
      });
      }
  })
}


app.get('/', routes.index);
app.post('/toggle', routes.toggle);
app.post('/getShuttles', routes.shuttles);
app.post('/setShuttle', function(req, res, next) {
  console.log(req.body);
  res.send({});
});

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});