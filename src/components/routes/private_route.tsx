import React, { useCallback, useState } from 'react';
import { Toolbar, useMediaQuery } from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Sidebar, { Anchor } from '../sidebar/sidebar';
import Header from '../header/header';
import { AuthService } from '../../service/auth_service';
import { useHistory } from 'react-router-dom';
import BottomNav from '../footer/bottom_nav';

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
      width: '100%',
      flexGrow: 1,
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
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('xs'));

  const [userName, setUserName] = useState<string | null>(null);
  const [sidebarState, setSidebarState] = useState<sidebarStateType>({
    anchor: 'left',
    active: false,
  });

  authService.onAuthChange((user) => {
    if (!user) {
      setUserName(null);
      history.push('/signin');
    } else {
      setUserName(user.displayName);
    }
  });

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

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
      <Header
        userName={userName}
        onLogout={onLogout}
        toggleSidebar={toggleDrawer}
      ></Header>
      <Sidebar
        anchor={sidebarState.anchor}
        open={sidebarState.active}
        toggleSidebar={toggleDrawer}
      ></Sidebar>
      <main className={classes.content}>
        <Toolbar />
        {children}
        {breakpoint && <Toolbar />}
      </main>
      {breakpoint && <BottomNav />}
    </div>
  );
};

export default PrivateRoute;
