import Row from './row';
import Modal from './modal';
import * as Ui from '../helpers/ui';

class Table {
  constructor() {
    this.rows = [];
  }

  createTable(selector) {
    const table = document.getElementById(selector);
    return table;
  }

  addRow(row) {
    this.rows.push(row);
    return this;
  }

  appendRowsToTable(tbodySel) {
    const table = this.createTable(tbodySel);

    this.rows.forEach((row) => Ui.append(table, row));
    return table;
  }

  static handleOneActionButton(row, actionClass) {
    const button = row.getElementsByClassName(actionClass)[0];

    button.addEventListener('click', () => {
      const id = button.id;
      const name = button.parentNode.previousSibling.textContent;

      Modal.handleModalOpenButton(actionClass, id, name);
    });
  }

  static handleActionButtons(tbodySel, actionClass) {
    const buttons = document.querySelectorAll(`#${tbodySel} a.${actionClass}`);

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        let id = buttons[i].id;
        let name = buttons[i].parentNode.previousSibling.textContent;

        Modal.handleModalOpenButton(actionClass, id, name);
      });
    }
  }

  static buildTableAPI(apiClass, tbodySelector, isRecitalTable) {
    const table = new Table();

    Ui.showTableLoader('table', true);
    apiClass
      .getAll()
      .then((records) => {
        try {
          records.forEach((r) => {
            if (!isRecitalTable) {
              let row = new Row(r.id, r.name);
              table.addRow(row.createRow(false));
            } else {
              let recitalRow = new Row(
                r.id,
                '',
                r.date,
                r.band,
                r.place,
                r.ticket
              );
              table.addRow(recitalRow.createRow(true));
            }
          });
          table.appendRowsToTable(tbodySelector);
        } catch (err) {
          console.log('Data read from API failed.');
        }
      })
      .then(() => {
        if (!isRecitalTable) {
          Table.handleActionButtons(tbodySelector, 'btn-edit');
        }
        Table.handleActionButtons(tbodySelector, 'btn-delete');
        Modal.handleModalCloseButtons(document.getElementById('modal'));
        Modal.handleModalAcceptButtonAPI(apiClass, tbodySelector);
      })
      .finally(() => {
        Ui.showTableLoader('table', false);
      });
  }

  static buildTableFirebase(record, tbodySel, isRecTable) {
    const table = new Table();

    record.forEach((r) => {
      if (!isRecTable) {
        let row = new Row(r.id, r.name);

        table.addRow(row.createRow(false));
      } else {
        //TODO: do the render of recital
        // let recitalRow = new Row();
        // table.addRow(recitalRow.createRow(true));
      }
    });
    // if is recital...
    table.appendRowsToTable(tbodySel);

    Ui.showTableLoader('table', false);
  }

  static addFirebaseRowToTable(tbodySel, id, name) {
    const tbody = document.getElementById(tbodySel);
    const firebaseRow = new Row(id, name).createRow(false);
    const nameFieldIndex = 1;
    const maxIndex = tbody.rows.length;

    for (let row of tbody.rows) {
      if (
        firebaseRow.cells[nameFieldIndex].textContent.localeCompare(
          row.cells[nameFieldIndex].textContent
        ) < 0
      ) {
        row.insertAdjacentElement('beforebegin', firebaseRow);
        break;
      }
    }
    // insert new row at the end
    tbody.insertBefore(firebaseRow, tbody.rows[maxIndex]);

    return firebaseRow;
  }
}

export default Table;
