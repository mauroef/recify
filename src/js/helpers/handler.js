import Modal from './modal';

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
      // TODO: handle editBtn
      break;
    }
    case 'btn-delete': {
      const deleteModal = new Modal(id, 'Delete', 'Are you sure?', 'delete');
      deleteModal.renderModal(modalElement);
      // TODO: handle deleteBtn
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
      Modal.toggleModal(modalElement);
    });
  }
}

export { handleActionButtons, handleModalOpen, handleModalClose };
