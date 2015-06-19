var games = {}
var Game = require('./game');


module.exports = function(io, queue){
	
	io.on('connection', function(socket){
		console.log('Player ' + socket.id + ' connected.');
		
		socket.on('join queue', function(){
	    console.log(socket.id + ' joined queue');
	    queue.push(socket);
	  });

	  socket.on('leave game', function(){
	  	leaveGame(socket, queue);
	  });

	  socket.on('chat message', function (data) {
        console.log('chat message from ' + socket.id + ': ' + data);
        var roomId = socket.roomId;
        if (roomId && games.hasOwnProperty(roomId)) {
        	data.gameOver = games[roomId].checkMsg(socket.id, data.msg);
        	data.game = games[roomId];
        	data.senderId = socket.id;
        	io.to(roomId).emit('chat message', data);
        }
    });

	  socket.on('disconnect', function () {
      console.log('Player ' + socket.id + ' disconnected');
      leaveGame(socket, queue);
    });
	});

	setInterval(function(){
		if (queue.length < 2)
			return;

		roomId = generateGame(queue, io);
    io.to(roomId).emit('start game', null);

	}, 1000);
};

function leaveGame(socket, queue){
	// remove if socket was still on queue
	var index = queue.indexOf(socket);
	if (index != -1)
		queue.splice(index, 1);
}

function generateRoomId(len){
	var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
	var roomId = '';

	for(var i = 0; i < len; i++){
		roomId += pool[Math.floor(Math.random() * pool.length)];
	}

	return roomId;
}


// selects two sockets randomly from waiting queue, add them to a room, and returns the room ID
function generateGame(queue){
	var index = Math.floor(Math.random() * queue.length);
  var player1 = queue[index];
  queue.splice(index, 1);

	index = Math.floor(Math.random() * queue.length);
  var player2 = queue[index];
  queue.splice(index, 1);

  // generate room ID and add sockets
  var roomId = generateRoomId(7);
  player1.join(roomId);
  player2.join(roomId);

  player1.roomId = roomId;
  player2.roomId = roomId;

  // create game and add to games object
  var game = new Game(player1.id, player2.id);
  console.log("Player 1 = " + game.p1);
  console.log("Player 2 = " + game.p2);
  games[roomId] = game;

  return roomId;
}