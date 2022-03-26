import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Restore as RestoreIcon } from '@material-ui/icons';
import GuardList from './guard_list/guard_list';
import { useCallback, useEffect, useState } from 'react';
import LimitedBackdrop from '../common/loading/loading';
import GuardRepository, {
  GuardObject,
  GuardObjectList,
} from '../../service/guard_repository';
import { firebaseAuth } from '../../service/firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
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
    iframe: {
      opacity: 0,
    },
  })
);

const Guard = ({ guardRepository }: { guardRepository: GuardRepository }) => {
  const classes = useStyles();

  const [userId, setUserId] = useState(
    firebaseAuth.currentUser && firebaseAuth.currentUser.uid
  );
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<null | string>(null);
  const [player, setPlayer] = useState<any>(null);
  const [guards, setGuards] = useState<GuardObjectList>({});

  const onPlayerReady = (event: any) => {
    // event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    // console.log('player state change:' + event.target.getPlayerState());
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      // Youtube 영상 재생 시
    } else if (event.data === (window as any).YT.PlayerState.ENDED) {
      // Youtube 영상 종료 시
      setPlaying(null);
    }
  };

  const handleYoutubePlayer = (iframeId: string) => {
    const playerInst = new (window as any).YT.Player(iframeId, {
      height: '1',
      width: '1',
      videoId: 'M7lc1UVf-VE',
      playerVars: { fs: 0, controls: 0 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    setPlayer(playerInst);
    return playerInst;
  };

  const handleGuard = useCallback(
    (guardId: string, object: GuardObject) => {
      if (!player) return;

      if (
        player.getPlayerState() === (window as any).YT.PlayerState.PLAYING &&
        playing === guardId
      ) {
        player.stopVideo();
        setPlaying(null);
        return;
      }

      player.loadVideoById({
        videoId: object.videoId,
        startSeconds: object.start,
        endSeconds: object.end,
        suggestedQuality: 'default',
      });
      setPlaying(guardId);
    },
    [playing, player]
  );

  const removeGuard = (id: string) => {
    guardRepository.removeGuard(id);
  };

  // youtube iframe API 인스턴스를 리엑트 상태 변수에 저장
  useEffect(() => {
    let playerInst: any = null;
    if (!(window as any).onYTReady) {
      (window as any).onYouTubeIframeAPIReady = () => {
        playerInst = handleYoutubePlayer('ytplayer');
      };
    } else {
      playerInst = handleYoutubePlayer('ytplayer');
    }

    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      user && setUserId(user.uid);
    });

    return () => {
      playerInst.destroy();
      setPlayer(null);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const stopSync = guardRepository.syncGuard((result) => {
      setGuards(result ? result : {});
      setLoading(false);
    });

    return () => stopSync();
  }, [userId, guardRepository]);

  return (
    <div className={classes.root}>
      <div className={classes.sectionList}>
        <LimitedBackdrop open={loading}>
          <CircularProgress></CircularProgress>
        </LimitedBackdrop>
        <div className={classes.subtitle}>
          <RestoreIcon></RestoreIcon>
          <Typography variant="subtitle1">기록</Typography>
        </div>
        <GuardList
          guards={guards}
          playing={playing}
          handleGuard={handleGuard}
          removeGuard={removeGuard}
        ></GuardList>
      </div>
      {/* <Divider className={classes.divider}></Divider>
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
      </div> */}
      <Box className={classes.iframe}>
        <div id="ytplayer"></div>
      </Box>
    </div>
  );
};
export default Guard;
