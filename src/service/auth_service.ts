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
  getCurrentUser(): firebase.User | null;
  redirect(): void;
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
    return firebaseAuth.onAuthStateChanged(onUserChanged);
  }

  getCurrentUser() {
    return firebaseAuth.currentUser;
  }

  redirect() {
    firebaseAuth.signInWithRedirect(googleAuthProvider);
  }

  // getAccessToken() {
  //   firebaseAuth
  //     .getRedirectResult()
  //     .then((result) => {
  //       console.log(result);
  //       if (result.credential) {
  //         const credential: firebase.auth.OAuthCredential = result.credential;

  //         const token = credential.accessToken;
  //         console.log(`access token: ${token}`);
  //       }
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.email;
  //       const credential = error.credential;
  //       console.log(`${errorCode} ${errorMessage} ${email} ${credential}`);
  //     });
  // }
}

export default AuthServiceImpl;
