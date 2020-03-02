import { apiUri } from '../../config/paths';
import Notification from '../helpers/notification';

class Recital {
  static getAll() {
    return fetch(`${apiUri}recital/read.php`)
      .then(response => {
        if (response !== undefined) {
          return response.json();
        }
      })
      .then(data => data.records)
      .catch(error => {
        const message = 'return mocked data.';
        console.warn(message, error);
        Notification.showServerWarningMessage();
        return [
          {
            id: '3',
            date: '2019-07-22',
            band: 'Shaila',
            place: 'Niceto',
            ticket: 0
          },
          {
            id: '2',
            date: '2019-08-21',
            band: 'Shaila',
            place: 'Groove',
            ticket: 1
          },
          {
            id: '1',
            date: '2019-01-02',
            band: 'Boom Boom Kid',
            place: 'El Teatro',
            ticket: 1
          }
        ];
      });
  }

  static create(date, hasTicket, idBand, idPlace) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({
        date: date,
        ticket: hasTicket,
        id_band: idBand,
        id_place: idPlace
      })
    };

    return fetch(`${apiUri}recital/create.php`, init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.warn('error with the server res', error));
  }

  static delete(id) {
    const init = {
      method: 'POST',
      header: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id })
    };

    return fetch(`${apiUri}recital/delete.php`, init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.warn('error with server res', error));
  }
}

export default Recital;
