import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Pause as PauseIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { GuardObject } from '../../../service/guard_repository';
import LimitedBackdrop from '../../common/loading/loading';

type GuardItemProp = {
  guardId: string;
  object: GuardObject;
  playing: string | null;
  handleGuard: (guardId: string, object: GuardObject) => void;
  removeGuard: (id: string) => void;
};

const useStyles = makeStyles({
  root: {
    width: 150,
  },
  title: {
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    height: '3.8rem',
    lineClamp: 2,
  },
  rightButton: {
    marginLeft: 'auto',
  },
  progress: {
    width: '100%',
    position: 'absolute',
  },
  progressOpen: {
    display: 'block',
  },
  progressClose: {
    display: 'none',
  },
});

const GuardItem = ({
  guardId,
  object,
  playing,
  handleGuard,
  removeGuard,
}: GuardItemProp) => {
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const [progressOpen, setProgressOpen] = useState(false);

  // const normalise = () => {
  //   return (
  //     ((progress.current - progress.start) * 100) /
  //     (progress.end - progress.start)
  //   );
  // };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    removeGuard(guardId);
    setAnchorEl(null);
  };

  const handleGuardStart = (event: React.MouseEvent<HTMLElement>) => {
    // setProgressOpen(true);
    setBackdrop(true);
    handleGuard(guardId, object);
  };

  useEffect(() => {
    playing === guardId ? setBackdrop(true) : setBackdrop(false);
  }, [playing]);

  return (
    <Card className={classes.root}>
      <CardActionArea
        // onMouseEnter={() => setBackdrop(true)}
        // onMouseLeave={() => setBackdrop(false)}
        onClick={handleGuardStart}
      >
        <LimitedBackdrop open={backdrop}>
          <PauseIcon></PauseIcon>
        </LimitedBackdrop>
        <CardContent>
          {/* <Box display="none">
            <iframe
              id={`${title}-ytplayer`}
              src="https://www.youtube.com/embed/M7lc1UVf-VE"
            ></iframe>
            <div id={videoId}></div>
          </Box> */}
          <Typography className={classes.title} variant="h6">
            {object.title}
          </Typography>
        </CardContent>
        {/* <LinearProgress
          className={clsx(classes.progress, {
            [classes.progressOpen]: progressOpen,
            [classes.progressClose]: !progressOpen,
          })}
          color="secondary"
          variant="determinate"
          value={0}
        ></LinearProgress> */}
      </CardActionArea>
      <CardActions>
        <Tooltip title="수정">
          <IconButton
            className={classes.rightButton}
            aria-label="modify guard item"
            onClick={handleMenuClick}
          >
            <MoreVertIcon fontSize="small"></MoreVertIcon>
          </IconButton>
        </Tooltip>
        <Menu
          id="guard-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onSubmit}>
            <ListItemIcon>
              <DeleteIcon></DeleteIcon>
            </ListItemIcon>
            <ListItemText>삭제</ListItemText>
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default GuardItem;
