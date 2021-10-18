import React from 'react';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Sidebar, { Anchor } from '../sidebar/sidebar';
import Header from '../header/header';
import { AuthService } from '../../service/auth_service';
import { useHistory } from 'react-router-dom';

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

const PrivateRoute = ({
  authService,
  children,
}: {
  authService: AuthService;
  children?: React.ReactChild;
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [sidebarState, setSidebarState] = React.useState<sidebarStateType>({
    anchor: 'left',
    active: false,
  });

  authService.onAuthChange((user) => {
    if (!user) {
      history.push('/');
    }
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

  // const childrenWithExtraProp = React.Children.map(children, (child) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, { accessToken: authService.credential });
  //   }
  // });

  return (
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
        {children}
      </main>
    </div>
  );
};

export default PrivateRoute;
