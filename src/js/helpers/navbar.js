export default class Navbar {
  constructor() {
    this.loginBtn = document.querySelector('.navbar .login');
    this.userContainer = document.querySelector('.navbar .user-container');
    this.logoutBtn = document.querySelector('.navbar .logout');
  }

  switchView(isLoggedIn, name, photoUrl) {
    if (isLoggedIn) {
      this.loginBtn.style.display = 'none';
      this.userContainer.style.display = 'inline-flex';
      this.userContainer.querySelector(
        ' .user-name'
      ).childNodes[2].textContent = name;
      this.userContainer.querySelector('.user-avatar').src = photoUrl;
    } else {
      this.loginBtn.style.display = 'inline-flex';
      this.userContainer.style.display = 'none';
    }
  }

  static handleHamburguerButton = () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  };
}
