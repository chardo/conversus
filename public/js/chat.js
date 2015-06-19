$(function(){

	var socket = io();

	var name = generateName(10);
	//alert(name);

	$('#join').on('click', function(e){
		//e.preventDefault();

		socket.emit('join queue', null);
		$('#landing').hide();
		$('#waiting').show();
	});

	socket.on('start game', function(){
		$('#waiting').hide();
		$('#chat').show();
	});

	$('#send').on('click', function(){
    sendMsg();
  });

  $('#m').keypress(function(e){
  	if (e.keyCode == 13)
  		$('#send').click();
  });

	socket.on('chat message', function(data){
		// do something with the message
		createChatMsg(data);
		checkStatus(data);
	});

	function generateName(len){
		var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
		var name = '';

		for(var i = 0; i < len; i++){
			name += pool[Math.floor(Math.random() * pool.length)];
		}

		return name;
	};

	function sendMsg(){
		var msg = $('#m').val();

		// don't send blank messages
		if (!msg)
			return;

		socket.emit('chat message', {name: name, msg: msg});
		$('#m').val('');
	}

	function createChatMsg(data){
		var sender = '';
		if (data.senderId == data.game.p1)
			senderClass = 'p1Message';
		else
			senderClass = 'p2Message';

		var newMsg = '<li class="'+senderClass+'">' + data.msg + '</li>'; 
		$('#chats').append(newMsg);
	}

	function checkStatus(data){
		if (data.gameOver){
			if (data.name == name)
				// I lose!
				alert('You Lose!');
			else
				// I win!
				alert('You Win!');
		}
	}

});