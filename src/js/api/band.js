/* eslint-disable no-undef */
import { apiUri } from '../../config/paths';
import { modal, populateTable } from '../helpers/render';

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
        populateTable(records);
      })
      .then(() => {
        modal();
      })
      .catch(error => console.error(error));
  }
  static create(name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ name: name })
    };
    console.log(init.body);
    fetch(`${apiUri}band/create.php`, init).then(response => {
      console.log(response.json());
    });
  }
  static update(id, name) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id, name: name })
    };
    fetch(`${apiUri}band/update.php`, init).then(response => {
      console.log(response.json());
    });
  }
  static delete(id) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id: id })
    };
    fetch(`${apiUri}band/delete.php`, init).then(response => {
      console.log(response.json());
    });
  }
}

export default Band;
