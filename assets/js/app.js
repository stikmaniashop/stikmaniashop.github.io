import { Router } from './router.js';
import { Cart } from './components/cart.js';
import { Menu } from './components/menu.js';

const app = {
  init() {
    this.router = new Router();
    this.cart = new Cart();
    this.menu = new Menu();
    this.router.start();
  }
};

app.init();