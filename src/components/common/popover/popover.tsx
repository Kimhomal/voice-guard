import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Popper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const TitlePopover = ({
  title,
  id,
  className,
}: {
  title: string;
  id: string;
  className: string;
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? id : undefined}
        aria-haspopup="true"
        className={className}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="body1"
      >
        {title}
      </Typography>
      <Popper
        id={id}
        className={classes.popover}
        // classes={{
        //   paper: classes.paper,
        // }}
        open={open}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
        // onClose={handlePopoverClose}
        // disableRestoreFocus
      >
        <div className={classes.paper}>
          <Typography variant="caption">{title}</Typography>
        </div>
      </Popper>
    </div>
  );
};

export default TitlePopover;
