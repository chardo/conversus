module.exports = function(io, queue){
	
	io.on('connection', function(socket){
		console.log('Player ' + socket.id + ' connected.');
		
		socket.on('join queue', function(){
	    console.log(socket.id + ' joined queue');
	    queue.push(socket);
	  });

	  socket.on('leave game', function(){
	  	leaveGame(socket);
	  });

	  socket.on('chat message', function (msg) {
        //console.log('chat message from ' + socket.id + ': ' + msg);
        var roomId = socket.roomId;
        if (roomId) {
        	socket.broadcast.to(name).emit('chat message', msg);
        }
    });

	  socket.on('disconnect', function () {
      console.log('Player ' + socket.id + ' disconnected');
      leaveGame(socket);
    });
	});

	var leaveGame = function(socket){
		// remove if socket was still on queue
		var index = queue.indexOf(socket);
  	if (index != -1)
  		queue.splice(index, 1);
  	
	};

	var generateRoomId = function(len){
		var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
		var roomId = '';

		for(var i = 0; i < len; i++){
			roomId += pool[Math.floor(Math.random() * pool.length)];
		}

		return roomId;
	};

	setInterval(function(){
		if (queue.length < 2)
        return;

    var index = Math.floor(Math.random() * queue.length);
    var player1 = queue[index];
    queue.splice(index, 1);

		index = Math.floor(Math.random() * queue.length);
    var player2 = queue[index];
    queue.splice(index, 1);

    var roomId = generateRoomId(7);
    player1.join(roomId);
    player2.join(roomId);

    player1.roomId = roomId;
    player2.roomId = roomId;

    io.to(roomId).emit('start game', null);

	}, 1000);
}