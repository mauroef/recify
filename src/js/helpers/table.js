import { append } from '../helpers/ui';

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
}

export default Table;
