/* src/App.js */
import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import RouteWithLayout from './layouts/RouteWithLayout';
import MainLayout from './layouts/Main';

import Home from './routes/Home';
import Login from './routes/Board/login';
import NewLogin from './chat/Login';
import Join from './routes/Board/join';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
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
          component={ Join }
        />
        <RouteWithLayout
          path="/chat" 
          layout={ MainLayout }
          component={ NewLogin }
        />
      </Switch>
    </Router>
  );
}

export default App;