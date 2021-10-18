import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AuthService from './service/auth_service';
import './index.module.css';
import Youtube from './service/youtube';
import GuardRepository from './service/guard_repository';

const authService = new AuthService();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY!);
// const youtube = new YoutubeOAuth();
const guardRepository = new GuardRepository();

// Youtube iframe API load
(function () {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
})();

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      youtube={youtube}
      guardRepository={guardRepository}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
