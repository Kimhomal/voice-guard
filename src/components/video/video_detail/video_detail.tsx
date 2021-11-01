import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Slider,
  Button,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  withStyles,
  useTheme,
} from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import moment from 'moment';
import 'moment-duration-format';
import React, { useEffect, useRef, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { GuardObject } from '../../../service/guard_repository';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  fieldWrap: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  mobileTitle: {
    flexGrow: 1,
  },
  mobileVideoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.26%',
    position: 'relative',
    height: 0,
    '& iframe': {
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
}));

const CustomSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
})(Slider);

interface TextMaskTimeProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskTime(props: TextMaskTimeProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    ></MaskedInput>
  );
}

function TextMaskTimeHour(props: TextMaskTimeProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    ></MaskedInput>
  );
}

function timeToDuration(time: string) {
  return moment(time, ['H:mm:ss', 'mm:ss']).diff(moment('0', 's'), 'seconds');
}

function durationFormat(
  duration: string | number,
  format: 'default' | 'seconds' = 'default'
) {
  if (typeof duration === 'string') {
    const hour = moment.duration(duration).hours();

    switch (format) {
      case 'default':
        if (hour) {
          return moment.duration(duration).format('H:mm:ss');
        } else {
          return moment.duration(duration).format('mm:ss');
        }
      case 'seconds':
        return moment.duration(duration).asSeconds();
    }
  } else if (typeof duration === 'number') {
    return moment
      .duration(duration, 'seconds')
      .format('H:mm:ss')
      .padStart(5, '00:00');
  }
}

