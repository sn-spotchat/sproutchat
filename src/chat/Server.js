const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server) // socket.io 를 사용하기 위한 io 객체 생성
const api = require('./index');//여러 경로를 module화 해놓은 파일

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
app.use('/api',(req,res)=>res.json({username:'jinyoung'}));
///api/(...)로 get요청이 들어오면 api라는 라우터 미들웨어가 처리
///api에 해당하는 index.js로 가서 router.get(...)에서 처리

app.get('/', function (req, res) {
    res.redirect('/chat');
}); // '/' 로 들어오는 요쳥을 '/chat'으로 리다이렉팅*/
    
app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/prev_page.html'); 
}); // '/chat'으로 들어오는 요청 렌더링. html파일만 적용가능. 다른 파일은 코드 자체 출력.
    
server.listen(port, () => {
    console.log(`server open ${port}`);
}); // 3001 포트로 서버 open

io.on('connection', socket => {
    console.log('connect');
    socket.on('chat-msg', (msg) => {
        console.log('message:', msg)
        // 모든 클라이언트에게 전송 --- (※6)
        io.emit('chat-msg', msg)
      })
});