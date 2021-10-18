import { Backdrop } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

const LimitedBackdrop = withStyles((theme: Theme) => ({
  root: { position: 'absolute', zIndex: theme.zIndex.drawer + 1 },
}))(Backdrop);

export default LimitedBackdrop;
