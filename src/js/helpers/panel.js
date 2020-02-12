class Panel {
  constructor(type) {
    this.type = type; // create || search
  }

  handleCreate() {
    const input = document.querySelector('#panel-create input[type=text]');
    const btn = document.querySelector('#panel-create button');
    btn.addEventListener('click', () => {
      console.log('do the API thing', input.value);
    });
  }

  handleSearch() {
    const input = document.querySelector('#panel-search input[type=text]');
    const btn = document.querySelector('#panel-search button');
    btn.addEventListener('click', () => {
      console.log('do the API thing with search', input.value);
    });
  }
}

export default Panel;
