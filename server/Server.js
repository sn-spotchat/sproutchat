const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');

const port = 3002

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socket(server); // socket.io 를 사용하기 위한 io 객체 생성

app.use(cors());

//먼저 로드 되는 함수가 먼저 실행. 코드 순서 중요.
/*
app: 애플리케이션 자체에 request가 발생할 때마다 실행
app.use(): 경로 지정 가능 경로 없이 function만 쓰면 어떤 request가 들어와도 작동
    경로 지정 시 해당 경로로 들어오는 요청에 대해서만 작동
app.get(): get요청에만 동작하는 미들웨어
+) function(rq,res,next): next를 통해 현재 미들웨어 상태에 따라
    선택적으로 다음으로 넘어갈 미들웨어 함수 지정 가능
*/
//app.use('/api',api);
///api/(...)로 get요청이 들어오면 api라는 라우터 미들웨어가 처리
///api에 해당하는 index.js로 가서 router.get(...)에서 처리

//app.use('/api',(req,res)=>res.send({username:'jinyoung'}));

/*app.get('/', function (req, res) {
    res.redirect('/sproutchat');
}); // '/' 로 들어오는 요쳥을 '/chat'으로 리다이렉팅*/
    
/*app.get('/sproutchat', function (req, res) {
    res.sendFile(__dirname + '/prev_page.html'); 
}); // '/chat'으로 들어오는 요청 렌더링. html파일만 적용가능. 다른 파일은 코드 자체 출력.*/
    

io.on('connection', (socket) => {
	console.log('connected in server');
	socket.emit('connect');
/*
    socket.on('join', (item) => {
		const msg = item.id + ' : ' + item.password;
		console.log(msg);
		io.emit('join complete', {id:item.id, password:item.password});
	});*/
	socket.on('server',(id)=>{console.log('get server');});
	socket.on('login', ({id,password}, callback) => {
		console.log('hi server')
		socket.emit('login',({id,password},callback))
	})
	socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});
/*
io.on('connection', (socket) => {
	socket.on('send message', (item) => {
		const msg = item.name + ' : ' + item.message;
		console.log(msg);
		io.emit('receive message', {name:item.name, message:item.message});
	});
    socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});*/
//app.use(router);

server.listen(3002, () => {
    console.log(`server open *:3002`);
}); 