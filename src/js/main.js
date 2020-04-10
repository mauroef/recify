import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import Table from './helpers/table';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';
import Footer from './helpers/footer';
import Modal from './helpers/modal';

import Firebase from './helpers/firebase';

const initApp = function () {
  const location = window.location.pathname,
    firebase = new Firebase(),
    navbar = new Navbar(),
    footer = new Footer();

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
    firebase.auth.onAuthStateChanged((user) => {
      if (firebase.isAuthenticated(user)) {
        if (navbar.switchView(true, user.displayName, user.photoURL)) {
          handleNavbarEvents(true);

          if (isRecital) {
            firestoreSetup('recital');
          } else {
            firestoreSetup(tbodySelector);
          }
        }
      } else {
        if (!navbar.switchView(false)) {
          handleNavbarEvents(false);
          if (isRecital) {
            const panelCreate = new Panel('create', true);
            panelCreate.buildPanelCombo(Band, panelCreate.combo.band);
            panelCreate.buildPanelCombo(Place, panelCreate.combo.place);
            panelCreate.handlePanelEvents(Recital);
            Table.buildTableAPI(Recital, 'recital-data', true);
          } else {
            const panelCreate = new Panel('create', false);
            panelCreate.handlePanelEvents(apiClass, tbodySelector);
            Table.buildTableAPI(apiClass, tbodySelector, false);
          }
        }
      }
    });
  }

  function firestoreSetup(tbodySel) {
    //TODO: check this
    const panelCreate = new Panel('create', false);
    const fireDoc = getFireDoc(tbodySel);

    panelCreate.handlePanelEventsFiresbase(tbodySel, (name) =>
      firebase
        .add(fireDoc, name, firebase.auth.currentUser.uid)
        .then((docRef) =>
          Table.addFirebaseRowToTable(tbodySel, docRef.id, name)
        )
        .then((row) => {
          Table.handleOneActionButton(row, 'btn-edit');
          Table.handleOneActionButton(row, 'btn-delete');
        })
    );

    firebase
      .getData(fireDoc)
      .then((r) => {
        Table.buildTableFirebase(r, tbodySel, false);
      })
      .then(() => {
        Table.handleActionButtons(tbodySel, 'btn-edit');
        Table.handleActionButtons(tbodySel, 'btn-delete');
      })
      .then(() => {
        Modal.handleModalCloseButtons(document.getElementById('modal'));
        Modal.handleModalAcceptButtonFirebase(tbodySel, fireDoc, firebase);
      });

    function getFireDoc(tbodySel) {
      if (tbodySel === 'band-data') {
        return 'bands';
      } else if (tbodySel === 'place-data') {
        return 'places';
      }
    }
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
