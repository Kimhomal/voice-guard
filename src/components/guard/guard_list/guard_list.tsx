import { Grid } from '@material-ui/core';
import { useState } from 'react';
import GuardItem from '../guard_item/guard_item';

const GuardList = ({ player }: { player: any }) => {
  const [guards, setGuards] = useState([
    {
      videoId: 'rkdpe_vg_Fk',
      title: '아 뭐하세요',
      start: 6,
      end: 9,
    },
    { videoId: 'rkdpe_vg_Fk', title: '누구세요', start: 3, end: 6 },
  ]);
  // const [player, setPlayer] = useState<any>(null);
  // const [progress, setProgress] = useState<YoutubeProgress>({
  //   start: 0,
  //   end: 5,
  //   current: 3,
  // });

  return (
    <Grid container spacing={1}>
      {guards.map((item: any, index: number) => (
        <Grid item key={index}>
          <GuardItem object={item} player={player}></GuardItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default GuardList;
