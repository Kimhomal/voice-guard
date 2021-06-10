import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { IAuthService, IFirebaseObj, IUser } from '../../service/auth_service';
import styles from './signin.module.css';

const Signin = ({ authService }: { authService: IAuthService }) => {
  const history = useHistory();

  const goToGuard = (userId: string) => {
    history.push({
      pathname: '/guard',
      state: { id: userId },
    });
  };

  const onLogin = (name: string) => {
    authService.login(name).then((result: IFirebaseObj) => {
      const user = result.user;
      console.log(user);
      goToGuard(user.uid);
    });
  };

  useEffect(() => {
    authService.onAuthChange((user: IUser | null) => {
      user && goToGuard(user.uid);
    });
  });

  return (
    <div className={styles.root}>
      <Container className={styles.wrap} maxWidth="xs">
        <header className={styles.header}>
          <Typography variant="h4">Voice Guard</Typography>
          <Typography variant="h6">Sign in</Typography>
        </header>
        <List className={styles.list}>
          <ListItem
            button
            onClick={() => {
              onLogin('Google');
            }}
          >
            <ListItemAvatar>
              <Avatar>G</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Google 아이디로 로그인"></ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Sign in">
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default Signin;
