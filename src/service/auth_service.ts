import {
  firebase,
  firebaseAuth,
  githubAuthProvider,
  googleAuthProvider,
} from './firebase';

export interface AuthService {
  login(providerName: string): Promise<firebase.auth.UserCredential>;
  logout(): void;
  onAuthChange(onUserChanged: (user: firebase.User | null) => void): void;
}

class AuthServiceImpl implements AuthService {
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

  onAuthChange(onUserChanged: (user: firebase.User | null) => void) {
    firebaseAuth.onAuthStateChanged(onUserChanged);
  }
}

export default AuthServiceImpl;
