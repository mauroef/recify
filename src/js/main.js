/* eslint-disable indent */
import { getBand, saveBand } from './helpers/handler';

const location = window.location.pathname;

switch (location) {
  case '/bands.html':
    getBand();
    saveBand();
    break;
  default:
    break;
}
