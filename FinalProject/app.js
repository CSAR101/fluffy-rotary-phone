var express = require('express');
var app = express();

var request = require('request');

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

app.get('/Halo5Match', function (req, res) {
  var name = req.param('name');
  console.log("playerGamertag="+ name);
  request({
     //url:'https://www.haloapi.com/stats/h5/servicerecords/arena?players=raptorship',
     url: 'https://www.haloapi.com/stats/h5/players/' + name + '/matches?start=0&count=5',
     headers: {
        'Ocp-Apim-Subscription-Key':'eddd9f2248194ff1955447374d2b0d91'
     },
     method:'GET'

  },
  function(error,r,body) {
      console.log(body); res.setHeader('Content-Type','application/json'); res.send(body);
  });
  //var responseText = '{name: Hello}';
  //res.send(JSON.stringify(body));

});

app.get('/Halo5MapMeta', function (req, res) {
  var mapId = req.param('mapId');
  console.log("MapID="+ mapId);
  
  request({
     url:'https://www.haloapi.com/metadata/h5/metadata/map-variants/' + mapId,
     //url: 'https://www.haloapi.com/stats/h5/players/raptorship/matches?start=0&count=5',
     headers: {
        'Ocp-Apim-Subscription-Key':'eddd9f2248194ff1955447374d2b0d91'
     },
     method:'GET'

  },
  function(error,r,body) {
      console.log(body); res.setHeader('Content-Type','application/json'); res.send(body);
  }); 
  //var responseText = '{name: Hello}';
  //res.send(JSON.stringify(body));
});


app.get('/Halo5GameVariantMeta', function (req, res) {
  var gameVariantId = req.param('gameVariantId');
  console.log("GameVariantID="+ gameVariantId);
  
  request({
     url:'https://www.haloapi.com/metadata/h5/metadata/game-variants/' + gameVariantId,
     //url: 'https://www.haloapi.com/stats/h5/players/raptorship/matches?start=0&count=5',
     headers: {
        'Ocp-Apim-Subscription-Key':'eddd9f2248194ff1955447374d2b0d91'
     },
     method:'GET'

  },
  function(error,r,body) {
      console.log(body); res.setHeader('Content-Type','application/json'); res.send(body);
  }); 
  //var responseText = '{name: Hello}';
  //res.send(JSON.stringify(body));
});

app.get('/Halo5PostGameCarnageArena', function (req, res) {
  var matchId = req.param('matchId');
  console.log("MatchID="+ matchId);
  
  request({
     url:'https://www.haloapi.com/stats/h5/arena/matches/' + matchId,
     //url: 'https://www.haloapi.com/stats/h5/players/raptorship/matches?start=0&count=5',
     headers: {
        'Ocp-Apim-Subscription-Key':'eddd9f2248194ff1955447374d2b0d91'
     },
     method:'GET'

  },
  function(error,r,body) {
      console.log(body); res.setHeader('Content-Type','application/json'); res.send(body);
  }); 
  //var responseText = '{name: Hello}';
  //res.send(JSON.stringify(body));
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

