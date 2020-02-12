import Table from './table';
import Row from './row';
import Modal from './modal';

function renderTable(apiClass, tableSelector, isRecitalTable) {
  const table = new Table();

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
        table.appendRowsToTable(tableSelector);
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
      Modal.handleModalAcceptButton(apiClass);
    });
}

export { renderTable };
