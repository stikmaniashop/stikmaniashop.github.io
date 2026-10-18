/* ============================================
   STIKMANIA - JavaScript Principal
   Versión 7.0 - SPA con Router Hash
   ============================================ */

// === DATOS DE PRODUCTOS ===
const products = [
    { id: 1, name: "Pack Anime Legendario", nameEn: "Legendary Anime Pack", category: "anime", price: 3, oldPrice: 4, discount: 25, rating: 5, reviews: 24, badge: "TOP", badgeType: "hot", description: "Los personajes más icónicos del anime.", descriptionEn: "The most iconic anime characters.", specs: ["24 stickers", "4-7 cm", "Vinilo impermeable"], specsEn: ["24 stickers", "4-7 cm", "Waterproof vinyl"], icon: "anime" },
    { id: 2, name: "Pack Gamer Ultimate", nameEn: "Ultimate Gamer Pack", category: "gamer", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 18, badge: null, badgeType: null, description: "Para verdaderos gamers.", descriptionEn: "For true gamers.", specs: ["30 stickers", "4-8 cm", "Vinilo impermeable"], specsEn: ["30 stickers", "4-8 cm", "Waterproof vinyl"], icon: "gamer" },
    { id: 3, name: "Pack Cine y Series", nameEn: "Movies and Series Pack", category: "cine", price: 3, oldPrice: null, discount: 0, rating: 4, reviews: 15, badge: "NEW", badgeType: "new", description: "Marvel, Star Wars, Netflix.", descriptionEn: "Marvel, Star Wars, Netflix.", specs: ["20 stickers", "5-8 cm", "Vinilo impermeable"], specsEn: ["20 stickers", "5-8 cm", "Waterproof vinyl"], icon: "cine" },
    { id: 4, name: "Pack Street y Skate", nameEn: "Street and Skate Pack", category: "skate", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 12, badge: null, badgeType: null, description: "Estilo urbano puro.", descriptionEn: "Pure street style.", specs: ["15 stickers", "6-10 cm", "Alta resistencia"], specsEn: ["15 stickers", "6-10 cm", "High resistance"], icon: "skate" },
    { id: 5, name: "Pack Stikmania", nameEn: "Stikmania Pack", category: "stikmania", price: 3, oldPrice: null, discount: 0, rating: 5, reviews: 30, badge: "EXCLUSIVE", badgeType: "hot", description: "Stickers exclusivos @sti_kmania.", descriptionEn: "Exclusive @sti_kmania stickers.", specs: ["18 stickers", "5-7 cm", "Vinilo impermeable"], specsEn: ["18 stickers", "5-7 cm", "Waterproof vinyl"], icon: "stikmania" },
    { id: 6, name: "Pack Personalizado", nameEn: "Custom Pack", category: "personalizado", price: 2, oldPrice: null, discount: 0, rating: 5, reviews: 45, badge: null, badgeType: null, description: "Envía tus diseños.", descriptionEn: "Send your designs.", specs: ["10-100 unidades", "Tú eliges", "Diseño gratis"], specsEn: ["10-100 units", "You choose", "Free design"], icon: "custom" }
];

const productIcons = {
    anime: '<svg viewBox="0 0 24 24"><path d="M4 6c4-2 12-2 16 0"/><path d="M6 6v14"/><path d="M18 6v14"/><path d="M4 10h16"/><path d="M12 6v4"/></svg>',
    gamer: '<svg viewBox="0 0 24 24"><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="11" r="1"/><circle cx="17" cy="13" r="1"/></svg>',
    cine: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14"/><path d="M17 5v14"/></svg>',
    skate: '<svg viewBox="0 0 24 24"><path d="M3 14c0 1.5 1.5 2 3 2h12c1.5 0 3-.5 3-2"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/></svg>',
    stikmania: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>',
    custom: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
};

// === ESTADO GLOBAL ===
let cart = JSON.parse(localStorage.getItem('stikmania_cart') || '[]');
let currentFilter = 'all';
let currentLang = localStorage.getItem('stikmania_lang') || 'es';

