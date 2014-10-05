var http = require('http');
var parseString = require('xml2js').parseString;
var _ = require('underscore');
var toggleStatus = false;

exports.index = function(req, res) {
  res.render('index.html');
}

exports.shuttles = function(req, res) {
  var req2 = http.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=mit', function(res2) {
    res2.on('data', function (xml) {
      parseString(xml, function (err, result) {
        shuttles = _.map(result.body.route, function(route) {
          return route.$;
        });
        res.send({shuttles: shuttles});
      });
    });
    
  })
  req2.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
}

exports.toggle = function(req, res) {
  toggleStatus = !toggleStatus;
  winkapi.setOutlet(20582, toggleStatus, function(err, outlet) {
    if (!!err) return console.log('setOutlet: ' + err.message);
  });
  res.end();
}
