import { apiUri } from '../../config/paths';
import { modal, populateTable } from '../helpers/render';

// TODO:
// refactor ajax

class Place {
  static getAll() {
    fetch(`${apiUri}place/read.php`)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .then(data => {
        const records = data.records;
        populateTable(records, 'place');
      })
      .then(() => {
        modal('place');
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
