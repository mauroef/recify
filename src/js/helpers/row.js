import { createNode, append, createButton } from '../helpers/ui';

class Row {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  createRow() {
    const row = createNode('tr');

    this.appendRowNodes(row);

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
}

export default Row;
