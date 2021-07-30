import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';
import {
  Restore as RestoreIcon,
  Star as StarIcon,
  PlaylistPlay as PlaylistPlayIcon,
} from '@material-ui/icons';
import GuardList from './guard_list/guard_list';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionList: {},
    divider: {
      margin: theme.spacing(2, 0),
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
  })
);
const Guard = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionList}>
        <div className={classes.subtitle}>
          <RestoreIcon></RestoreIcon>
          <Typography variant="subtitle1">기록</Typography>
        </div>
        <GuardList></GuardList>
      </div>
      <Divider className={classes.divider}></Divider>
      <div className={classes.sectionList}>
        <div className={classes.subtitle}>
          <StarIcon></StarIcon>
          <Typography variant="subtitle1">즐겨찾기</Typography>
        </div>
        <Grid container spacing={1}></Grid>
      </div>
      <Divider className={classes.divider}></Divider>
      <div className={classes.sectionList}>
        <div className={classes.subtitle}>
          <PlaylistPlayIcon></PlaylistPlayIcon>
          <Typography variant="subtitle1">재생목록</Typography>
        </div>
        <Grid container spacing={1}></Grid>
      </div>
    </>
  );
};
export default Guard;
