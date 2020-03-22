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

  appendRowsToTable(selector) {
    const table = this.createTable(selector);
    console.log('tabla?', table);
    this.rows.forEach(row => Ui.append(table, row));
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

  static handleActionButtons(tableSelector, actionClass) {
    const buttons = document.querySelectorAll(
      `#${tableSelector} a.${actionClass}`
    );

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
      .then(records => {
        try {
          records.forEach(r => {
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
          // Not edition for Recital View
          Table.handleActionButtons(tableSelector, 'btn-edit');
        }
        Table.handleActionButtons(tableSelector, 'btn-delete');
        Modal.handleModalCloseButtons(document.getElementById('modal'));
        Modal.handleModalAcceptButton(apiClass, tableSelector);
      })
      .finally(() => {
        Ui.showTableLoader('table', false);
      });
  }

  static buildTableFirebase(snapDoc, tbodySelector, isRecitalTable) {
    const table = new Table();

    if (!isRecitalTable) {
      // let html = '';

      // snapDoc.forEach(doc => {
      //   let band = doc.data();
      //   let p = `<p>${band.name}</p>`;

      //   html += p;
      // });

      snapDoc.forEach(doc => {
        let record = doc.data();
        if (!isRecitalTable) {
          let row = new Row(doc.id, record.name);

          table.addRow(row.createRow(false));
        } else {
          // let recitalRow = new Row(
          //   r.id,
          //   '',
          //   r.date,
          //   r.band,
          //   r.place,
          //   r.ticket
          // );
          // table.addRow(recitalRow.createRow(true));
        }
      });
      console.log('tbody', tbodySelector);
      table.appendRowsToTable(tbodySelector);

      // TODO: provisional
      // document.getElementById('panel-search').innerHTML = html;
    }
  }
}

export default Table;
