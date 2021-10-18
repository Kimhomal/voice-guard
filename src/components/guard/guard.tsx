import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  Restore as RestoreIcon,
  Star as StarIcon,
  PlaylistPlay as PlaylistPlayIcon,
} from '@material-ui/icons';
import GuardList from './guard_list/guard_list';
import { useEffect, useState } from 'react';
import LimitedBackdrop from '../common/loading/loading';
import GuardRepository from '../../service/guard_repository';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionList: {
      position: 'relative',
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
  })
);

const Guard = ({ guardRepository }: { guardRepository: GuardRepository }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  const onPlayerReady = (event: any) => {
    setLoading(false);
  };

  const onPlayerStateChange = (event: any) => {
    // console.log('player state change:' + event.target.getPlayerState());
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      // Youtube 영상 재생 시
    } else if (event.data === (window as any).YT.PlayerState.ENDED) {
      // Youtube 영상 종료 시
    }
  };

  const handleYoutubePlayer = (videoId: string) => {
    const player = new (window as any).YT.Player(videoId, {
      height: '360',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      playerVars: { controls: 0, origin: window.location.href },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    setPlayer(player);
  };

  // youtube iframe API 인스턴스를 리엑트 상태 변수에 저장
  useEffect(() => {
    if (!(window as any).onYTReady) {
      (window as any).onYouTubeIframeAPIReady = () => {
        handleYoutubePlayer('ytplayer');
      };
    } else {
      handleYoutubePlayer('ytplayer');
    }

    return () => {
      setPlayer(null);
    };
  }, []);

  return (
    <>
      <Box display="none">
        <div id="ytplayer"></div>
      </Box>
      <div className={classes.sectionList}>
        <LimitedBackdrop open={loading}>
          <CircularProgress></CircularProgress>
        </LimitedBackdrop>
        <div className={classes.subtitle}>
          <RestoreIcon></RestoreIcon>
          <Typography variant="subtitle1">기록</Typography>
        </div>
        <GuardList player={player}></GuardList>
      </div>
      <Divider className={classes.divider}></Divider>
      <div className={classes.sectionList}>
        <div className={classes.subtitle}>
          <StarIcon></StarIcon>
          <Typography variant="subtitle1">즐겨찾기</Typography>
        </div>
        <Grid container spacing={1}></Grid>
      </div>
      <Divider className={classes.divider}></Divider>
      <div className={classes.sectionList}>
        <div className={classes.subtitle}>
          <PlaylistPlayIcon></PlaylistPlayIcon>
          <Typography variant="subtitle1">재생목록</Typography>
        </div>
        <Grid container spacing={1}></Grid>
      </div>
    </>
  );
};
export default Guard;
