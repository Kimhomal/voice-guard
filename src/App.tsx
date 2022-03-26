import { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Youtube from './service/youtube';
import Signin from './components/user/signin';
import { AuthService } from './service/auth_service';
import PrivateRoute from './components/routes/private_route';
import PublicRoute from './components/routes/public_route';
import Guard from './components/guard/guard';
import VideoMain from './components/video/video_main/video_main';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import GuardRepository from './service/guard_repository';
import Main from './components/main/main';

const App = ({
  authService,
  youtube,
  guardRepository,
}: {
  authService: AuthService;
  youtube: Youtube;
  guardRepository: GuardRepository;
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: { main: indigo[800] },
          secondary: {
            main: indigo['A400'],
          },
        },
        typography: {
          fontFamily: ['"NanumGhotic Regular"', 'sans-serif'].join(','),
        },
      }),
    [prefersDarkMode]
  );

  authService.onAuthChange((user) => {
    if (user) {
      guardRepository.isFirstUser();
    }

    console.log('app useEffect');
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin">
            <Signin authService={authService}></Signin>
          </Route>
          <Route exact path="/">
            <PublicRoute authService={authService}>
              <Main></Main>
            </PublicRoute>
          </Route>
          <Route path="/youtube">
            <PrivateRoute authService={authService}>
              <VideoMain
                youtube={youtube}
                guardRepository={guardRepository}
              ></VideoMain>
            </PrivateRoute>
          </Route>
          <Route path="/guard">
            <PrivateRoute authService={authService}>
              <Guard guardRepository={guardRepository}></Guard>
            </PrivateRoute>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
