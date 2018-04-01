var express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use("/",require("./route"));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

const options = {
  key: fs.readFileSync('./keys/1522555444697.key'),
  cert: fs.readFileSync('./keys/1522555444697.pem')
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(443,function(){
  var host = httpsServer.address().address;
  var port = httpsServer.address().port;
  console.log('My scheduler listening at http://%s:%s', host, port);
});

