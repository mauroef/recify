import { apiUri } from '../../config/paths';
import { populateRecitalTable, prepareDelete } from '../helpers/render';

class Recital {
  static getAll() {
    fetch(`${apiUri}recital/read.php`)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .then(data => {
        const records = data.records;
        populateRecitalTable(records);
      })
      .then(() => {
        prepareDelete();
      })
      .catch(error => console.log('Ooops!...', error));
  }

  static delete(id) {
    const init = {
      method: 'POST',
      header: {
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ id })
    };
    fetch(`${apiUri}recital/delete.php`, init)
      .then(response => {
        console.log(response.json());
      })
      .then(() => {
        let table = document.getElementById('recital-data');
        while (table.firstChild) {
          table.removeChild(table.firstElementChild);
        }
      })
      .then(() => Recital.getAll());
  }
}

export default Recital;
