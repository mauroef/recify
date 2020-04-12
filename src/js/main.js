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
      firebaseHandler(true, Recital, 'recital-data');
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

          firestoreSetup(tbodySelector);
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
    const fireDoc = Firebase.getFireDoc(tbodySel);

    if (fireDoc !== 'recitals') {
      const panel = new Panel('create', false);

      panel.handlePanelEventsFiresbase(tbodySel, (name) =>
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
    } else {
      const panelRecital = new Panel('create', true);
      // load combos
      panelRecital.buildPanelComboFirebase(
        (doc) => firebase.getData(doc),
        'bands',
        panelRecital.combo.band
      );
      panelRecital.buildPanelComboFirebase(
        (doc) => firebase.getData(doc),
        'places',
        panelRecital.combo.place
      );
      // create new recital
      panelRecital.handlePanelEventsFiresbase(
        tbodySel,
        (date, bandId, placeId, ticket) =>
          firebase
            .addRecital(
              fireDoc,
              date,
              bandId,
              placeId,
              ticket,
              firebase.auth.currentUser.uid
            )
            .then((docRef) => docRef.id)
            .then((id) => firebase.getRecitalById(id))
            .then((data) =>
              Table.addFirebaseRowToRecitalTable(
                tbodySel,
                data.id,
                data.date,
                data.bandName,
                data.placeName,
                ticket
              )
            )
            .then((newRow) => {
              Table.handleOneActionButton(newRow, 'btn-delete');
            })
      );
      // get data
      firebase
        .getRecitalData(fireDoc)
        .then((r) => {
          Table.buildTableFirebase(r, tbodySel, true);
        })
        .then(() => Table.handleActionButtons(tbodySel, 'btn-delete'))
        .then(() => {
          Modal.handleModalCloseButtons(document.getElementById('modal'));
          Modal.handleModalAcceptButtonFirebase(tbodySel, fireDoc, firebase);
        });
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
