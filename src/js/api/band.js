import { apiUri } from '../../config/paths';
import { modal, populateTable } from '../helpers/render';

// TODO:
// refactor ajax

class Band {
  static getAll() {
    fetch(`${apiUri}band/read.php`)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .then(data => {
        const records = data.records;
        populateTable(records, 'band');
      })
      .then(() => {
        modal('band');
      })
      .catch(error => console.error('Ooops!...', error));
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
