import { apiUri } from '../../config/paths';

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
        return [
          {
            id: '1',
            date: '2019-01-02',
            band: 'Boom Boom Kid',
            place: 'El Teatro',
            ticket: 1
          },
          {
            id: '2',
            date: '2019-08-21',
            band: 'Shaila',
            place: 'Groove',
            ticket: 1
          },
          {
            id: '3',
            date: '2019-07-22',
            band: 'Shaila',
            place: 'Niceto',
            ticket: 0
          }
        ];
      });
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
