import { Box, Chip, Container, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Add as AddIcon,
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
              보이스가드 만들기
            </Typography>
            <Typography component="div" variant="body1" gutterBottom>
              <Chip
                size="small"
                icon={<PlayCircleFilledIcon />}
                label="유튜브 검색"
                color="primary"
                style={{ marginRight: '4px' }}
                onClick={() => {
                  history.push('/youtube');
                }}
              />
              페이지로 이동하여 보이스가드를 만들고 싶은 영상을 선택합니다
            </Typography>
            <Typography component="div" variant="body1">
              클립 만들기 기능을 통해 영상에서 원하는 시작시간과 정지시간을
              지정하고 제목을 정하여
              <Chip
                variant="outlined"
                size="small"
                label="저장"
                style={{ marginLeft: '4px', marginRight: '4px' }}
              />
              버튼을 클릭합니다
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
              보이스가드 재생하기
            </Typography>
            <Typography component="div" variant="body1" gutterBottom>
              <Chip
                size="small"
                icon={<MicIcon />}
                label="보이스 가드"
                color="primary"
                style={{ marginRight: '4px' }}
                onClick={() => {
                  history.push('/guard');
                }}
              />
              페이지로 이동하여 카드를 클릭하여 재생합니다
            </Typography>
            <Typography variant="body1" gutterBottom>
              보이스 가드 카드에서 <MoreVertIcon fontSize="small" /> 버튼을
              클릭하여 삭제할 수 있습니다
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
    </>
  );
};

export default Main;
