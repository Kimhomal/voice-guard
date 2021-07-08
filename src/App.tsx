import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './components/user/signin';
import Guard from './components/guard/guard';
import Header from './components/header/header';
import { AuthService } from './service/auth_service';
import Sidebar, { Anchor } from './components/sidebar/sidebar';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export type sidebarStateType = {
  anchor: Anchor;
  active: boolean;
};

export type toggleSidebarFucntion = (
  event: React.KeyboardEvent | React.MouseEvent
) => void;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  })
);

const App = ({ authService }: { authService: AuthService }) => {
  // const [userId, setUserId] = useState(history.state && history.state.id);
  const classes = useStyles();

  const [sidebarState, setSidebarState] = React.useState<sidebarStateType>({
    anchor: 'left',
    active: false,
  });

  const onLogout = () => {
    authService.logout();
  };

  const toggleDrawer: toggleSidebarFucntion = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setSidebarState({ ...sidebarState, active: !sidebarState.active });
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Signin authService={authService}></Signin>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/guard">
          <div className={classes.root}>
            <CssBaseline />
            <Header onLogout={onLogout} toggleSidebar={toggleDrawer}></Header>
            <Sidebar
              anchor={sidebarState.anchor}
              open={sidebarState.active}
              toggleSidebar={toggleDrawer}
            ></Sidebar>
            <main className={classes.content}>
              <Toolbar />
              <Guard authService={authService}></Guard>
            </main>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
