import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode> {/*안의 컴포넌트에 대한 안정성 검사*/ }
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
