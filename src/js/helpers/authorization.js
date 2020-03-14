export default class Authorization {
  constructor(auth, provider) {
    this.auth = auth;
    this.provider = provider;
    // const db = firebase.firestore();
    // const func = firebase.functions();
  }

  logIn() {
    return this.auth
      .signInWithPopup(this.provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log('token', token);
        console.log('user', user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('ErrorCode', errorCode);
        console.log('Email', email);
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

  getUserData() {
    const user = this.auth.currentUser;

    if (user != null) {
      const data = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid
      };
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      console.log(data);
    } else {
      console.log('there is not user logged.');
    }
  }
}
