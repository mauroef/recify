import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import Table from './helpers/table';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';
import Footer from './helpers/footer';

import Firebase from './helpers/firebase';

const initApp = function() {
  const location = window.location.pathname;
  const firebase = new Firebase();
  const navbar = new Navbar();
  const panelCreate = new Panel('create', true);

  Navbar.handleHamburguerButton();
  Footer.setYear();

  switch (location) {
    case '/': {
      firebase.auth.onAuthStateChanged(user => {
        isAuthenticated(user, true);
      });
      handleNavbarEvents();
      break;
    }
    case '/bands.html': {
      firebase.auth.onAuthStateChanged(user => {
        isAuthenticated(user, false, Band, 'band-data');
      });
      break;
    }
    case '/places.html': {
      firebase.auth.onAuthStateChanged(user => {
        isAuthenticated(user, false, Place, 'place-data');
      });
      break;
    }
    default:
      console.warn('unrecheable view.');
      break;
  }

  function isAuthenticated(user, isRecital, apiClass, tbodySelector) {
    if (user !== null) {
      //TODO: do the firesotre thing...if (isRecital) {
      if (!isRecital) {
      } else {
        navbar.switchView(true, user.displayName, user.photoURL);
      }
    } else {
      if (!isRecital) {
        panelCreate.handlePanelEvents(apiClass, tbodySelector);
        Table.buildTable(apiClass, tbodySelector, false);
      } else {
        panelCreate.buildPanelCombo(Band, panelCreate.combo.band);
        panelCreate.buildPanelCombo(Place, panelCreate.combo.place);
        panelCreate.handlePanelEvents(Recital);
        Table.buildTable(Recital, 'recital-data', true);
        navbar.switchView(false);
      }
    }
  }

  function handleNavbarEvents() {
    navbar.loginBtn.addEventListener('click', () =>
      firebase.logIn().then(() => navbar.switchView(true))
    );
    navbar.logoutBtn.addEventListener('click', () =>
      firebase.logout().then(() => navbar.switchView(false))
    );
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
