import { products } from '../data/products.js';

export function init() {
  renderProducts(products);
  initFilters();
  initCalculator();
  initFAQ();
}

function renderProducts(productsToRender) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  grid.innerHTML = productsToRender.map(product => `
    <div class="product-card">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : ''}
        <svg class="product-icon" viewBox="0 0 24 24">${product.icon}</svg>
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</span>
          <span class="reviews">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price} USD</span>
          ${product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : ''}
          ${product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          Añadir
        </button>
      </div>
    </div>
  `).join('');
}

function initFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
      renderProducts(filtered);
    });
  });
}

function initCalculator() {
  const submitBtn = document.getElementById('calc-submit');
  if (!submitBtn) return;
  
  submitBtn.addEventListener('click', () => {
    const qty = parseInt(document.getElementById('calc-qty').value);
    const material = document.getElementById('calc-material').value;
    const width = parseFloat(document.getElementById('calc-width').value);
    const height = parseFloat(document.getElementById('calc-height').value);
    
    const prices = {
      vinyl: 0.15,
      photo: 0.10,
      transparent: 0.20
    };
    
    const pricePerUnit = prices[material] * width * height;
    const total = pricePerUnit * qty;
    
    document.getElementById('calc-summary').textContent = `${qty} stickers ${material} ${width}x${height}cm`;
    document.getElementById('calc-price').textContent = `$${total.toFixed(2)} USD`;
    document.getElementById('calc-result').classList.add('show');
    
    const message = `Hola! Quiero cotizar ${qty} stickers de ${material}, ${width}x${height}cm. Presupuesto: $${total.toFixed(2)} USD`;
    document.getElementById('calc-whatsapp').href = `https://wa.me/5359758756?text=${encodeURIComponent(message)}`;
  });
}

function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');
      answer.classList.toggle('show');
      toggle.textContent = answer.classList.contains('show') ? '−' : '+';
    });
  });
}