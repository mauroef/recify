import * as Ui from './ui';
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
      Ui.createInput(modalElement, name);
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
      Ui.removeInput(modalElement);
    }
  }

  static toggleModal(modal) {
    modal.classList.toggle('is-active');
  }

  static handleModalOpenButton(actionClass, id, name) {
    const modalElement = document.getElementById('modal');

    switch (actionClass) {
      case 'btn-edit': {
        const msg = 'Please, inesrt the new name: ';
        const editModal = new Modal(id, `Edit - ${name}`, msg, 'edit');

        editModal.renderModal(modalElement, name);
        break;
      }
      case 'btn-delete': {
        const msg = 'Are you sure?';
        const deleteModal = new Modal(id, `Delete - ${name}`, msg, 'delete');

        deleteModal.renderModal(modalElement, name);
        break;
      }
      default:
        console.warn('unauthorized action.');
    }
  }

  static handleModalCloseButtons(modalElement) {
    const btnClose = modalElement.querySelectorAll('.modal-remove');

    for (let i = 0; i < btnClose.length; i++) {
      btnClose[i].addEventListener(
        'click',
        () => {
          Modal.toggleModal(modalElement);
        },
        { once: true }
      );
    }
  }

  static unbindModalCloseButtons() {
    const modalElement = document.getElementById('modal');
    const btnClose = modalElement.querySelectorAll('.modal-remove');

    for (let i = 0; i < btnClose.length; i++) {
      btnClose[i].removeEventListener(
        'click',
        () => {
          cb;
        },
        { once: true }
      );
    }

    return true;
  }

  static handleModalAcceptButtonAPI(apiClass, tbodySelector) {
    const btnAccept = document.getElementById('btn-accept');
    const modalElement = document.getElementById('modal');
    let inputValue = '';

    btnAccept.addEventListener('click', () => {
      Ui.showSpinner(btnAccept, true);
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
        if (
          !Validator.validate(inputValue, Validator.NON_REPEATED, tbodySelector)
        ) {
          Notification.showTextRepeatedErrorMessage(inputValue);
          Ui.showSpinner(btnAccept, false);
          return;
        }

        apiClass
          .update(btnAccept.dataset.id, inputValue)
          .then((data) => {
            Ui.editRow(tbodySelector, data.id, data.name);
          })
          .catch(() => {
            Ui.editRow(tbodySelector, btnAccept.dataset.id, inputValue);
          })
          .then(() => {
            Notification.showTextSuccessMessage(
              getRecordTypeName(tbodySelector),
              'edited'
            );
          })
          .finally(() => {
            this.toggleModal(modalElement);
            Ui.showSpinner(btnAccept, false);
          });
      }

      if (btnAccept.dataset.action == 'delete') {
        apiClass
          .delete(btnAccept.dataset.id)
          .then((data) => {
            if (data.id !== undefined) {
              Ui.removeRow(tbodySelector, data.id);
              Notification.showTextSuccessMessage(
                getRecordTypeName(tbodySelector),
                'deleted'
              );
            } else {
              Notification.showServerErrorMessage(data.message);
            }
          })
          .catch(() => {
            Ui.removeRow(tbodySelector, btnAccept.dataset.id);
            Notification.showTextSuccessMessage(
              getRecordTypeName(tbodySelector),
              'deleted'
            );
          })
          .finally(() => {
            this.toggleModal(modalElement);
            Ui.showSpinner(btnAccept, false);
          });
      }
    });

    function getRecordTypeName(record) {
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

  static handleModalAcceptButtonFirebase(tbodySel, fireDoc, callback) {
    const btnAccept = document.getElementById('btn-accept');
    const modalElement = document.getElementById('modal');
    let inputValue = '';

    btnAccept.addEventListener('click', () => {
      Ui.showSpinner(btnAccept, true);

      if (btnAccept.dataset.action === 'edit') {
        inputValue = document.getElementById('edit-input').value;

        if (
          !Validator.validate(inputValue, Validator.REQUIRED) ||
          !Validator.validate(inputValue, Validator.MIN_LENGTH, 2) ||
          !Validator.validate(inputValue, Validator.MAX_LENGTH, 20)
        ) {
          Notification.showTextErrorMessage(2, 10);
          return;
        }
        if (!Validator.validate(inputValue, Validator.NON_REPEATED, tbodySel)) {
          Notification.showTextRepeatedErrorMessage(inputValue);
          Ui.showSpinner(btnAccept, false);
          return;
        }

        callback
          .update(fireDoc, btnAccept.dataset.id, inputValue)
          .then(() => {
            Ui.editRow(tbodySel, btnAccept.dataset.id, inputValue);
          })
          .finally(() => {
            this.toggleModal(modalElement);
            Ui.showSpinner(btnAccept, false);
          });
      }

      if (btnAccept.dataset.action === 'delete') {
        callback
          .delete(fireDoc, btnAccept.dataset.id)
          .then((hasSuccess) => {
            if (hasSuccess) {
              Notification.showTextSuccessMessage('Record', 'deleted');
              Ui.removeRow(tbodySel, btnAccept.dataset.id);
            } else {
              Notification.showCanNotDeleted();
            }
          })
          .then(() => {
            if (document.getElementById(tbodySel).rows.length === 0) {
              Ui.showTableEmpty('table', true);
            }
          })
          .finally(() => {
            this.toggleModal(modalElement);
            Ui.showSpinner(btnAccept, false);
          });
      }
    });
  }
}

export default Modal;