// === FUNCIONES GLOBALES (para onclick en HTML) ===
window.addToCart = function(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('stikmania_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(currentLang === 'es' ? 'Añadido al carrito' : 'Added to cart', 'success');
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('stikmania_cart', JSON.stringify(cart));
    updateCartUI();
};

window.closeMenu = function() {
    const drawer = document.getElementById('menu-drawer');
    const overlay = document.getElementById('menu-overlay');
    const toggle = document.getElementById('menu-toggle');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing STIKMANIA...');
    
    try { initLoader(); } catch(e) { console.error('Loader error:', e); }
    try { initMenu(); } catch(e) { console.error('Menu error:', e); }
    try { initCart(); } catch(e) { console.error('Cart error:', e); }
    try { initLanguage(); } catch(e) { console.error('Language error:', e); }
    try { initScrollReveal(); } catch(e) { console.error('ScrollReveal error:', e); }
    try { initFAQ(); } catch(e) { console.error('FAQ error:', e); }
    try { initSmoothScroll(); } catch(e) { console.error('SmoothScroll error:', e); }
    try { initDynamicYear(); } catch(e) { console.error('Year error:', e); }
    
    // Router SPA
    try { initRouter(); } catch(e) { console.error('Router error:', e); }
    
    // Productos (solo en página de tienda)
    if (document.getElementById('products-grid')) {
        try { renderProducts(products); } catch(e) { console.error('Products error:', e); }
        try { initFilters(); } catch(e) { console.error('Filters error:', e); }
    }
    
    console.log('STIKMANIA initialized successfully');
});

// === LOADER ===
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 400);
    }
}

// === MENÚ ===
function initMenu() {
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('menu-drawer');
    const overlay = document.getElementById('menu-overlay');
    const close = document.getElementById('menu-close');
    
    if (!toggle || !drawer) return;
    
    toggle.addEventListener('click', () => {
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        toggle.classList.add('active');
    });
    
    if (close) {
        close.addEventListener('click', window.closeMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', window.closeMenu);
    }
    
    // Cerrar menú al hacer clic en enlaces
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', window.closeMenu);
    });
}

// === CARRITO ===
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartBtn || !cartDrawer) return;
    
    updateCartUI();
    
    cartBtn.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
    });
    
    const closeCart = () => {
        cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    };
    
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartItems) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (totalItems > 0) {
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.remove('hidden');
        }
    } else {
        if (cartCount) cartCount.classList.add('hidden');
    }
    
    if (cartTotal) {
        cartTotal.textContent = '$' + totalPrice.toFixed(2) + ' USD';
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
    } else {
        cartItems.innerHTML = cart.map(item => 
            '<div class="cart-item">' +
            '<div class="cart-item-info">' +
            '<div class="cart-item-title">' + (currentLang === 'es' ? item.name : item.nameEn) + '</div>' +
            '<div class="cart-item-price">$' + item.price + ' USD x ' + item.quantity + '</div>' +
            '</div>' +
            '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">&times;</button>' +
            '</div>'
        ).join('');
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast(currentLang === 'es' ? 'Carrito vacío' : 'Cart is empty', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '*PEDIDO STIKMANIA*\n\n';
    
    cart.forEach(item => {
        message += '• ' + (currentLang === 'es' ? item.name : item.nameEn) + ' x' + item.quantity + ' - $' + (item.price * item.quantity).toFixed(2) + ' USD\n';
    });
    
    message += '\n*Total: $' + total.toFixed(2) + ' USD*';
    window.open('https://wa.me/5359758756?text=' + encodeURIComponent(message), '_blank');
}

// === IDIOMA ===
function initLanguage() {
    const langBtn = document.getElementById('lang-toggle');
    if (!langBtn) return;
    
    langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('stikmania_lang', currentLang);
        langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
        
        if (document.getElementById('products-grid')) {
            renderProducts(currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter));
        }
        updateCartUI();
    });
}

