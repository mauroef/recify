import { apiUri } from '../../config/paths';

class Place {
  static getAll() {
    return fetch(`${apiUri}place/read.php`)
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
          { id: '1', name: 'Groove' },
          { id: '2', name: 'Niceto' },
          { id: '3', name: 'El Teatro' }
        ];
      });
  }

  static create(name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ name: name })
    };

    return fetch(`${apiUri}place/create.php`, init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.warn('error with server res', error));
  }

  static update(id, name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id, name: name })
    };

    return fetch(`${apiUri}place/update.php`, init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.warn('error with server res', error));
  }

  static delete(id) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id })
    };

    return fetch(`${apiUri}place/delete.php`, init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.warn('error with server res', error));
  }
}

export default Place;
