require('rootpath')();
var express = require('express');
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

//used in .html file to load node_modules library statically
// app.use(express.static(path.join(__dirname, 'node_modules')));
// app.use(express.static(path.join(__dirname, 'assets')));

//Enabling CORS to support inter domain communication.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes
app.use('/news', require('./controllers/news.controller'));

var server = app.listen(process.env.PORT || 2000, function() {
	console.log('server listening at http://' + server.address().address + ':' + server.address().port);
});