export class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('stikmania_cart') || '[]');
    this.render();
  }

  add(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
    this.render();
  }

  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem('stikmania_cart', JSON.stringify(this.items));
  }

  render() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.classList.toggle('hidden', count === 0);
    }
  }
}

// Hacer disponible globalmente
window.cart = new Cart();
window.addToCart = (product) => window.cart.add(product);
window.removeFromCart = (id) => window.cart.remove(id);