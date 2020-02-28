import Row from './row';
import Table from './table';
import * as Ui from './ui';
import Validator from './validator';
import Notification from './notification';

class Panel {
  constructor(type, isRecital) {
    this.type = type; // create || search
    if (isRecital !== undefined && isRecital !== false) {
      this.isRecital = true;
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
    if (!this.isRecital) {
      this.handleNonRecitalPanelEvents(apiClass);
    } else {
      this.handleRecitalPanelEvents(apiClass);
    }
  }

  handleNonRecitalPanelEvents(apiClass) {
    const btn = document.querySelector(`#panel-${this.type} button`);
    let inputValue = '';

    btn.addEventListener('click', () => {
      inputValue = document.querySelector(
        `#panel-${this.type} input[type=text]`
      ).value;

      if (this.type === 'create') {
        if (
          !Validator.validate(inputValue, Validator.REQUIRED) ||
          !Validator.validate(inputValue, Validator.MIN_LENGTH, 2) ||
          !Validator.validate(inputValue, Validator.MAX_LENGTH, 20)
        ) {
          Notification.showTextErrorMessage(2, 20);
          return;
        }

        apiClass
          .create(inputValue)
          .then(data => new Row(data.id, data.name))
          .catch(() => new Row(Row.getNextMaxRowId(), inputValue)) // if backend fails
          .then(rowData => rowData.createRow(false))
          .then(row => {
            Row.insertRowOnTop(row);
            Table.handleOneActionButton(row, 'btn-edit');
            Table.handleOneActionButton(row, 'btn-delete');
          })
          .then(() => {
            Notification.showTextSuccessMessage('Record', 'created');
          });
      }
    });
  }

  handleRecitalPanelEvents(apiClass) {
    const bandId = document.getElementById(this.combo.band);
    const placeId = document.getElementById(this.combo.place);
    const date = document.querySelector(`#panel-${this.type} input[type=date]`);
    const ticket = document.querySelector(
      `#panel-${this.type} input[type=checkbox]`
    );
    const btn = document.querySelector(`#panel-${this.type} button`);

    btn.addEventListener('click', () => {
      if (!Validator.validate(date.value, Validator.REQUIRED)) {
        Notification.showDateErrorMessage();
        return;
      }

      apiClass
        .create(date.value, ticket.checked, bandId.value, placeId.value)
        .then(
          data =>
            new Row(
              data.id,
              '',
              data.date,
              Row.getNameById(this.combo.band, data.id_band),
              Row.getNameById(this.combo.place, data.id_place),
              data.ticket
            )
        )
        .catch(
          () =>
            new Row(
              Row.getNextMaxRowId(),
              '',
              date.value,
              Row.getNameById(this.combo.band, bandId.value),
              Row.getNameById(this.combo.place, placeId.value),
              ticket.checked
            )
        ) // if backend fails
        .then(rowData => rowData.createRow(true))
        .then(row => {
          Row.insertRowOnTop(row);
          Table.handleOneActionButton(row, 'btn-delete');
        })
        .then(() => {
          Notification.showTextSuccessMessage('Recital', 'created');
        });
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
