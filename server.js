var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// This is needed if the app is run on heroku:
var port = process.env.PORT || 8080;

http.listen(port, function(){
	console.log('Your application is running on http://localhost:' + port);
});

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./routes')(app, io);


var waitingQueue = [];
require('./game/controller')(io, waitingQueue);