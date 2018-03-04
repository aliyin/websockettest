const express = require('express')
const app = express()
//set the template engine ejs
app.set('view engine', 'ejs')
//middlewares
app.use(express.static('public'))

//routes
app.get('/', function(req,res){
	res.render('index')
})

server = app.listen(3000)
const io = require("socket.io")(server)	
io.on('connection', function (socket){
	console.log('new user connected')
	
	//default username
	socket.username = "Anonymous"
	//listen on change_username
	socket.on('change_username', function(data){
		socket.username = data.username
	})
	//listen on new_message
	socket.on('new_message', function(data){
		//broadcast the new message
		io.sockets.emit('new_message',{ message:data.message, username:socket.username});
	})
})