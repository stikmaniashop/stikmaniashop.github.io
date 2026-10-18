export class Menu {
  constructor() {
    this.init();
  }

  init() {
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('menu-drawer');
    const overlay = document.getElementById('menu-overlay');
    const close = document.getElementById('menu-close');

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
      });

      if (close) {
        close.addEventListener('click', () => this.close());
      }
      if (overlay) {
        overlay.addEventListener('click', () => this.close());
      }
    }
  }

  close() {
    const drawer = document.getElementById('menu-drawer');
    const overlay = document.getElementById('menu-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

window.closeMenu = () => {
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('menu-overlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
};