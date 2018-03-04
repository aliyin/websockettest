$(function(){
	var socket = io.connect('http://192.168.43.101:3000')
	
	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	
	//emit message
	send_message.click(function(){
		socket.emit('new_message',{message : message.val()})
	})
	
	//listen on new message
	socket.on("new_message", function(data){
		console.log(data)
		chatroom.append("<p class='message'>"+data.username+": "+data.message+"</p>")
	})
	
	//emit a username
	send_username.click(function(){
		console.log(username.val())
		socket.emit('change_username', {username : username.val()})
	})
});