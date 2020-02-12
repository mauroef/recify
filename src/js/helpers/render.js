import Table from './table';
import Row from './row';
import { handleActionButtons, handleModalClose } from './handler';

function renderTable(apiObject, tableSelector, isRecitalTable) {
  const table = new Table();

  apiObject
    .getAll()
    .then(records => {
      records.forEach(r => {
        if (isRecitalTable) {
          let recitalRow = new Row(r.id, '', r.date, r.band, r.place, r.ticket);
          table.addRow(recitalRow.createRow(true));
        } else {
          let row = new Row(r.id, r.name);
          table.addRow(row.createRow(false));
        }
      });
      table.appendRowsToTable(tableSelector);
    })
    .then(() => {
      if (!isRecitalTable) {
        handleModalClose(document.getElementById('modal'));
        handleActionButtons(tableSelector, 'btn-edit');
      }
      handleActionButtons(tableSelector, 'btn-delete');
    });
}

export { renderTable };
