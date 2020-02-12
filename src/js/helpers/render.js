import Table from './table';
import Row from './row';
import { handleActionButtons, handleModalClose } from './handler';

function renderTable(apiClass, tableSelector, isRecitalTable) {
  const table = new Table();

  apiClass
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
        handleActionButtons(apiClass, tableSelector, 'btn-edit');
      }
      handleActionButtons(apiClass, tableSelector, 'btn-delete');
    });
}

export { renderTable };
