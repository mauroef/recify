import { apiUri } from '../../config/paths';

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
          { id: '1', name: 'Shaila' },
          { id: '2', name: 'Boom Boom Kid' },
          { id: '3', name: 'Cucsifae' }
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
    return fetch(`${apiUri}band/update.php`, init)
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
    return fetch(`${apiUri}band/delete.php`, init).then(response => {
      console.log('respuesta del servidor', response.json());
    });
    // .then(() => {
    //   let table = document.getElementById('band-data');
    //   while (table.firstChild) {
    //     table.removeChild(table.firstChild);
    //   }
    // })
    // .then(() => Band.getAll());
  }
}

export default Band;
