var express = require('express'),
    port = process.env.PORT || 3005,
    app = express(),
    server = require('http').createServer(app);

let userId = '';

const options = { //cors options 해결하니 socket 연결됨.
    cors:true,
    origins:['http://localhost:3000'],
}

var io = require('socket.io')(server, options);
app.use('/api',(req,res)=>res.send({username:'Sejin'}));

server.listen(port, () => {
    console.log(`server open ${port}`);//이건 출력 된당
}); 

io.sockets.on('connection', function (socket) {
    console.log('server connection')

    socket.on('naverlogin', (data)=>{
        socket.broadcast.emit('naverlogin',data)
    })

    socket.on('login' , (data, cb) => {
        socket.emit('login', data, cb);
    })
    socket.on('join' , (data, cb) => {
        socket.emit('join', data, cb);    
    })
    socket.on('userInfo', (data) => {
        userId = data; // 위에서 let userID = ''로 만든 userId에 id 저장
    })
    io.emit('getUserId', userId);// server가 connect될 때마다 userId를 전체 클라이언트에 보내줌

    socket.on('joinpage', (data) => {
        socket.emit('joinpage', data);
    })
    socket.on('loginpage', (data) => {
        socket.emit('loginpage', data);
    })

    socket.on('userlist', (data) => {
        socket.emit('userlist', data);
    })
});
