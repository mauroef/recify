/* eslint-disable no-undef */
import { apiUri } from '../../config/paths';
import { createNode, createButton, append } from '../helpers/render';

class Band {
  getAll() {
    fetch(`${apiUri}band/read.php`)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .then(data => {
        const records = data.records;
        const tbody = document.getElementById('band-data');
        records.map(item => {
          let tr = createNode('tr');
          let tdName = createNode('td');
          let tdEdit = createNode('td');
          let btnEdit = createButton(item.id);
          tdName.innerHTML = item.name;
          append(tbody, tr);
          append(tr, tdName);
          append(tr, tdEdit);
          append(tdEdit, btnEdit);
        });
      })
      .catch(error => console.error(error));
  }
}

export default Band;
