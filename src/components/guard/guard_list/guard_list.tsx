import { useRef } from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { GuardObjectList } from '../../../service/guard_repository';
import GuardItem from '../guard_item/guard_item';
import useScrollBox from '../../common/useScrollBox/useScrollBox';

const useStyles = makeStyles(() =>
  createStyles({
    scrollBox: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
    scrollBoxWrapper: {
      width: '100%',
      height: '100%',
      overflowY: 'hidden',
      overflowX: 'scroll',
      msOverflowStyle: 'none',
      overflow: '-moz-scrollbars-none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    scrollBoxContainer: {
      display: 'inline-flex',
      flexWrap: 'nowrap',
    },
  })
);

const GuardList = ({
  guards,
  player,
  removeGuard,
}: {
  guards: GuardObjectList;
  player: any;
  removeGuard: (id: string) => void;
}) => {
  const classes = useStyles();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useScrollBox(scrollWrapperRef);

  return (
    <div className={classes.scrollBox}>
      <div className={classes.scrollBoxWrapper} ref={scrollWrapperRef}>
        <Grid
          container
          spacing={1}
          className={classes.scrollBoxContainer}
          style={{ pointerEvents: isDragging ? 'none' : undefined }}
        >
          {Object.keys(guards).map((key: string, index: number) => (
            <Grid item key={index}>
              <GuardItem
                guardId={key}
                object={guards[key]}
                player={player}
                removeGuard={removeGuard}
              ></GuardItem>
            </Grid>
          ))}
          {!Object.keys(guards).length && (
            <Grid item>
              <Skeleton variant="rect" width={150} height={152}></Skeleton>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default GuardList;
