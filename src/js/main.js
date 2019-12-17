import Table from './helpers/table';
import Row from './helpers/row';
import Band from './api/band';
import Modal from './helpers/modal';

const init = function() {
  const location = window.location.pathname;
  switch (location) {
    case '/':
      //getRecital();
      break;
    case '/bands.html':
      renderBandTable();
      handleModalClose(document.getElementById('modal'));
      break;
    case '/places.html':
      //getPlace();
      //savePlace();
      break;
    default:
      console.warn('unrecheable view');
      break;
  }
};

function renderBandTable() {
  const bandTableSelector = 'band-data';
  const bandTable = new Table();

  Band.getAll()
    .then(records => {
      records.forEach(r => {
        let row = new Row(r.id, r.name);
        bandTable.addRow(row.createRow());
      });
      bandTable.appendRowsToTable(bandTableSelector);
    })
    .then(() => {
      handleActionButtons(bandTableSelector, 'btn-edit');
      handleActionButtons(bandTableSelector, 'btn-delete');
    });

  console.log(bandTable);
}

function handleActionButtons(tableSelector, actionClass) {
  const buttons = document.querySelectorAll(
    `#${tableSelector} a.${actionClass}`
  );

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      let id = buttons[i].id;
      let name = buttons[i].parentNode.previousSibling.textContent;

      handleModalOpen(actionClass, id, name, buttons[i]);
    });
  }
}

function handleModalOpen(actionClass, id, name) {
  const modalElement = document.getElementById('modal');

  switch (actionClass) {
    case 'btn-edit': {
      const editModal = new Modal(
        id,
        'Edit - ' + name,
        'Enter the new name',
        'edit'
      );
      editModal.renderModal(modalElement, name);

      break;
    }
    case 'btn-delete': {
      const deleteModal = new Modal(id, 'Delete', 'Are you sure?', 'delete');
      deleteModal.renderModal(modalElement);
      break;
    }
    default:
      console.warn('unauthorized action');
  }
}

function handleModalClose(modalElement) {
  var btnClose = modalElement.querySelectorAll('.modal-remove');

  for (var i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click', () => {
      console.log('click');
      Modal.toggleModal(modalElement);
    });
  }
}

// Onload Init Script
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
