class Panel {
  constructor(type) {
    this.type = type; // create || search
  }

  handlePanelEvents(apiClass) {
    const input = document.querySelector(
      `#panel-${this.type} input[type=text]`
    );
    const btn = document.querySelector(`#panel-${this.type} button`);
    btn.addEventListener('click', () => {
      if (this.type === 'create') {
        apiClass
          .create(input.value)
          .then(() => console.log('ejecuto bien la req.'));
      }
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
