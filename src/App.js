import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './routes/Home';
import Login from './chat/Login';
import Chatting from './chat/Chatting';
import Join from './chat/Join';
import MyPage from './chat/MyPage'

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/sproutchat" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" render={Login()} />
      <Route path="/join" render={<Join />} />
      <Route path="/chat" render={<Chatting />} />
      <Route path="/mypage" render={<MyPage />} />
    </Routes>
  </Router>
  );
}


export default App;
