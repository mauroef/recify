import Modal from './modal';

function handleActionButtons(tableSelector, actionClass) {
  const buttons = document.querySelectorAll(
    `#${tableSelector} a.${actionClass}`
  );

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      let id = buttons[i].id;
      let name = buttons[i].parentNode.previousSibling.textContent;

      handleModalOpen(actionClass, id, name);
      
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
      deleteModal.renderModal(modalElement, name);      
      
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

function handleModalAcceptButton(apiClass) {
  const btnAccept = document.getElementById('btn-accept');
  // TODO: manage edit and delete.
  // check what happens if fails server response
  btnAccept.addEventListener('click', () => {
    console.log('envio delete api', btnAccept.dataset.action);
    apiClass.delete(btnAccept.dataset.action);
  });
}

export { handleActionButtons, handleModalOpen, handleModalClose, handleModalAcceptButton };
