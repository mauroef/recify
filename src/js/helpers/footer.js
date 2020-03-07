export default class Footer {
  static setYear() {
    document.querySelector('.year').textContent =
      ' ' + new Date().getFullYear();
  }
}
