import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AddCircle as AddCircleIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
} from '@material-ui/icons';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    bottomNav: {
      '& .Mui-selected': {
        color: indigo[300],
      },
    },
  })
);

const BottomNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState('/guard');

  const handleChange = (e: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  };

  const listenHistory = (location: any) => {
    if (location) {
      setValue(location.pathname);
    }
  };

  useEffect(() => {
    if (history.location) {
      setValue(history.location.pathname);
    }

    const unListen = history.listen(listenHistory);

    return unListen;
  }, [history]);

  return (
    <AppBar
      component="footer"
      position="fixed"
      color="primary"
      className={classes.appBar}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          label="재생 목록"
          value="/guard"
          icon={<PlayCircleFilledIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="가드 만들기"
          value="/youtube"
          icon={<AddCircleIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </AppBar>
  );
};

export default BottomNav;
