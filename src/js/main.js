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

  Navbar.handleHamburguerButton();
  Footer.setYear();

  // TODO: if is auth get data from firestore
  // else user mocked data
  switch (location) {
    case '/': {
      firebase.auth.onAuthStateChanged(user => {
        if (user !== null) {
          const panelRecital = new Panel('create', true);

          panelRecital.buildPanelCombo(Band, panelRecital.combo.band);
          panelRecital.buildPanelCombo(Place, panelRecital.combo.place);
          panelRecital.handlePanelEvents(Recital);
          Table.renderTable(Recital, 'recital-data', true);
          navbar.switchView(true, user.displayName, user.photoURL, () => {});
        } else {
          navbar.switchView(false);
        }
      });
      // console.log(gAuth.getUserData());
      navbar.loginBtn.addEventListener('click', () =>
        firebase.logIn().then(() => navbar.switchView(true))
      );
      navbar.logoutBtn.addEventListener('click', () =>
        firebase.logout().then(() => navbar.switchView(false))
      );

      break;
    }
    case '/bands.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Band, 'band-data');
      Table.renderTable(Band, 'band-data', false);
      break;
    }
    case '/places.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Place, 'place-data');
      Table.renderTable(Place, 'place-data', false);
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
