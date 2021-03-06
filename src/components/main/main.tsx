import { Box, Chip, Container, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Add as AddIcon,
  Devices as DevicesIcon,
  Mic as MicIcon,
  MoreVert as MoreVertIcon,
  PlayArrow as PlayArrowIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responsive: {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0),
      },
    },
    sectionContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(8, 10),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(8, 2),
      },
    },
    sectionContainerReverse: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(4, 10),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(4, 2),
      },
    },
    sectionBox: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '40%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
    sectionImage: {
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
    },
    image: {
      width: '100%',
      maxWidth: '500px',
    },
    halfImage: {
      width: '50%',
      maxWidth: '250px',
      margin: theme.spacing(1),
    },
  })
);

const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box component="section" sx={{ overflow: 'hidden' }}>
        <Container className={classes.sectionContainer}>
          <Box component="div" className={classes.sectionBox}>
            <Typography variant="h4" gutterBottom>
              <AddIcon />
              ??????????????? ?????????
            </Typography>
            <Typography component="div" variant="body1" gutterBottom>
              <Chip
                size="small"
                icon={<PlayCircleFilledIcon />}
                label="????????? ??????"
                color="primary"
                style={{ marginRight: '4px' }}
                onClick={() => {
                  history.push('/youtube');
                }}
              />
              ???????????? ???????????? ?????????????????? ????????? ?????? ????????? ???????????????
            </Typography>
            <Typography component="div" variant="body1">
              ?????? ????????? ????????? ?????? ???????????? ????????? ??????????????? ???????????????
              ???????????? ????????? ?????????
              <Chip
                variant="outlined"
                size="small"
                label="??????"
                style={{ marginLeft: '4px', marginRight: '4px' }}
              />
              ????????? ???????????????
            </Typography>
          </Box>
          <Box component="div" className={classes.sectionImage}>
            <img
              alt="Create Voice Guard"
              className={classes.image}
              src="/images/ezgif.com-gif-maker.gif"
            ></img>
          </Box>
        </Container>
      </Box>
      <Box component="section" sx={{ overflow: 'hidden' }}>
        <Container
          component={Paper}
          square
          className={classes.sectionContainerReverse}
        >
          <Box
            component="div"
            className={classes.sectionBox}
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Typography variant="h4" gutterBottom>
              <PlayArrowIcon />
              ??????????????? ????????????
            </Typography>
            <Typography component="div" variant="body1" gutterBottom>
              <Chip
                size="small"
                icon={<MicIcon />}
                label="????????? ??????"
                color="primary"
                style={{ marginRight: '4px' }}
                onClick={() => {
                  history.push('/guard');
                }}
              />
              ???????????? ???????????? ????????? ???????????? ???????????????
            </Typography>
            <Typography variant="body1" gutterBottom>
              ????????? ?????? ???????????? <MoreVertIcon fontSize="small" /> ?????????
              ???????????? ????????? ??? ????????????
            </Typography>
          </Box>
          <Box component="div" className={classes.sectionImage}>
            <img
              alt="Play Voice Guard"
              className={classes.image}
              src="/images/voice_guard_play.gif"
            ></img>
          </Box>
        </Container>
      </Box>
      <Box component="section" sx={{ overflow: 'hidden' }}>
        <Container className={classes.sectionContainer}>
          <Box component="div" className={classes.sectionBox}>
            <Typography variant="h4" gutterBottom>
              <DevicesIcon />
              ??????????????? ????????????
            </Typography>
            <Typography variant="body1" gutterBottom>
              ??????????????? ???????????? ????????? ??????????????????????????? ????????? ????????????
              ???????????? ?????? ???????????????
            </Typography>
          </Box>
          <Box component="div" className={classes.sectionImage}>
            <img
              alt="Voice Guard in mobile"
              className={classes.halfImage}
              src="/images/voice-guard-mobile-view.png"
            ></img>
            <img
              alt="Voice Guard in mobile"
              className={classes.halfImage}
              src="/images/voice-guard-mobile-view2.png"
            ></img>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Main;
