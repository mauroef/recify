import { createInput, removeInput } from './ui';

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
    }
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
}

export default Modal;
