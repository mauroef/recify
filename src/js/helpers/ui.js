const createNode = (element) => document.createElement(element);

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

const editRow = (tableSelector, responseId, responseName) => {
  let rows = document.querySelectorAll(`#${tableSelector} > tr`);
  let rowsId = document.querySelectorAll(
    `#${tableSelector} > tr td:first-child`
  );
  let rowsName = document.querySelectorAll(
    `#${tableSelector} > tr td:nth-child(2)`
  );

  for (let i = 0; i < rows.length; i++)
    if (rowsId[i].innerText === responseId) {
      rowsName[i].innerText = responseName;
    }
};

const removeRow = (tableSelector, responseId) => {
  let rows = document.querySelectorAll(`#${tableSelector} > tr`);
  let rowsId = document.querySelectorAll(
    `#${tableSelector} > tr td:first-child`
  );

  for (let i = 0; i < rows.length; i++) {
    if (rowsId[i].innerText === responseId) {
      rows[i].parentNode.removeChild(rows[i]);
    }
  }
};

const showSpinner = (element, flag) => {
  if (flag) {
    element.classList.add('is-loading');
  } else {
    element.classList.remove('is-loading');
  }
};

const showTableLoader = (tableElement, flag) => {
  document.getElementById(tableElement).parentElement.style.display = flag
    ? 'none'
    : 'block';
  document.getElementById('loading-disc').style.display = flag
    ? 'block'
    : 'none';
};

const showTableEmpty = (tableElement, flag) => {
  document.getElementById(tableElement).parentElement.style.display = flag
    ? 'none'
    : 'block';
  document.getElementById('empty-list').style.display = flag ? 'block' : 'none';
};

const capitalize = (string) => {
  string = string.split(' ');

  for (var i = 0, x = string.length; i < x; i++) {
    string[i] = string[i][0].toUpperCase() + string[i].substr(1);
  }

  return string.join(' ');
};

export {
  createNode,
  append,
  createButton,
  createInput,
  removeInput,
  editRow,
  removeRow,
  showSpinner,
  showTableLoader,
  showTableEmpty,
  capitalize,
};
