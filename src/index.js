
//import React from 'react';
//import ReactDOM from 'react-dom';
///import App from './App';

//ReactDOM.render(
 // <React.StrictMode> {/*안의 컴포넌트에 대한 안정성 검사*/ }
 //   <App />
 // </React.StrictMode>,
//  document.getElementById('root')
//);

var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res){
  res.send({greeting: 'Hello React x Node.js'});

});

module.exports = router;