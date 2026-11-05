/* ============================================
   STIKMANIA - Service Worker v4.1
   --------------------------------------------
   NOVEDADES vs v4.0:
   · JS y datos same-origin (/assets/*.js, packs.js…) ahora son
     STALE-WHILE-REVALIDATE: el usuario ve la web al instante desde caché
     y los cambios de precios/packs llegan en la visita siguiente
     SIN tocar VERSION. (En v4.0 quedaban cache-first y no se renovaban.)
   · PRECACHE incluye guia.html, referidos.html y sector-cafe.html:
     un usuario instalado puede abrirlas offline sin haberlas visitado.
   · Se mantiene: SWR de navegación, tope de 300 imágenes,
     SKIP_WAITING para el aviso de "nueva versión" (sw-update.js).

   CUÁNDO CAMBIAR VERSION:
   · Cambiaste HTML/CSS/JS de lógica o fuentes del shell → bump (v4.2…)
   · Solo imágenes nuevas de packs/galería → NO hace falta (runtime).
   · Cambios en packs.js/precios → NO hace falta (SWR los renueva solo).
   ============================================ */

const VERSION = 'stikmania-v4.1';
const SHELL_CACHE = VERSION + '-shell';
const IMAGE_CACHE = VERSION + '-images';
const IMAGE_LIMIT = 300;

/* === SOLO EL SHELL + páginas de marketing offline === */
const PRECACHE = [
    '/', '/index.html', '/galeria.html', '/terminos.html', '/privacidad.html',
    '/guia.html', '/referidos.html', '/sector-cafe.html',
    '/manifest.json', '/assets/data/packs.js',
    '/assets/js/consent.js', '/assets/js/recs.js', '/assets/js/stik-offline.js', '/assets/js/sw-update.js',
    '/assets/fonts/PermanentMarker-Regular.ttf', '/assets/fonts/PermanentMarker.ttf', '/assets/fonts/permanent-marker-regular.ttf',
    '/images/favicon.png', '/images/icon-192.png', '/images/icon-512.png',
    '/images/logo white.png', '/images/logo-white.png'
];

/* ---------- INSTALACIÓN: solo el shell, rápido ---------- */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then(cache => Promise.all(PRECACHE.map(url => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

/* ---------- ACTIVACIÓN: borra cachés de versiones viejas ---------- */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

/* ---------- MENSAJES desde la página ---------- */
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
    if (event.data && event.data.type === 'CLEAR_ALL') {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
});

/* ---------- HELPERS DE CACHÉ ---------- */
async function trimCache(cacheName, maxEntries) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
        await Promise.all(keys.slice(0, keys.length - maxEntries).map(k => cache.delete(k)));
    }
}

/* 1) NAVEGACIÓN stale-while-revalidate */
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

/* 2) JS Y DATOS same-origin: stale-while-revalidate */
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

/* 3) IMÁGENES: cache-first con tope de 300 */
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
    } catch (e) {
        return Response.error();
    }
}

/* 4) RESTO (fuentes, manifest): cache-first + guardado al primer uso */
async function cacheFirst(req) {
    const cache = await caches.open(SHELL_CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) await cache.put(req, res.clone());
        return res;
    } catch (e) {
        return Response.error();
    }
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