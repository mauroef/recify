import { createInput, removeInput, editRow, removeRow } from './ui';
import Validator from './validator';
import Notification from './notification';

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
        console.warn('unauthorized action.');
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
    let inputValue = '';

    btnAccept.addEventListener('click', () => {
      if (btnAccept.dataset.action == 'edit') {
        inputValue = document.getElementById('edit-input').value;

        if (
          !Validator.validate(inputValue, Validator.REQUIRED) ||
          !Validator.validate(inputValue, Validator.MIN_LENGTH, 2) ||
          !Validator.validate(inputValue, Validator.MAX_LENGTH, 20)
        ) {
          Notification.showTextErrorMessage(2, 10);
          return;
        }

        apiClass
          .update(btnAccept.dataset.id, inputValue)
          .then(data => {
            editRow(tableSelector, data.id, data.name);
          })
          .catch(() => {
            editRow(tableSelector, btnAccept.dataset.id, inputValue);
          })
          .then(() => {
            Notification.showTextSuccessMessage(
              Modal.getRecordTypeName(tableSelector),
              'edited'
            );
          })
          .finally(() => {
            this.toggleModal(modalElement);
          });
      }

      if (btnAccept.dataset.action == 'delete') {
        apiClass
          .delete(btnAccept.dataset.id)
          .then(data => {
            if (data.id !== undefined) {
              removeRow(tableSelector, data.id);
              Notification.showTextSuccessMessage(
                Modal.getRecordTypeName(tableSelector),
                'deleted'
              );
            } else {
              Notification.showServerErrorMessage(data.message);
            }
          })
          .catch(() => {
            removeRow(tableSelector, btnAccept.dataset.id);
            Notification.showTextSuccessMessage(
              Modal.getRecordTypeName(tableSelector),
              'deleted'
            );
          })
          .finally(() => {
            this.toggleModal(modalElement);
          });
      }
    });
  }

  static getRecordTypeName(record) {
    switch (record) {
      case 'band-data':
        return 'Band';
      case 'place-data':
        return 'Place';
      case 'recital-data':
        return 'Recital';
    }
  }
}

export default Modal;
