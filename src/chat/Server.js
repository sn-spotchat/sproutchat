var express = require('express'),
    port = process.env.PORT || 3005,
    app = express(),
    server = require('http').createServer(app);

let userId = '';
//const cors=require('cors');
//app.use(cors());

const options = { //cors options 해결하니 socket 연결됨.
    cors:true,
    origins:['http://localhost:3000'],
}

var io = require('socket.io')(server, options);
app.use('/api',(req,res)=>res.send({username:'Sejin'}));

server.listen(port, () => {
    console.log(`server open ${port}`);//이건 출력 된당
}); 


io.on('connection', function (socket) {
    console.log('server connection')

    socket.on('login' , (data, cb) => {
        socket.emit('login', data, cb);
        socket.emit('get_user',data,cb); 
        //서버에서 저장을 해놓고 클라이언트에서 받으면 각 id에 따른 채팅방을 열어줌   
    })
    socket.on('join' , (data, cb) => {
        socket.emit('join', data, cb);    
    })
    socket.on('userInfo', (data) => {
        userId = data;
    })
    io.emit('getUserId', userId);
    socket.on('joinpage', (data) => {
        socket.emit('joinpage', data);
    })
    socket.on('loginpage', (data) => {
        socket.emit('loginpage', data);
    })
    socket.on('room', (data) => {
        socket.emit('room', data);
    })
});
