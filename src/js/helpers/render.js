/* eslint-disable no-undef */
const createNode = element => document.createElement(element);

const createButton = id => {
  const button = document.createElement('a');
  button.classList.add('button', 'is-rounded', 'is-link');
  button.setAttribute('id', `edit-${id}`);
  button.setAttribute('href', '#');
  button.innerHTML = 'Edit';
  return button;
};

const append = (parent, el) => parent.appendChild(el);

export { createNode, createButton, append };
