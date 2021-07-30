import { Grid } from '@material-ui/core';
import { useState } from 'react';
import GuardItem from '../guard_item/guard_item';

const GuardList = () => {
  const [guards, setGuards] = useState([
    { title: '안녕하세요' },
    { title: '누구세요' },
  ]);

  return (
    <Grid container spacing={1}>
      {guards.map((item: any) => (
        <Grid item>
          <GuardItem title={item.title}></GuardItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default GuardList;
