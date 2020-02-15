import Row from './row';
import Table from './table';

class Panel {
  constructor(type) {
    this.type = type; // create || search
  }

  handlePanelEvents(apiClass) {
    let input = document.querySelector(`#panel-${this.type} input[type=text]`);
    const btn = document.querySelector(`#panel-${this.type} button`);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (this.type === 'create') {
        apiClass
          .create(input.value)
          .then(data => new Row(data.id, data.name))
          .catch(() => new Row(Row.getNextMaxRowId(), input.value)) // if backend fails
          .then(rowData => rowData.createRow(false))
          .then(row => {
            Row.insertRowOnTop(row);
            Table.handleOneActionButton(row, 'btn-edit');
            Table.handleOneActionButton(row, 'btn-delete');
          });
      }
    });
  }

  handleSearch() {
    const input = document.querySelector('#panel-search input[type=text]');
    const btn = document.querySelector('#panel-search button');
    btn.addEventListener('click', () => {
      console.log('do the API thing with search', input.value);
    });
  }
}

export default Panel;
