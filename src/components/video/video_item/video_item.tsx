import React from 'react';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitlePopover from '../../common/popover/popover';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    wordBreak: 'break-word',
  },
  image: {
    // width: 128,
    // height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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
  nonepadding: {
    padding: 0,
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

  const onVideoClick = (event: React.MouseEvent<HTMLElement>) => {
    selectVideo(video);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Grid item lg={3} md={3} sm={12} className={classes.root}>
      <Paper className={classes.paper} square onClick={onVideoClick}>
        <Grid container spacing={0}>
          <Grid className={classes.nonepadding} item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                width={video.snippet.thumbnails.medium.width}
                height={video.snippet.thumbnails.medium.height}
                alt="thumbnail"
                src={video.snippet.thumbnails.medium.url}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
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
                <Typography variant="body2">
                  {video.snippet.publishedAt}
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
