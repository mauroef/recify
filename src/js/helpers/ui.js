const createNode = element => document.createElement(element);

const append = (parent, el) => parent.appendChild(el);

const createButton = (id, action, color, icon) => {
  const button = createNode('a');

  button.classList.add('button', `btn-${action}`, color);
  button.setAttribute('id', id);
  button.innerHTML = `<i class="fas fa-${icon}"></i>`;
  return button;
};

const createInput = (modalElement, value) => {
  let bodyModal = modalElement.getElementsByClassName('modal-card-body');
  let input = createNode('input');
  input.value = value;
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'edit-input');
  input.classList.add('edit-input', 'input');
  append(bodyModal[0], input);
};

const removeInput = () => {
  let input = document.getElementById('edit-input');
  input.remove();
};

const removeRow = (tableSelector, responseId) => {
  let rows = document.querySelectorAll(`#${tableSelector} > tr`);
  let rowsId = document.querySelectorAll(
    `#${tableSelector} > tr td:first-child`
  );

  for (let i = 0; i < rows.length; i++) {
    // if server response is undefined remove the current mocked data
    responseId = responseId !== 0 ? responseId : +rowsId[i].innerText;

    if (+rowsId[i].innerText === +responseId) {
      rows[i].parentNode.removeChild(rows[i]);
    }
  }
};

export {
  createNode,
  append,
  createButton,
  createInput,
  removeInput,
  removeRow
};
