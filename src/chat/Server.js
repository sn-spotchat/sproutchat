const express = require('express');
const socket = require('socket.io');
const http = require('http');
//const cors = require('cors');

const port = process.env.PORT || 3002;
const app = express();
//app.use(cors());
//const router = require('./router');

const options ={
	cors:true,
	origins:['http://localhost:3000'],
}

const server = http.createServer(app);
const io = socket(server, options); // socket.io 를 사용하기 위한 io 객체 생성

server.listen(port, () => {
    console.log(`server open *:3002`);
}); 

io.on('connection', function(socket) {
	console.log('connected in server');

	socket.on('server',(userid)=>{
		console.log('get server');
		console.log(userid);
	});

	socket.on('login', (data, cb) => {
		console.log('hi server')
		socket.emit('login',data,cb)
	})
	socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});

