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

var onlineUsers = {};


io.sockets.on('connection', function (socket) {
    console.log('server connection')

    socket.on('naverlogin', (data)=>{
        socket.broadcast.emit('naverlogin',data)
    })

    socket.on('login' , (data, cb) => {
        socket.emit('login', data, cb);
        socket.emit('get_user',data,cb); 
        //서버에서 저장을 해놓고 클라이언트에서 받으면 각 id에 따른 채팅방을 열어줌   
    })
    socket.on('join' , (data, cb) => {
        socket.emit('join', data, cb);    
    })
    socket.on('userInfo', (data) => {
        userId = data; // 위에서 let userID = ''로 만든 userId에 id 저장
    })
    io.emit('getUserId', userId); // server가 connect될 때마다 userId를 전체 클라이언트에 보내줌
    console.log('userId is : ' + userId)
    socket.on('joinpage', (data) => {
        socket.emit('joinpage', data);
    })
    socket.on('loginpage', (data) => {
        socket.emit('loginpage', data);
    })
    socket.on('room', (data) => {
        socket.emit('room', data);
    })
    socket.on('new message', function (data) {
        socket.emit('new message', data);
    })

    socket.on('join room', function (data) {
        let id = getUserBySocketId(socket.id);
        let prevRoomId = onlineUsers[id].roomId;
        let nextRoomId = data.roomId;
        socket.leave('room' + prevRoomId);
        socket.join('room' + nextRoomId);
        onlineUsers[id].roomId = data.roomId;
        updateUserList(prevRoomId, nextRoomId, id);
    });
    
    socket.on('logout', function () {
        if (!socket.id) return;
        let id = getUserBySocketId(socket.id);
        let roomId = onlineUsers[id].roomId;
        delete onlineUsers[getUserBySocketId(socket.id)];
        updateUserList(roomId, 0, id);
    });

    socket.on("send message", function (data) {
        io.sockets.io('room' + data.roomId).emit('new message', {
            name: getUserBySocketId(socket.id),
            socketId: socket.id,
            msg: data.msg
        });
    });
  
    function updateUserList(prev, next, id) {
        if (prev !== 0) {
            io.sockets.in('room' + prev).emit("userlist", getUsersByRoomId(prev));
            io.sockets.in('room' + prev).emit("lefted room", id);
            console.log("prev"+ prev);
        }
        if (next !== 0) {
            io.sockets.in('room' + next).emit("userlist", getUsersByRoomId(next));
            io.sockets.in('room' + next).emit("joined room", id);
            console.log("next"+ next);
        }
    }


    function getUserBySocketId(id) {
        return Object.keys(onlineUsers).find(key => onlineUsers[key].socketId === id);
    }

    function updateUserList(prev, next, id) {
        if (prev !== 0) {
            io.sockets.in('room' + prev).emit("userlist", getUsersByRoomId(prev));
            io.sockets.in('room' + prev).emit("lefted room", id);
            console.log("prev"+ prev);
        }
        if (next !== 0) {
            io.sockets.in('room' + next).emit("userlist", getUsersByRoomId(next));
            io.sockets.in('room' + next).emit("joined room", id);
            console.log("next"+ next);
        }
    }

    function getUsersByRoomId(roomId) {
        let userstemp = [];
        Object.keys(onlineUsers).forEach((el) => {
            if (onlineUsers[el].roomId === roomId) {
                userstemp.push({
                    socketId: onlineUsers[el].socketId,
                    name: el
                });
            }
        });
        return userstemp;
    }
});
