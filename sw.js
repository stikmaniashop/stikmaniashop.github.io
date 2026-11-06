/* ============================================
   STIKMANIA - Service Worker v4.2
   --------------------------------------------
   NOVEDADES vs v4.0 / v4.1:
   · PRECACHE incluye: guia.html, referidos.html, sector-cafe.html,
     assets/js/recs.js, assets/js/stik-offline.js, assets/js/sw-update.js,
     assets/js/qr-morph.js. Así un usuario instalado puede abrir
     cualquier página offline sin haberla visitado.
   · JS y datos same-origin: stale-while-revalidate (SWR) para que
     cambios en packs.js/precios lleguen sin bump de VERSION.
   · Imágenes runtime cache-first con tope de 300.
   · qr-web.png NO se precachea: se cachea al primer uso (runtime).
   · SKIP_WAITING para el aviso de "nueva versión" (sw-update.js).

   CUÁNDO CAMBIAR VERSION:
   · HTML/CSS/JS de lógica o fuentes → bump (v4.3…)
   · Solo imágenes nuevas → NO hace falta.
   · Cambios en packs.js/precios → NO hace falta (SWR los renueva).
   ============================================ */

const VERSION = 'stikmania-v4.2';
const SHELL_CACHE = VERSION + '-shell';
const IMAGE_CACHE = VERSION + '-images';
const IMAGE_LIMIT = 300;

/* === SHELL + páginas de marketing offline + módulos === */
const PRECACHE = [
    '/', '/index.html', '/galeria.html', '/terminos.html', '/privacidad.html',
    '/guia.html', '/referidos.html', '/sector-cafe.html',
    '/manifest.json', '/assets/data/packs.js',
    '/assets/js/consent.js', '/assets/js/recs.js', '/assets/js/stik-offline.js',
    '/assets/js/sw-update.js', '/assets/js/qr-morph.js',
    '/assets/fonts/PermanentMarker-Regular.ttf', '/assets/fonts/PermanentMarker.ttf', '/assets/fonts/permanent-marker-regular.ttf',
    '/images/favicon.png', '/images/icon-192.png', '/images/icon-512.png',
    '/images/logo white.png', '/images/logo-white.png'
];

/* ---------- INSTALACIÓN ---------- */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then(cache => Promise.all(PRECACHE.map(url => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

/* ---------- ACTIVACIÓN ---------- */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

/* ---------- MENSAJES ---------- */
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
    if (event.data && event.data.type === 'CLEAR_ALL') {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
});

/* ---------- HELPERS ---------- */
async function trimCache(cacheName, maxEntries) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
        await Promise.all(keys.slice(0, keys.length - maxEntries).map(k => cache.delete(k)));
    }
}

async function handleNavigation(req) {
    const cache = await caches.open(SHELL_CACHE);
    const cached = await cache.match(req);
    const networkFetch = fetch(req)
        .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => null);
    if (cached) return cached;
    const fresh = await networkFetch;
    return fresh || cache.match('/index.html');
}

async function handleSWR(req) {
    const cache = await caches.open(SHELL_CACHE);
    const cached = await cache.match(req);
    const networkFetch = fetch(req)
        .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => null);
    if (cached) return cached;
    const fresh = await networkFetch;
    return fresh || Response.error();
}

async function handleImage(req) {
    const cache = await caches.open(IMAGE_CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) {
            await cache.put(req, res.clone());
            trimCache(IMAGE_CACHE, IMAGE_LIMIT);
        }
        return res;
    } catch (e) { return Response.error(); }
}

async function cacheFirst(req) {
    const cache = await caches.open(SHELL_CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) await cache.put(req, res.clone());
        return res;
    } catch (e) { return Response.error(); }
}

/* ---------- FETCH ---------- */
self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const isSameOrigin = url.origin === location.origin;
    const isFonts = url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com');
    if (!isSameOrigin && !isFonts) return;

    if (req.mode === 'navigate') { event.respondWith(handleNavigation(req)); return; }

    const isDataOrScript = isSameOrigin && (
        req.destination === 'script' ||
        url.pathname.endsWith('.js') ||
        url.pathname.indexOf('/assets/data/') === 0
    );
    if (isDataOrScript) { event.respondWith(handleSWR(req)); return; }

    const isImage = req.destination === 'image' || /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(url.pathname);
    if (isImage) { event.respondWith(handleImage(req)); return; }

    event.respondWith(cacheFirst(req));
});