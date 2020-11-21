var express = require('express'),
    port = process.env.PORT || 3005,
    app = express(),
    server = require('http').createServer(app);

var io = require('socket.io')(server);


const cors=require('cors');
app.use(cors());
app.use('/api',(req,res)=>res.send({username:'Sejin'}));

server.listen(port, () => {
    console.log(`server open ${port}`);//이건 출력 된당
}); 


io.on('connection', function (socket) {

    socket.emit('connect', () => {
        console.log('server emit')
    })

});