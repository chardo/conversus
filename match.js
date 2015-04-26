module.exports = function(io, waitingQueue){
	io.on('connection', function(socket){
		console.log('Player ' + socket.id + ' connected.');
		
		socket.on('join queue', function(msg){
	    console.log(socket.id + ' joined queue');
	    waitingQueue.push(socket.id);
	    console.log(waitingQueue[0]);
	  });
	});
}