var express = require('express');
var router = express.Router();

/*
router: 동작 방식은 app과 동일. 라우터 단위로 묶음.
    애플리케이션에 경로별 요청에 따른 동작 방식을 모듈화하여 관리.
*/
//localhost:3001/api/.../로 들어오는 모든 요청 처리 가능
router.get('/',function(req,res){
    res.send({greeting:'Hello React x Node.js'});
})

module.exports=router;