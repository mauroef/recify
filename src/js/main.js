import Recital from './api/recital';
import Band from './api/band';
import Place from './api/place';
import { renderTable } from './helpers/render';
import Panel from '../js/helpers/panel';

const initApp = function() {
  const location = window.location.pathname;

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

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
