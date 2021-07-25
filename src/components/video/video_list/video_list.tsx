import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../video_item/video_item';

const useStyles = makeStyles((theme) => ({
  container: { padding: 0 },
  root: { padding: 0 },
}));

const VideoList = ({ videos }: { videos: any }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {videos.map((item: any) => (
        // <AlignItemsList key={item.id} item={item}></AlignItemsList>
        <VideoItem key={item.id} video={item}></VideoItem>
      ))}
    </Grid>
  );
};

export default VideoList;
