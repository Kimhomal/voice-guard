import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitlePopover from '../../common/popover/popover';
import moment from 'moment';

moment.updateLocale('kr', {
  relativeTime: {
    future: 'in %s',
    past: '%s 전',
    s: '1초',
    ss: '%d초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    w: '1주',
    ww: '%d주',
    M: '1개월',
    MM: '%d개월',
    y: '1년',
    yy: '%d년',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  paper: {
    // padding: theme.spacing(0),
    margin: 'auto',
    wordBreak: 'break-word',
    backgroundColor: 'inherit',
    cursor: 'pointer',
  },
  image: {
    // width: 128,
    // height: 128,
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    // },
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  titleWrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 1.5, 2, 1.5),
    },
  },
  title: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    height: '3.11rem',
    lineClamp: 2,
  },
  subtitle: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    lineClamp: 1,
  },
  description: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    height: '4rem',

    lineClamp: 3,
  },
}));

const VideoItem = ({
  video,
  selectVideo,
}: {
  video: any;
  selectVideo: (video: any) => void;
}) => {
  const classes = useStyles();
  const itemRef = useRef<HTMLElement>();

  const [size, setSize] = useState({
    width: 320,
    height: 180,
  });

  const onVideoClick = (event: React.MouseEvent<HTMLElement>) => {
    selectVideo(video);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleImageResize = useCallback(() => {
    const thumb = video.snippet.thumbnails.medium;
    const width = itemRef.current?.clientWidth;
    if (!width) return null;
    const height = (thumb.height * width) / thumb.width;

    setSize({ width: width, height: height });
  }, [video]);

  useEffect(() => {
    window.addEventListener('resize', handleImageResize);
    handleImageResize();

    return () => window.removeEventListener('resize', handleImageResize);
  }, [handleImageResize]);

  return (
    <Grid item xl={2} lg={3} md={4} sm={6} xs={12} className={classes.root}>
      <Paper
        className={classes.paper}
        square
        elevation={0}
        onClick={onVideoClick}
        ref={itemRef}
      >
        <Grid container spacing={0}>
          <Grid item container>
            {/* <ButtonBase className={classes.image}> */}
            <img
              className={classes.img}
              width={size.width}
              height={size.height}
              alt="thumbnail"
              src={video.snippet.thumbnails.medium.url}
            />
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container className={classes.titleWrapper}>
            <Grid item xs container direction="column">
              <Grid item xs>
                {/* <Typography className={classes.title} variant="subtitle1">
                  {video.snippet.title}
                </Typography> */}
                <TitlePopover
                  title={video.snippet.title}
                  id={video.id}
                  className={classes.title}
                ></TitlePopover>
                {/* <Typography
                  className={classes.subtitle}
                  variant="body2"
                  gutterBottom
                >
                  {video.snippet.channelTitle}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                >
                  {video.snippet.description}
                </Typography> */}
              </Grid>
              <Grid item>
                <Typography variant="caption" color="textSecondary">
                  {moment(video.snippet.publishedAt).locale('kr').fromNow()}
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default VideoItem;
