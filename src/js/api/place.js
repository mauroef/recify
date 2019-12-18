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
    fetch(`${apiUri}place/create.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('place-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Place.getAll());
  }

  static update(id, name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id, name: name })
    };
    fetch(`${apiUri}place/update.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('place-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Place.getAll());
  }

  static delete(id) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id })
    };
    fetch(`${apiUri}place/delete.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('place-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Place.getAll());
  }
}

export default Place;
