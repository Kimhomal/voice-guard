import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { InputBase, Paper, IconButton, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import Youtube from '../../../service/youtube';
import VideoList from '../video_list/video_list';
import GuardRepository, {
  GuardObject,
} from '../../../service/guard_repository';
import VideoDetail from '../video_detail/video_detail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0),
      },
    },
    paper: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '40ch',
      margin: theme.spacing(0.5),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: theme.spacing(0, 0, 0.5, 0),
      },
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
  const { path } = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const storedVideo = localStorage.getItem('video');

  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState(
    storedVideo && JSON.parse(storedVideo)
  );
  const [searchType, setSearchType] = useState<boolean>(false);

  const loader = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>();

  const selectVideo = (video: any) => {
    setSelectedVideo(video);
    localStorage.setItem('video', JSON.stringify(video));
    history.push(`${path}/select`);
  };

  const createGuard = (guard: GuardObject) => {
    guardRepository.saveGuard(guard);
    setSelectedVideo(null);
    history.push(`${path}`);
  };

  const videoSearch = useCallback(
    (query: string) => {
      setSelectedVideo(null);

      history.push(`${path}/search/${query}`, { query: query });

      youtube
        .search(query)
        .then((items) => {
          setVideos(items);
        })
        .catch((error) => console.log('error', error));
    },
    [youtube, history, path]
  );

  const handleObserver = useCallback(
    (e) => {
      const target = e[0];

      if (target.isIntersecting && videos.length) {
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
      youtube
        .mostPopular()
        .then((items) => setVideos(items))
        .catch((error) => console.log('error', error));
    } else {
      videoSearch(value);
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onIconClick = (event: React.MouseEvent<HTMLElement>) => {
    handleSearch();
  };

  const listenHistory = useCallback(
    (location) => {
      const q = (location.state as any)?.query;

      if (!q) {
        inputRef.current && (inputRef.current.value = '');
        setSearchType(false);
        youtube
          .mostPopular()
          .then((items) => setVideos(items))
          .catch((error) => console.log('error', error));
      } else {
        inputRef.current && (inputRef.current.value = q);
        setSearchType(true);
        youtube
          .search(q)
          .then((items) => {
            setVideos(items);
          })
          .catch((error) => console.log('error', error));
      }
    },
    [youtube]
  );

  useEffect(() => {
    if (!youtube) {
      return;
    }

    youtube
      .mostPopular()
      .then((items) => setVideos(items))
      .catch((error) => console.log('error', error));
  }, [youtube]);

  useEffect(() => {
    const unListen = history.listen(listenHistory);

    return unListen;
  }, [history, listenHistory]);

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

  useEffect(() => {
    return () => {
      setVideos([]);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
        {/* <VideoList videos={videos} selectVideo={selectVideo}></VideoList> */}
        <Switch>
          <Route exact path={path}>
            <VideoList videos={videos} selectVideo={selectVideo}></VideoList>
          </Route>
          <Route path={`${path}/select`}>
            <Grid item>
              <VideoDetail
                video={selectedVideo}
                createGuard={createGuard}
              ></VideoDetail>
            </Grid>
            <VideoList videos={videos} selectVideo={selectVideo}></VideoList>
          </Route>
          <Route exact path={`${path}/search/:val`}>
            <VideoList videos={videos} selectVideo={selectVideo}></VideoList>
          </Route>
        </Switch>
      </Grid>
      <div ref={loader}></div>
    </div>
  );
};

export default VideoMain;
