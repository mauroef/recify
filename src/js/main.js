/* eslint-disable indent */
import { getBand } from './helpers/handler';

const location = window.location.pathname;

switch (location) {
  case '/bands.html':
    getBand();
    break;
  default:
    break;
}
