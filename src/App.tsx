import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Youtube from './service/youtube';
import Signin from './components/user/signin';
import { AuthService } from './service/auth_service';
import PrivateRoute from './components/private_route/private_route';
import Guard from './components/guard/guard';
import VideoMain from './components/video/video_main/video_main';
import { createTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { useMemo } from 'react';

const App = ({
  authService,
  youtube,
}: {
  authService: AuthService;
  youtube: Youtube;
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          secondary: {
            main: '#b9f6ca',
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Signin authService={authService}></Signin>
          </Route>
          <Route path="/youtube">
            <PrivateRoute authService={authService}>
              <VideoMain youtube={youtube}></VideoMain>
            </PrivateRoute>
          </Route>
          <Route path="/guard">
            <PrivateRoute authService={authService}>
              <Guard></Guard>
            </PrivateRoute>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
