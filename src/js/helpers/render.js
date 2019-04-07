/* eslint-disable indent */
/* eslint-disable no-undef */
import Band from '../api/band';

const createNode = element => document.createElement(element);

const append = (parent, el) => parent.appendChild(el);

const createButton = (id, action, color, icon) => {
  const button = document.createElement('a');
  button.classList.add('button', `btn-${action}`, color);
  button.setAttribute('id', id);
  button.innerHTML = `<i class="fas fa-${icon}"></i>`;

  return button;
};

const modal = () => {
  const table = document.getElementById('table');
  const buttons = table.getElementsByTagName('a');
  const close = document.getElementsByClassName('modal-remove');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = event => {
      event.preventDefault();
      modalToggle();
      renderModal(buttons[i]);
    };
  }
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = event => {
      event.preventDefault();
      modalToggle();
    };
  }
};

const renderModal = button => {
  let action = '';
  if (button.classList.contains('btn-edit')) action = 'edit';
  if (button.classList.contains('btn-delete')) action = 'delete';

  let id = button.id;
  let name = button.textContent;
  buildDataModal(action, id, name);
};

const buildDataModal = (action, id) => {
  const modal = document.getElementById('modal');
  const p = modal.getElementsByTagName('p');
  const button = modal.getElementsByTagName('button');

  switch (action) {
    case 'edit':
      editModal(p, id, button);
      break;
    case 'delete':
      deleteModal(p, id, button);
      break;
    default:
      break;
  }

  function editModal(p, id, button) {
    p[0].textContent = 'Edit';
    p[1].textContent = 'Click the green button to save.';
    button[0].classList.remove('is-danger');
    button[0].classList.add('is-success');
    buildInput();
    button[0].onclick = () => {
      let val = document.getElementById('edit-input').value;
      Band.update(id, val);
      destroyInput();
      modalToggle();
    };
    button[1].onclick = () => {
      destroyInput();
      modalToggle();
    };
    button[2].onclick = () => {
      destroyInput();
      modalToggle();
    };
  }

  function deleteModal(p, id, button) {
    p[0].textContent = 'Delete';
    p[1].textContent = 'Are you sure?';
    button[0].classList.remove('is-success');
    button[0].classList.add('is-danger');
    button[0].onclick = () => {
      console.log('deleting', id);
      Band.delete(id);
      modalToggle();
    };
    button[1].onclick = () => {
      modalToggle();
    };
    button[2].onclick = () => {
      modalToggle();
    };
  }
};

const populateTable = records => {
  const tbody = document.getElementById('band-data');
  records.map(item => {
    let tr = createNode('tr');
    let tdName = createNode('td');
    let tdEdit = createNode('td');
    let btnEdit = createButton(item.id, 'edit', 'is-info', 'edit');
    let tdDelete = createNode('td');
    let btnDelete = createButton(item.id, 'delete', 'is-danger', 'trash-alt');
    tdName.textContent = item.name;
    append(tbody, tr);
    append(tr, tdName);
    append(tr, tdEdit);
    append(tdEdit, btnEdit);
    append(tr, tdDelete);
    append(tdDelete, btnDelete);
  });
};

function buildInput() {
  let bodyModal = document.getElementsByClassName('modal-card-body');
  let input = createNode('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'edit-input');
  input.classList.add('input');
  append(bodyModal[0], input);
}

function destroyInput() {
  let input = document.getElementById('edit-input');
  input.remove();
}

function modalToggle() {
  const modal = document.getElementById('modal');
  modal.classList.toggle('is-active');
}

const saveBand = () => {
  const btnSave = document.getElementById('save-band');
  btnSave.onclick = event => {
    event.preventDefault();
    const name = document.getElementById('new-name').value;
    Band.create(name);
  };
};

export { modal, populateTable, saveBand };
