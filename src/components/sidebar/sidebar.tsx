import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import {
  PlayCircleFilled as PlayCircleFilledIcon,
  Mic as MicIcon,
} from '@material-ui/icons';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import clsx from 'clsx';
import { toggleSidebarFucntion } from '../private_route/private_route';
import { Link } from 'react-router-dom';

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
    { icon: <MicIcon></MicIcon>, text: '보이스 목록', path: '/guard' },
    {
      icon: <PlayCircleFilledIcon></PlayCircleFilledIcon>,
      text: '유튜브 검색',
      path: '/youtube',
    },
  ];

  const list = (anchor: Anchor) => (
    <List>
      {items.map((item, index) => (
        <ListItem button key={item.text} component={Link} to={item.path}>
          <ListItemIcon>
            {/* {index % 2 === 0 ? <MoveToInbox /> : <Mail />} */}
            {item.icon}
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
