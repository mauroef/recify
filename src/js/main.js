import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import Table from './helpers/table';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';
import Footer from './helpers/footer';

import Firebase from './helpers/firebase';

const initApp = function() {
  const location = window.location.pathname,
    firebase = new Firebase(),
    navbar = new Navbar(),
    footer = new Footer(),
    panelCreate = new Panel('create', true);

  switch (location) {
    case '/': {
      firebaseHandler(true);
      break;
    }
    case '/bands.html': {
      firebaseHandler(false, Band, 'band-data');
      break;
    }
    case '/places.html': {
      firebaseHandler(false, Place, 'place-data');
      break;
    }
    default:
      console.warn('unrecheable view.');
      break;
  }

  function firebaseHandler(isRecital, apiClass, tbodySelector) {
    firebase.auth.onAuthStateChanged(user => {
      if (isAuthenticated(user, isRecital)) {
        if (navbar.switchView(true, user.displayName, user.photoURL)) {
          handleNavbarEvents(true);
          // TODO: firestore thing
          if (isRecital) {
            firestoreSetup('recital');
          } else {
            firestoreSetup(tbodySelector);
          }
        }
      } else {
        if (!navbar.switchView(false)) {
          handleNavbarEvents(false);
          // TODO: api thing
          if (isRecital) {
            panelCreate.buildPanelCombo(Band, panelCreate.combo.band);
            panelCreate.buildPanelCombo(Place, panelCreate.combo.place);
            panelCreate.handlePanelEvents(Recital);
            Table.buildTableAPI(Recital, 'recital-data', true);
          } else {
            panelCreate.handlePanelEvents(apiClass, tbodySelector);
            Table.buildTableAPI(apiClass, tbodySelector, false);
          }
        }
      }
    });
  }

  function firestoreSetup(tbodySelector) {
    //TODO: refactor
    const FDocument = getFDocument(tbodySelector);

    firebase.db.collection(FDocument).onSnapshot(snapshot => {
      Table.buildTableFirebase(snapshot.docs);
    });

    function getFDocument(tbodySelector) {
      if (tbodySelector === 'band-data') {
        return 'bands';
      } else if (tbodySelector === 'place-data') {
        return 'places';
      }
    }
  }

  function isAuthenticated(user) {
    return user !== null ? true : false;
  }

  function handleNavbarEvents(logged) {
    if (!logged) {
      navbar.loginBtn.addEventListener('click', () =>
        firebase.logIn().then(() => navbar.switchView(true))
      );
    } else {
      navbar.logoutBtn.addEventListener('click', () =>
        firebase.logout().then(() => navbar.switchView(false))
      );
    }
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
