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
    append(row, this.createRowNode(this.place));
    append(row, this.createRowNode(this.band));
    append(row, this.createRowNode(this.ticket));
    append(row, this.createRowButton('delete', 'is-danger', 'trash'));
  }
}

export default Row;
