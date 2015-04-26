module.exports = function(io, waitingQueue){
	io.on('connection', function(socket) {
		console.log('Player ' + socket.id + ' connected.');
		
		socket.on('join queue', function(){
			
		});
	});
}