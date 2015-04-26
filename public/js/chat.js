$(function(){
	var socket = io();

	$('#join').on('click', function(e){
		//e.preventDefault();

		socket.emit('join queue', null);
		//alert('button!');
	});

	$('#textbox').submit(function(){
    //socket.emit('join queue', null);
    $('#m').val('');
    return false;
  });

});