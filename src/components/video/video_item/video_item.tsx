import React from 'react';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitlePopover from '../../popover/popover';

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

const VideoItem = (props?: any) => {
  const classes = useStyles();

  // const onVideoClick = (event: React.MouseEvent<HTMLElement>) => {
  //   props.onVideoClick(props.video);
  // };

  return (
    <Grid item lg={3} md={3} sm={12} className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container spacing={0}>
          <Grid className={classes.nonepadding} item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                width={props.video.snippet.thumbnails.medium.width}
                height={props.video.snippet.thumbnails.medium.height}
                alt="thumbnail"
                src={props.video.snippet.thumbnails.medium.url}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                {/* <Typography className={classes.title} variant="subtitle1">
                  {props.video.snippet.title}
                </Typography> */}
                <TitlePopover
                  title={props.video.snippet.title}
                  id={props.video.id}
                  className={classes.title}
                ></TitlePopover>
                {/* <Typography
                  className={classes.subtitle}
                  variant="body2"
                  gutterBottom
                >
                  {props.video.snippet.channelTitle}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                >
                  {props.video.snippet.description}
                </Typography> */}
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {props.video.snippet.publishedAt}
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
