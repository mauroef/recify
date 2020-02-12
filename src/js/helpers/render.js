import Band from '../api/band';
import Place from '../api/place';
import Recital from '../api/recital';

const createNode = element => document.createElement(element);

const append = (parent, el) => parent.appendChild(el);

const createButton = (id, action, color, icon) => {
  const button = document.createElement('a');
  button.classList.add('button', `btn-${action}`, color);
  button.setAttribute('id', id);
  button.innerHTML = `<i class="fas fa-${icon}"></i>`;

  return button;
};

// on click delete actual recital record
const prepareDelete = () => {
  const table = document.getElementById('table');
  const buttons = table.getElementsByTagName('a');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = event => {
      event.preventDefault();
      let id = buttons[i].id;
      Recital.delete(id);
    };
  }
};

// start modal render for edit & delete
const modal = target => {
  const table = document.getElementById('table');
  const buttons = table.getElementsByTagName('a');
  const close = document.getElementsByClassName('modal-remove');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = event => {
      event.preventDefault();
      modalToggle();
      renderModal(buttons[i], target);
    };
  }
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = event => {
      event.preventDefault();
      modalToggle();
    };
  }
};

const renderModal = (button, target) => {
  let action = '';
  if (button.classList.contains('btn-edit')) action = 'edit';
  if (button.classList.contains('btn-delete')) action = 'delete';

  let id = button.id;
  buildDataModal(action, id, target);
};

const buildDataModal = (action, id, target) => {
  const modal = document.getElementById('modal');
  const p = modal.getElementsByTagName('p');
  const button = modal.getElementsByTagName('button');

  switch (action) {
    case 'edit':
      editModal(p, id, target, button);
      break;
    case 'delete':
      deleteModal(p, id, target, button);
      break;
    default:
      break;
  }

  function editModal(p, id, target, button) {
    p[0].textContent = 'Edit';
    p[1].textContent = 'Click the green button to save.';
    button[0].classList.remove('is-danger');
    button[0].classList.add('is-success');
    buildInput();
    button[0].onclick = () => {
      let val = document.getElementById('edit-input').value;
      if (target === 'band') Band.update(id, val);
      else if (target === 'place') Place.update(id, val);
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

  function deleteModal(p, id, target, button) {
    p[0].textContent = 'Delete';
    p[1].textContent = 'Are you sure?';
    button[0].classList.remove('is-success');
    button[0].classList.add('is-danger');
    button[0].onclick = () => {
      if (target === 'band') Band.delete(id);
      else if (target === 'place') Place.delete(id);
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

const populateRecitalTable = records => {
  const tbody = document.getElementById('recital-data');
  let counter = 0;
  records.map(item => {
    let tr = createNode('tr');
    let tdNumber = createNode('td');
    let tdDate = createNode('td');
    let tdBand = createNode('td');
    let tdPlace = createNode('td');
    let tdTicket = createNode('td');
    let tdDelete = createNode('td');
    let btnDelete = createButton(item.id, 'delete', 'is-danger', 'trash-alt');
    tdNumber.textContent = ++counter;
    tdDate.textContent = item.date;
    tdBand.textContent = item.band;
    tdPlace.textContent = item.place;
    tdTicket.textContent = item.ticket;
    append(tbody, tr);
    append(tr, tdNumber);
    append(tr, tdDate);
    append(tr, tdBand);
    append(tr, tdPlace);
    append(tr, tdTicket);
    append(tr, tdDelete);
    append(tdDelete, btnDelete);
  });
};

const populateTable = (records, target) => {
  const tbody = document.getElementById(`${target}-data`);
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

export { modal, populateRecitalTable, prepareDelete, populateTable };
