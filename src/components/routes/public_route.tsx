import React, { useCallback, useState } from 'react';
import { Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Sidebar, { Anchor } from '../sidebar/sidebar';
import Header from '../header/header';
import { AuthService } from '../../service/auth_service';

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
    },
  })
);

const PublicRoute = ({
  authService,
  children,
}: {
  authService: AuthService;
  children?: React.ReactChild;
}) => {
  const classes = useStyles();

  const [userName, setUserName] = useState<string | null>(null);
  const [sidebarState, setSidebarState] = useState<sidebarStateType>({
    anchor: 'left',
    active: false,
  });

  authService.onAuthChange((user) => {
    if (user) {
      setUserName(user.displayName);
    } else {
      setUserName(null);
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
      </main>
    </div>
  );
};

export default PublicRoute;
