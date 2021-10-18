import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MoreVert as MoreVertIcon,
  PlayArrow as PlayArrowIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { GuardObject } from '../../../service/guard_repository';
import LimitedBackdrop from '../../common/loading/loading';

type GuardItemProp = {
  object: GuardObject;
  player: any;
};

const useStyles = makeStyles({
  root: {
    width: 150,
  },
  title: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    height: '3.543rem',
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

const GuardItem = ({ object, player }: GuardItemProp) => {
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState(false);
  // const [progressOpen, setProgressOpen] = useState(false);

  // const normalise = () => {
  //   return (
  //     ((progress.current - progress.start) * 100) /
  //     (progress.end - progress.start)
  //   );
  // };

  const handleGuardStart = (event: React.MouseEvent<HTMLElement>) => {
    // setProgressOpen(true);
    if (!player) return;

    player.loadVideoById({
      videoId: object.videoId,
      startSeconds: object.start,
      endSeconds: object.end,
      suggestedQuality: 'default',
    });
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
          {/* <Box display="none">
            <iframe
              id={`${title}-ytplayer`}
              src="https://www.youtube.com/embed/M7lc1UVf-VE"
            ></iframe>
            <div id={videoId}></div>
          </Box> */}
          <Typography className={classes.title} variant="h5">
            {object.title}
          </Typography>
        </CardContent>
        {/* <LinearProgress
          className={clsx(classes.progress, {
            [classes.progressOpen]: progressOpen,
            [classes.progressClose]: !progressOpen,
          })}
          color="secondary"
          variant="determinate"
          value={0}
        ></LinearProgress> */}
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
