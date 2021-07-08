import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AuthService from './service/auth_service';
import './index.module.css';

const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} />
  </React.StrictMode>,
  document.getElementById('root')
);
