import { createInput, removeInput, removeRow } from './ui';

class Modal {
  constructor(id, title, text, action) {
    this.id = id || 0;
    this.title = title || '';
    this.text = text || '';
    this.action = action || '';
  }

  renderModal(modalElement, name) {
    this.clearModal(modalElement);
    modalElement.querySelector('.modal-card-title').textContent = this.title;
    modalElement.querySelector('.modal-card-body > p').textContent = this.text;

    if (this.action === 'edit') {
      createInput(modalElement, name);
      document.getElementById('btn-accept').setAttribute('data-action', 'edit');
    }

    if (this.action === 'delete') {
      document
        .getElementById('btn-accept')
        .setAttribute('data-action', 'delete');
    }

    document.getElementById('btn-accept').setAttribute('data-id', this.id);

    Modal.toggleModal(modalElement);
  }

  clearModal(modalElement) {
    const hasInput = modalElement.contains(
      modalElement.querySelector('.edit-input')
    );

    if (hasInput || (hasInput && this.action === 'delete')) {
      removeInput(modalElement);
    }
  }

  static toggleModal(modal) {
    modal.classList.toggle('is-active');
  }

  static handleModalOpenButton(actionClass, id, name) {
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

  static handleModalCloseButtons(modalElement) {
    const btnClose = modalElement.querySelectorAll('.modal-remove');

    for (var i = 0; i < btnClose.length; i++) {
      btnClose[i].addEventListener('click', () => {
        Modal.toggleModal(modalElement);
      });
    }
  }

  static handleModalAcceptButton(apiClass, tableSelector) {
    const btnAccept = document.getElementById('btn-accept');
    const modalElement = document.getElementById('modal');
    // TODO: check what happens if fails server response
    btnAccept.addEventListener('click', () => {
      if (btnAccept.dataset.action == 'edit') {
        apiClass
          .update(
            btnAccept.dataset.id,
            document.getElementById('edit-input').value
          )
          .then(data => {
            console.log('data', data);
            this.toggleModal(modalElement);
          });
      }

      if (btnAccept.dataset.action == 'delete') {
        apiClass.delete(btnAccept.dataset.id).then(data => {
          removeRow(tableSelector, data !== undefined ? data.id : 0);

          this.toggleModal(modalElement);
        });
      }
    });
  }
}

export default Modal;
