import Row from './row';
import Table from './table';
import * as Ui from './ui';

class Panel {
  constructor(type) {
    if (type !== 'recital') {
      this.type = type; // create || search
    } else {
      this.combo = { place: 'place-dropdown', band: 'band-dropdown' };
    }
  }

  buildPanelCombo(apiClass, cboSelector) {
    let cboPanel = document.getElementById(cboSelector);

    apiClass.getAll().then(result => {
      if (result.length > 0) {
        result.forEach(r => {
          let optionNode = Ui.createNode('option');
          optionNode.value = r.id;
          optionNode.textContent = r.name;
          Ui.append(cboPanel, optionNode);
        });
      }
    });
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
