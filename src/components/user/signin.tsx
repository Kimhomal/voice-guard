import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { AuthService } from '../../service/auth_service';
import { firebase } from '../../service/firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      padding: theme.spacing(0, 1.2),
      /* background: linear-gradient(45deg, #283593 30%, #9fa8da 90%); */
    },
    wrap: {
      margin: 'auto',
      paddingTop: '1.5em',
      paddingBottom: '1.5em',
      borderRadius: '5px',
      backgroundColor: indigo[800],
      boxShadow: '0px 0px 10px 1px makerBlackShadow',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);

const Signin = ({ authService }: { authService: AuthService }) => {
  const history = useHistory();
  const classes = useStyles();

  const goToGuard = (userId: string) => {
    history.push({
      pathname: '/guard',
      state: { id: userId },
    });
  };

  const onLogin = (name: string) => {
    authService.login(name).then((result: firebase.auth.UserCredential) => {
      const user: firebase.User | null = result.user;
      goToGuard(user!.uid);
    });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToGuard(user.uid);
    });
  });

  return (
    <div className={classes.root}>
      <Container className={classes.wrap} maxWidth="xs">
        <header className={classes.header}>
          <Typography variant="h4">Voice Guard</Typography>
          <Typography variant="h6">Sign in</Typography>
        </header>
        <List>
          <ListItem
            button
            onClick={() => {
              onLogin('Google');
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ color: 'white', backgroundColor: indigo[500] }}>
                G
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Google 아이디로 로그인"></ListItemText>
            {/* <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Sign in">
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default Signin;
