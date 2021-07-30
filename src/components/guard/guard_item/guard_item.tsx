import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Backdrop,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  MoreVert as MoreVertIcon,
  PlayArrow as PlayArrowIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: 150,
  },
  title: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    height: '3.46rem',
    lineClamp: 2,
  },
  rightButton: {
    marginLeft: 'auto',
  },
  progress: {
    width: '100%',
    position: 'absolute',
  },
  progressOpen: {
    display: 'block',
  },
  progressClose: {
    display: 'none',
  },
});

const LimitedBackdrop = withStyles((theme: Theme) => ({
  root: { position: 'absolute', zIndex: theme.zIndex.drawer + 1 },
}))(Backdrop);

const GuardItem = ({ title }: { title: string }) => {
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGuardStart = (event: React.MouseEvent<HTMLElement>) => {
    setProgressOpen(true);
  };

  const handleGuardEnd = (event: React.MouseEvent<HTMLElement>) => {
    setProgressOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        onMouseEnter={() => setBackdrop(true)}
        onMouseLeave={() => setBackdrop(false)}
      >
        <LimitedBackdrop open={backdrop} onClick={handleGuardStart}>
          <PlayArrowIcon></PlayArrowIcon>
        </LimitedBackdrop>
        <CardContent>
          <Typography className={classes.title} variant="h5">
            {title}
          </Typography>
        </CardContent>
        <LinearProgress
          className={clsx(classes.progress, {
            [classes.progressOpen]: progressOpen,
            [classes.progressClose]: !progressOpen,
          })}
          variant="determinate"
          value={progress}
        ></LinearProgress>
      </CardActionArea>
      <CardActions>
        <Tooltip title="수정">
          <IconButton
            className={classes.rightButton}
            aria-label="modify guard item"
          >
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default GuardItem;
