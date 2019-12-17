import { apiUri } from '../../config/paths';
//import { modal, populateTable } from '../helpers/render';

class Band {
  static getAll() {
    return fetch(`${apiUri}band/read.php`)
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
          { id: '1', name: 'shaila' },
          { id: '2', name: 'boom boom kid' },
          { id: '3', name: 'eterna inocencia' },
        ]
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
    fetch(`${apiUri}band/create.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('band-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Band.getAll());
  }

  static update(id, name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id, name: name })
    };
    fetch(`${apiUri}band/update.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('band-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Band.getAll());
  }

  static delete(id) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id })
    };
    fetch(`${apiUri}band/delete.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('band-data');
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }
      })
      .then(() => Band.getAll());
  }
}

export default Band;
