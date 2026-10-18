const CACHE_NAME = 'stikmania-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/app.js',
  '/assets/js/router.js',
  '/assets/js/components/cart.js',
  '/assets/js/components/menu.js',
  '/templates/header.html',
  '/templates/footer.html',
  '/templates/navigation.html',
  '/templates/pages/home.html',
  '/templates/pages/shop.html',
  '/templates/pages/empresas.html',
  '/templates/pages/artesanos.html',
  '/templates/pages/gallery.html',
  '/templates/pages/blog-stickers.html',
  '/templates/pages/blog-branding.html',
  '/templates/pages/blog-web.html',
  '/assets/data/products.json',
  '/images/logoW.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});