import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  Icon,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import clsx from 'clsx';
import React from 'react';
import { toggleSidebarFucntion } from '../../app';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.4em',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.0)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        outline: '1px solid slategrey',
      },
    },
    drawerOpen: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: drawerWidth - 60,
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
  })
);

const Sidebar = ({
  anchor,
  open,
  toggleSidebar,
  width,
}: {
  anchor: Anchor;
  open: boolean;
  toggleSidebar: toggleSidebarFucntion;
  width: Breakpoint;
}) => {
  const classes = useStyles();

  const items = [
    { icon: 'fa fa-plus-circle', text: '재생목록' },
    { icon: 'add_circle', text: '탐색' },
    { icon: 'MoveToInbox', text: '홈' },
    { icon: 'Mail', text: '구독' },
  ];

  const list = (anchor: Anchor) => (
    <List>
      {items.map((item, index) => (
        <ListItem button key={item.text}>
          <ListItemIcon>
            {/* {index % 2 === 0 ? <MoveToInbox /> : <Mail />} */}
            <Icon className={item.icon}></Icon>
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <>
      {isWidthUp('sm', width) ? (
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          variant="permanent"
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}></div>
          {list(anchor)}
        </Drawer>
      ) : (
        <Drawer anchor={anchor} open={open} onClose={toggleSidebar}>
          {list(anchor)}
        </Drawer>
      )}
    </>
  );
};

export default withWidth()(Sidebar);
