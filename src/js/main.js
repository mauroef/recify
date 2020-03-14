import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import { renderTable } from './helpers/render';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';
import Footer from './helpers/footer';

import firebase from 'firebase';
import { config } from './config/firebase.config';
import Authorization from './helpers/authorization';

const initApp = function() {
  const location = window.location.pathname;

  Navbar.handleHamburguerButton();
  Footer.setYear();

  switch (location) {
    case '/': {
      firebase.initializeApp(config);

      // let panelRecital = new Panel('create', true);

      // foo.signInWithPopup(this.provider)

      // panelRecital.buildPanelCombo(Band, panelRecital.combo.band);
      // panelRecital.buildPanelCombo(Place, panelRecital.combo.place);
      // panelRecital.handlePanelEvents(Recital);
      const gAuth = new Authorization(
        firebase.auth(),
        new firebase.auth.GoogleAuthProvider()
      );

      const navbar = new Navbar();

      gAuth.auth.onAuthStateChanged(user => {
        if (user !== null) {
          navbar.switchView(true, user.displayName, user.photoURL);
        } else {
          navbar.switchView(false);
        }
      });

      navbar.loginBtn.addEventListener('click', () =>
        gAuth.logIn().then(() => navbar.switchView(true))
      );
      navbar.logoutBtn.addEventListener('click', () =>
        gAuth.logout().then(() => navbar.switchView(false))
      );

      // document.querySelector('.title').addEventListener('click', () => {
      //   auth.getUserData();
      // });
      // renderTable(Recital, 'recital-data', true);

      break;
    }
    case '/bands.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Band, 'band-data');
      renderTable(Band, 'band-data', false);
      break;
    }
    case '/places.html': {
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
  // initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
