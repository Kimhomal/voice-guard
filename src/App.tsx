import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Youtube from './service/youtube';
import Signin from './components/user/signin';
import { AuthService } from './service/auth_service';
import PrivateRoute from './components/private_route/private_route';
import Guard from './components/guard/guard';
import VideoMain from './components/video/video_main/video_main';

const App = ({
  authService,
  youtube,
}: {
  authService: AuthService;
  youtube: Youtube;
}) => {
  return (
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
  );
};

export default App;
