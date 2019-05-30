import { apiUri } from '../../config/paths';
import { populateRecitalTable } from '../helpers/render';

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
      .catch(error => console.log('Ooops!...', error));
  }
}

export default Recital;
