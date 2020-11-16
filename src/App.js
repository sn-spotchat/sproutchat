/* src/App.js */
import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import RouteWithLayout from './layouts/RouteWithLayout';
import MainLayout from './layouts/Main';

import Home from './routes/Home';
import Login from './routes/Board/login';
import new_login from './chat/new_login.tsx';


function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/sproutchat" to="/home" />
        <RouteWithLayout
          path="/home"
          layout={ MainLayout }
          component={ Home }
        />
        <RouteWithLayout
          path="/login"
          layout={ MainLayout }
          component={ Login }
        />
        <RouteWithLayout
          path="/join"
          layout={ MainLayout }
          component={ new_login }
        />
        
        {/*<RouteWithLayout
          path="/chat" //naverlogin.js 안의 Success진행 
          layout={ MainLayout }
          component={ Success }
        />
        <Redirect to="/home" />*/}
      </Switch>
    </Router>
  );
}

export default App;