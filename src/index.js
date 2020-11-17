import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:3001')


ReactDOM.render(
  <React.StrictMode> {/*안의 컴포넌트에 대한 안정성 검사*/ }
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
