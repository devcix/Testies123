var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var _               = require('lodash');
var port            = 3055;
var serviceName     = "ScumDog";
var fs              = require('fs');



app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUSH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// root routes
app.use('/styles', express.static('client/app/styles'));
app.use('/lib', express.static('client/app/lib'));
app.use('/views', express.static('client/app/views'));
app.use('/scripts', express.static('client/app/scripts'));

// Endpoints
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/app/views/standup.html');
});

app.get('/standups', function(req, resp){
  res.sendFile(__dirname + '/client/app/views/standup.html');
});

app.get('/users', function(req, resp){
  res.sendFile(__dirname + '/client/app/views/users.html');
});

app.get('/reports', function(req, resp){
  res.sendFile(__dirname + '/client/app/views/reports.html');
});

app.get('/standups/read', function(req, resp){
  var read = fs.readFile('client/app/models/standup-report.json', 'utf8');
});
app.post('/standups/save/:current', function(req, resp){
  fs.writeFile('client/app/models/standup-report.json', req.params.current);

  // var read = fs.readFile('standup-report.json', 'utf8', function(err, data){
  //   if(err){
  //     console.error(err);
  //   }
  //   console.log("Save Endpoint reached", data, req.params.current);
  // });

});

app.listen(port);
console.log("[" + serviceName + "] Server Launched Successfully");
console.log("[" + serviceName + "] Listening on port", port);
