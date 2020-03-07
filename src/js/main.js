import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import { renderTable } from './helpers/render';
import Panel from './helpers/panel';
import Navbar from './helpers/navbar';

const initApp = function() {
  const location = window.location.pathname;
  Navbar.handleHamburguerButton();

  switch (location) {
    case '/': {
      let panelRecital = new Panel('create', true);

      panelRecital.buildPanelCombo(Band, panelRecital.combo.band);
      panelRecital.buildPanelCombo(Place, panelRecital.combo.place);
      panelRecital.handlePanelEvents(Recital);
      renderTable(Recital, 'recital-data', true);
      break;
    }
    case '/bands.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Band);
      renderTable(Band, 'band-data', false);
      break;
    }
    case '/places.html': {
      let panelCreate = new Panel('create');

      panelCreate.handlePanelEvents(Place);
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
