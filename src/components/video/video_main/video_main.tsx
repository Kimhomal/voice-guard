import React, { useEffect, useState, useCallback, useRef } from 'react';
import { InputBase, Paper, IconButton, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import Youtube from '../../../service/youtube';
import VideoList from '../video_list/video_list';
import VideoDetail from '../video_detail/video_detail';
import GuardRepository, {
  GuardObject,
} from '../../../service/guard_repository';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '40ch',
      margin: theme.spacing(0.5),
    },
    input: {
      margin: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      // padding: 10,
    },
  })
);

const VideoMain = ({
  youtube,
  guardRepository,
}: {
  youtube: Youtube;
  guardRepository: GuardRepository;
}) => {
  const classes = useStyles();

  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchType, setSearchType] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement>(null);

  const selectVideo = (video: any) => {
    setSelectedVideo(video);
  };

  const inputRef = React.useRef<HTMLInputElement>();

  const videoSearch = useCallback(
    (query: string) => {
      setSelectedVideo(null);

      youtube
        .search(query)
        .then((items) => setVideos(items))
        .catch((error) => console.log('error', error));
    },
    [youtube]
  );

  const handleObserver = useCallback(
    (e) => {
      console.log(videos);
      const target = e[0];
      if (target.isIntersecting && videos.length) {
        console.log(searchType);
        if (searchType) {
          youtube
            .search('', true)
            .then((items) => setVideos([...videos, ...items]))
            .catch((error) => console.log('error', error));
        } else {
          youtube
            .mostPopular(true)
            .then((items) => setVideos([...videos, ...items]))
            .catch((error) => console.log('error', error));
        }
      }
    },
    [youtube, videos, searchType]
  );

  const handleSearch = () => {
    // 영상 검색
    if (!inputRef.current) return;

    const value = inputRef.current.value;

    if (!value) {
      setSearchType(false);
      youtube
        .mostPopular()
        .then((items) => setVideos(items))
        .catch((error) => console.log('error', error));

      return;
    } else {
      setSearchType(true);
    }
    videoSearch(value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onIconClick = (event: React.MouseEvent<HTMLElement>) => {
    handleSearch();
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

  const createGuard = (guard: GuardObject) => {
    guardRepository.saveGuard(guard);
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => observer && observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <Paper className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={onIconClick}
        >
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
      <Grid>
        {selectedVideo && (
          <Grid item>
            <VideoDetail
              video={selectedVideo}
              createGuard={createGuard}
            ></VideoDetail>
          </Grid>
        )}
        <VideoList videos={videos} selectVideo={selectVideo}></VideoList>
      </Grid>
      <div ref={loader}></div>
    </>
  );
};

export default VideoMain;
