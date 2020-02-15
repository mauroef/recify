import { append } from '../helpers/ui';
import Modal from './modal'; /* TODO: handle out of this class */

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
    this.rows.forEach(row => append(table, row));
    return table;
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
}

export default Table;
