import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AuthService from './service/auth_service';
import './index.module.css';
import Youtube from './service/youtube';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const authService = new AuthService();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY!);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App authService={authService} youtube={youtube} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
