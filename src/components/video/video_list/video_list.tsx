import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../video_item/video_item';

const useStyles = makeStyles((theme) => ({
  container: { padding: 0 },
  root: { padding: 0 },
}));

const VideoList = ({
  videos,
  selectVideo,
}: {
  videos: any;
  selectVideo: (video: any) => void;
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {videos.map((item: any, index: number) => (
        // <AlignItemsList key={item.id} item={item}></AlignItemsList>
        <VideoItem
          key={item.id + index}
          video={item}
          selectVideo={selectVideo}
        ></VideoItem>
      ))}
    </Grid>
  );
};

export default VideoList;
