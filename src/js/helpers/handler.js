import Modal from './modal';

function handleActionButtons(apiClass, tableSelector, actionClass) {
  const buttons = document.querySelectorAll(
    `#${tableSelector} a.${actionClass}`
  );

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      let id = buttons[i].id;
      let name = buttons[i].parentNode.previousSibling.textContent;

      handleModalOpen(apiClass, actionClass, id, name);
    });
  }
}

function handleModalOpen(apiClass, actionClass, id, name) {
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
      handleEditButton(apiClass, id, name);

      break;
    }
    case 'btn-delete': {
      const deleteModal = new Modal(id, 'Delete', 'Are you sure?', 'delete');
      deleteModal.renderModal(modalElement);
      handleDeleteButton(apiClass, id);

      break;
    }
    default:
      console.warn('unauthorized action');
  }
}

function handleModalClose(modalElement) {
  const btnClose = modalElement.querySelectorAll('.modal-remove');

  for (var i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click', () => {
      Modal.toggleModal(modalElement);
    });
  }
}

function handleEditButton(id) {
  console.log(id);
}

function handleDeleteButton(apiClass, id) {
  const btnAccept = document.getElementById('btn-accept');

  btnAccept.addEventListener('click', () => {
    console.log('click en boton accept');
    apiClass.delete(id);
  });
}

export { handleActionButtons, handleModalOpen, handleModalClose };
