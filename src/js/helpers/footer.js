export default class Footer {
  constructor() {
    this.setYear();
  }

  setYear() {
    document.querySelector('.year').textContent =
      ' ' + new Date().getFullYear();
  }
}