// === ROUTER SPA ===
function initRouter() {
    const routes = {
        '/': 'home',
        '/tienda': 'shop',
        '/empresas': 'empresas',
        '/artesanos': 'artesanos',
        '/galeria': 'gallery',
        '/blog/stickers': 'blog-stickers',
        '/blog/branding': 'blog-branding',
        '/blog/web': 'blog-web'
    };
    
    function navigate() {
        const path = window.location.hash.slice(1) || '/';
        const page = routes[path] || 'home';
        loadPage(page);
    }
    
    async function loadPage(page) {
        const main = document.getElementById('main');
        if (!main) return;
        
        try {
            const response = await fetch('templates/pages/' + page + '.html');
            if (!response.ok) throw new Error('Page not found');
            main.innerHTML = await response.text();
            
            // Actualizar bottom nav
            document.querySelectorAll('.bottom-nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.route === '/' + page || (page === 'home' && item.dataset.route === '/')) {
                    item.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Re-inicializar funciones que dependen del DOM
            setTimeout(() => {
                initScrollReveal();
                initFAQ();
                initSmoothScroll();
                
                if (document.getElementById('products-grid')) {
                    renderProducts(products);
                    initFilters();
                }
            }, 100);
            
        } catch (e) {
            console.error('Error loading page:', e);
            main.innerHTML = '<div class="container" style="padding-top: 100px;"><h2>Página no encontrada</h2><p>El contenido no pudo cargarse.</p></div>';
        }
    }
    
    window.addEventListener('hashchange', navigate);
    navigate();
}

// === PRODUCTOS ===
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = productsToRender.map(product => 
        '<div class="product-card">' +
        '<div class="product-image">' +
        (product.badge ? '<span class="product-badge ' + product.badgeType + '">' + product.badge + '</span>' : '') +
        (productIcons[product.icon] || '') +
        '</div>' +
        '<div class="product-info">' +
        '<div class="product-title">' + (currentLang === 'es' ? product.name : product.nameEn) + '</div>' +
        '<div class="product-rating">' +
        '<span class="stars">' + '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating) + '</span>' +
        '<span class="reviews">(' + product.reviews + ')</span>' +
        '</div>' +
        '<div class="product-price">' +
        '<span class="price-current">$' + product.price + ' USD</span>' +
        (product.oldPrice ? '<span class="price-old">$' + product.oldPrice + '</span>' : '') +
        (product.discount > 0 ? '<span class="discount-badge">-' + product.discount + '%</span>' : '') +
        '</div>' +
        '<button class="add-to-cart-btn" onclick="addToCart(products.find(p => p.id === ' + product.id + '))">' +
        (currentLang === 'es' ? 'Añadir' : 'Add') +
        '</button>' +
        '</div>' +
        '</div>'
    ).join('');
}

function initFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const filter = chip.dataset.filter;
            currentFilter = filter;
            renderProducts(filter === 'all' ? products : products.filter(p => p.category === filter));
        });
    });
}

// === SCROLL REVEAL ===
function initScrollReveal() {
    function reveal() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);
    reveal();
}

// === FAQ ===
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
                if (toggle) toggle.textContent = '+';
            } else {
                answer.classList.add('show');
                if (toggle) toggle.textContent = '−';
            }
        });
    });
}

// === SMOOTH SCROLL (CORREGIDO) ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Ignorar enlaces de rutas SPA (empiezan con #/)
            if (targetId.startsWith('#/')) {
                return; // Dejar que el router maneje la navegación
            }
            
            // Solo manejar anclas internas (como #cotizador, #tienda)
            if (targetId === '#' || targetId.length < 2) return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ 
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

// === TOAST ===
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span class="toast-icon">' + (type === 'success' ? '✅' : '❌') + '</span><span class="toast-message">' + message + '</span>';
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// === AÑO DINÁMICO ===
function initDynamicYear() {
    document.querySelectorAll('.current-year').forEach(s => {
        s.textContent = new Date().getFullYear();
    });
}