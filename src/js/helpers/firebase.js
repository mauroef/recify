import firebase from 'firebase';

import config from '../config/firebase.config';

export default class Firebase {
  constructor() {
    this.instace = firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.db = firebase.firestore();
    this.func = firebase.functions();
  }

  logIn() {
    return this.auth
      .signInWithPopup(this.provider)
      .then(function(result) {
        console.log('token', result.credential.accessToken);
        console.log('user', result.user);
      })
      .catch(function(error) {
        console.log(`error on login. code: ${error.code}. ${error.message}`);
      });
  }

  logout() {
    return this.auth
      .signOut()
      .then(() => {
        console.log('deslogueado.');
      })
      .catch(() => {
        console.log('error al desloguear');
      });
  }
}