const VideoDetail = ({
  video,
  createGuard,
}: {
  video: any;
  createGuard: (guard: GuardObject) => void;
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('xs'));

  const clipTitleRef = useRef<HTMLInputElement>();
  const clipStartRef = useRef<HTMLInputElement>();
  const clipEndRef = useRef<HTMLInputElement>();

  const clipMax = 60;
  const clipDefault = 10;
  const [player, setPlayer] = useState<any>(null);
  const [saveActive, setSaveActive] = useState(false);
  const duration = durationFormat(
    video.contentDetails.duration,
    'seconds'
  ) as number;
  const [clip, setClip] = useState({
    start: 0,
    end: 10 > duration ? duration : 10,
  });

  const handleResize = () => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return;
    const width = iframe.clientWidth;
    const height = width ? width / 1.77 : undefined;

    if (height) {
      iframe.height = Math.floor(height).toString();
    }
  };

  // const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = durationFormat(event.target.value, 'seconds');
  //   setClip({
  //     ...clip,
  //     [event.target.name]: value,
  //   });
  // };

  // Text field focus event
  // const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  //   // 입력창 Focus in 실행 함수
  // };

  // Text field blur event
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // 입력창 Focus out 시 실행 함수
    let value = timeToDuration(event.target.value);

    let start = 0;
    let end = 0;

    if (event.target.name === 'start') {
      start =
        value >= duration
          ? duration - clipDefault < 0
            ? 0
            : duration - clipDefault
          : value;
      end =
        start >= clip.end
          ? start + clipDefault > duration
            ? duration
            : start + clipDefault
          : clip.end;
    } else {
      start =
        value <= clip.start
          ? value - clipDefault < 0
            ? 0
            : value - clipDefault
          : clip.start;
      end = value > duration ? duration : value;
    }

    setClip({
      ...clip,
      start: start,
      end: end,
    });
  };

  const onPlayerReady = (event: any) => {
    breakpoint && handleResize();
    event.target.playVideo();
  };

  const handleYoutubePlayer = (video: any) => {
    const iframe = new (window as any).YT.Player('youtubeIframe', {
      height: '500',
      width: '100%',
      videoId: video.id,
      playerVars: {
        fs: 0,
        controls: 0,
        disablekb: 1,
        start: clip.start,
        end: clip.end,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: (event: any) => {
          // console.log('player state change:' + event.target.getPlayerState());
          if (event.data === (window as any).YT.PlayerState.PLAYING) {
            // Youtube 영상 재생 시
          } else if (event.data === (window as any).YT.PlayerState.ENDED) {
            // Youtube 영상 종료 시
            event.target.seekTo(event.target.customVars.start);
          } else if (event.data === (window as any).YT.PlayerState.BUFFERING) {
            // Youtube 영상 버퍼링 중
          } else if (event.data === (window as any).YT.PlayerState.UNSTARTED) {
            // Youtube 영상 시작되지 않음
          }
        },
      },
    });

    iframe.customVars = { ...clip };
    setPlayer(iframe);
  };

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    createGuard({
      videoId: video.id,
      title: clipTitleRef.current?.value || '',
      start: clip.start,
      end: clip.end,
    });
  };

  useEffect(() => {
    breakpoint && window.addEventListener('resize', handleResize);

    if (!player) {
      if (!(window as any).onYTReady) {
        (window as any).onYouTubeIframeAPIReady = () => {
          handleYoutubePlayer(video);
        };
      } else {
        handleYoutubePlayer(video);
      }
    }

    setClip({
      start: 0,
      end: 10 > duration ? duration : 10,
    });

    return () => window.removeEventListener('resize', handleResize);
  }, [video]);

  useEffect(() => {
    if (player !== null) {
      if (player.loadVideoById) {
        player.loadVideoById({
          videoId: video.id,
          startSeconds: clip.start,
          endSeconds: clip.end,
        });
        player.customVars = { ...clip };
      }
    }
  }, [player, clip, video]);

  const renderClipCard = (
    <Card style={{ marginLeft: breakpoint ? 0 : 8 }}>
      {!breakpoint && (
        <CardHeader
          title={'클립 만들기'}
          action={
            <IconButton>
              <CloseIcon></CloseIcon>
            </IconButton>
          }
        />
      )}
      <CardContent>
        <Grid container className={classes.fieldWrap}>
          <TextField
            inputRef={clipTitleRef}
            id="clipTitleField"
            label="제목(필수)"
            onChange={() => {
              setSaveActive(!!clipTitleRef.current?.value);
            }}
          ></TextField>
        </Grid>
        <Grid container className={classes.fieldWrap}>
          <Grid item xs>
            <TextField
              inputRef={clipStartRef}
              id="clipStartField"
              label="Start"
              variant="outlined"
              name="start"
              // onChange={handleValueChange}
              // onFocus={handleFocus}
              onBlur={handleBlur}
              InputProps={{
                inputComponent: moment.duration(duration, 'seconds').hours()
                  ? (TextMaskTimeHour as any)
                  : (TextMaskTime as any),
              }}
              value={durationFormat(clip.start)}
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            -
          </Grid>
          <Grid item xs>
            <TextField
              inputRef={clipEndRef}
              id="clipEndField"
              label="End"
              variant="outlined"
              name="end"
              // onChange={handleValueChange}
              // onFocus={handleFocus}
              onBlur={handleBlur}
              InputProps={{
                inputComponent: moment.duration(duration, 'seconds').hours()
                  ? (TextMaskTimeHour as any)
                  : (TextMaskTime as any),
              }}
              value={durationFormat(clip.end)}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container className={classes.fieldWrap}>
          <CustomSlider
            aria-labelledby="range-slider"
            value={[clip.start, clip.end]}
            max={duration}
            min={0}
            onChange={(event: any, value: number | number[]) => {
              if (value instanceof Array) {
                if (value[1] - value[0] > clipMax) {
                  if (clip.start === value[0]) {
                    value[0] = value[1] - clipMax;
                  } else {
                    value[1] = value[0] + clipMax;
                  }
                }

                setClip({
                  start: value[0],
                  end: value[1],
                });
              }
            }}
          ></CustomSlider>
        </Grid>
        <Grid>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              disabled={!saveActive}
              onClick={onSubmit}
            >
              저장
            </Button>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
  const renderMobile = (
    <Grid container>
      <Grid item className={classes.mobileVideoResponsive} xs={12}>
        <div id="youtubeIframe"></div>
      </Grid>
      <Grid item xs={12}>
        {renderClipCard}
      </Grid>
    </Grid>
    // <Dialog fullScreen open={breakpoint} onClose={onMobileClose}>
    //   <AppBar>
    //     <Toolbar>
    //       <Typography variant="h6" className={classes.mobileTitle}>
    //         클립 만들기
    //       </Typography>
    //       <IconButton onClick={onMobileClose}>
    //         <CloseIcon />
    //       </IconButton>
    //     </Toolbar>
    //   </AppBar>
    //   <DialogContent>
    //     <div className={classes.mobileVideoResponsive}>
    //       <div id="youtubeIframe"></div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );

  const renderDesktop = (
    <Grid container className={classes.root}>
      <Grid item md sm xs>
        {/* <iframe
          width="100%"
          height="500"
          title="youtube video player"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&start=${clip.start}&end=${clip.end}&loop=1&playlist=${video.id}`}
          frameBorder="0"
          allowFullScreen
        ></iframe> */}
        {/* {!breakpoint && <div id="youtubeIframe"></div>} */}
        <div id="youtubeIframe"></div>
        <h2>{video.snippet.title}</h2>
        <h3>{video.snippet.channelTitle}</h3>
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        {renderClipCard}
      </Grid>
    </Grid>
  );

  return <>{breakpoint ? renderMobile : renderDesktop}</>;
};

export default VideoDetail;
