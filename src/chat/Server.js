var express = require('express'),
    port = process.env.PORT || 3005,
    app = express(),
    server = require('http').createServer(app);

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
    })

});
