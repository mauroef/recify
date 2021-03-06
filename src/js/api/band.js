import { apiUri } from '../config/paths';

class Band {
  static getAll() {
    return fetch(`${apiUri}band/read.php`)
      .then((response) => {
        if (response !== undefined) {
          return response.json();
        }
      })
      .then((data) => data.records)
      .catch((error) => {
        const message = 'return mocked data.';
        console.warn(message, error);
        return [
          { id: '3', name: 'Daft Punk' },
          { id: '2', name: 'Blink-182' },
          { id: '1', name: 'Massacre' },
        ];
      });
  }

  static create(name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify({ name: name }),
    };

    return fetch(`${apiUri}band/create.php`, init)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.warn('error with server res', error));
  }

  static update(id, name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify({ id: id, name: name }),
    };

    return fetch(`${apiUri}band/update.php`, init)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.warn('error with server res', error));
  }

  static delete(id) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify({ id: id }),
    };

    return fetch(`${apiUri}band/delete.php`, init)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.warn('error with server res', error));
  }
}

export default Band;
