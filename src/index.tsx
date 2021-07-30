import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AuthService from './service/auth_service';
import './index.module.css';
import Youtube from './service/youtube';

const authService = new AuthService();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY!);

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} youtube={youtube} />
  </React.StrictMode>,
  document.getElementById('root')
);
