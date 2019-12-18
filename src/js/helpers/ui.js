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

export { createNode, append, createButton, createInput, removeInput };
