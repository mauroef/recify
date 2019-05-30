import {
  getRecital,
  getBand,
  saveBand,
  getPlace,
  savePlace
} from './helpers/handler';

const location = window.location.pathname;

switch (location) {
  case '/':
    getRecital();
    break;
  case '/bands.html':
    getBand();
    saveBand();
    break;
  case '/places.html':
    getPlace();
    savePlace();
    break;
  default:
    break;
}
