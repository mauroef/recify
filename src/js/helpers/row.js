import { createNode, append, createButton } from '../helpers/ui';

class Row {
  constructor(id, name, date, band, place, ticket) {
    this.id = id;
    this.name = name;
    // Recital Row Data
    this.date = date;
    this.band = band;
    this.place = place;
    this.ticket = ticket;
  }

  createRow(isRecitalRow) {
    const row = createNode('tr');

    if (isRecitalRow) {
      this.appendRecitalRowNodes(row);
    } else {
      this.appendRowNodes(row);
    }

    return row;
  }

  createRowNode(data) {
    const td = createNode('td');

    td.textContent = data;
    return td;
  }

  createRowTicketNode(data) {
    const td = createNode('td');
    const ticketIcon = createNode('i');

    data !== '0' && data !== false
      ? ticketIcon.classList.add('fas', 'fa-ticket-alt', 'has-text-success')
      : ticketIcon.classList.add('fas', 'fa-times', 'has-text-danger');
    append(td, ticketIcon);
    return td;
  }

  createRowButton(action, cssClass, icon) {
    const td = createNode('td');
    const button = createButton(this.id, action, cssClass, icon);

    append(td, button);
    return td;
  }

  appendRowNodes(row) {    
    append(row, this.createRowNode(this.id));
    append(row, this.createRowNode(this.name));
    append(row, this.createRowButton('edit', 'is-info', 'edit'));
    append(row, this.createRowButton('delete', 'is-danger', 'trash'));
  }

  appendRecitalRowNodes(row) {
    append(row, this.createRowNode(this.id));
    append(row, this.createRowNode(this.date));
    append(row, this.createRowNode(this.band));
    append(row, this.createRowNode(this.place));
    append(row, this.createRowTicketNode(this.ticket));
    append(row, this.createRowButton('delete', 'is-danger', 'trash'));
  }

  static insertRowOnTop(row) {
    const table = document
      .getElementById('table')
      .getElementsByTagName('tbody')[0];

    // insert new row at index 0
    table.insertAdjacentElement('afterbegin', row);
  }

  static getNextMaxRowId() {
    // return the top one id
    return document.querySelector('table > tbody').childElementCount !== 0
      ? +document.querySelector('table > tbody > tr > td').textContent + 1
      : 1;
  }

  static getNameById(selector, id) {
    const items = document.getElementById(selector).options;
    // return matched name with any id from dropdown list
    for (let i = 0; i < items.length; i++) {
      if (items[i].value == id) {
        return items[i].textContent;
      }
    }
  }
}

export default Row;
