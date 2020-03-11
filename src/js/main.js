import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import { renderTable } from './helpers/render';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';
import Footer from './helpers/footer';

import firebase from 'firebase';
import { config } from './config/firebase.config';

const authProviderHandler = (signupBtn, loginBtn, logoutBtn) => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  // const db = firebase.firestore();
  // const func = firebase.functions();

  signupBtn.addEventListener('click', signup);
  loginBtn.addEventListener('click', getUserData);
  logoutBtn.addEventListener('click', logout);

  function signup() {
    auth
      .signInWithPopup(provider)
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

  function logout() {
    auth
      .signOut()
      .then(() => {
        console.log('deslogueado.');
      })
      .catch(() => {
        console.log('error al desloguear');
      });
  }

  function getUserData() {
    const user = auth.currentUser;

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
};

const initApp = function() {
  const location = window.location.pathname;

  Navbar.handleHamburguerButton();
  Footer.setYear();

  switch (location) {
    case '/build/': {
      firebase.initializeApp(config);
      // let panelRecital = new Panel('create', true);

      // panelRecital.buildPanelCombo(Band, panelRecital.combo.band);
      // panelRecital.buildPanelCombo(Place, panelRecital.combo.place);
      // panelRecital.handlePanelEvents(Recital);
      const navbar = new Navbar();
      authProviderHandler(navbar.signupBtn, navbar.loginBtn, navbar.logoutBtn);
      // renderTable(Recital, 'recital-data', true);
      break;
    }
    case '/build/bands.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Band, 'band-data');
      renderTable(Band, 'band-data', false);
      break;
    }
    case '/build/places.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Place, 'place-data');
      renderTable(Place, 'place-data', false);
      break;
    }
    default:
      console.warn('unrecheable view');
      break;
  }
};

// Onload Init Script
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
