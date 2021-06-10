import {
  firebaseAuth,
  githubAuthProvider,
  googleAuthProvider,
} from './firebase';
import firebase from 'firebase/app';

export interface IFirebaseObj {
  [userProp: string]: any;
}

export interface IUser {
  [userProp: string]: any;
}

export interface IAuthService {
  login(providerName: string): Promise<firebase.auth.UserCredential>;
  logout(): void;
  onAuthChange(onUserChanged: (user: IUser | null) => void): void;
}

class AuthService implements IAuthService {
  login(providerName: string) {
    switch (providerName) {
      case 'Google':
        return firebaseAuth.signInWithPopup(googleAuthProvider);
      case 'Github':
        return firebaseAuth.signInWithPopup(githubAuthProvider);
      default:
        throw new Error('Not supported authprovider name');
    }
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: (user: IUser | null) => void) {
    firebaseAuth.onAuthStateChanged(onUserChanged);
  }
}

export default AuthService;
