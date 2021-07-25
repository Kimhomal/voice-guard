import React, { useEffect, useState } from 'react';
import { InputBase, Paper, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import Youtube from '../../../service/youtube';
import VideoList from '../video_list/video_list';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '40ch',
      marginLeft: '4px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

const VideoMain = ({ youtube }: { youtube: Youtube }) => {
  const classes = useStyles();

  const [videos, setVideos] = useState([]);

  const inputRef = React.useRef<HTMLInputElement>();

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!inputRef.current) {
        return;
      }
      console.log(inputRef.current.value);
    }
  };

  useEffect(() => {
    if (!youtube) {
      return;
    }
    youtube
      .mostPopular()
      .then((items) => setVideos(items))
      .catch((error) => console.log('error', error));
  }, [youtube]);

  return (
    <>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          inputRef={inputRef}
          onKeyPress={onKeyPress}
          placeholder="Search Youtube Content"
          inputProps={{ 'aria-label': 'search youtube content' }}
        />
      </Paper>
      <VideoList videos={videos}></VideoList>
    </>
  );
};

export default VideoMain;
