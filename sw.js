/* ============================================
   STIKMANIA - Service Worker v2.0
   Funciona con cualquier dominio (usa rutas relativas).
   ============================================ */

const VERSION = 'stikmania-v2.0';

const CORE = [
    '/',
    '/index.html',
    '/galeria.html',
    '/terminos.html',
    '/privacidad.html',
    '/manifest.json',
    '/assets/data/packs.js'
];

const CACHE_CORE   = VERSION + '-core';
const CACHE_PAGES  = VERSION + '-pages';
const CACHE_DATA   = VERSION + '-data';
const CACHE_ASSETS = VERSION + '-assets';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_CORE)
            .then(cache => Promise.all(
                CORE.map(url => cache.add(url).catch(() => null))
            ))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => !key.startsWith(VERSION))
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    if (req.mode === 'navigate') {
        if (url.origin !== location.origin) return;
        event.respondWith(networkFirst(req, CACHE_PAGES, '/index.html'));
        return;
    }

    if (url.pathname.endsWith('packs.js') ||
        url.pathname.endsWith('manifest.json')) {
        event.respondWith(networkFirst(req, CACHE_DATA));
        return;
    }

    if (url.origin === location.origin ||
        url.hostname.endsWith('fonts.googleapis.com') ||
        url.hostname.endsWith('fonts.gstatic.com')) {
        event.respondWith(cacheFirst(req, CACHE_ASSETS));
        return;
    }
});

async function networkFirst(req, cacheName, fallbackUrl) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
    } catch (err) {
        const hit = await cache.match(req);
        if (hit) return hit;
        if (fallbackUrl) {
            const fb = await caches.match(fallbackUrl);
            if (fb) return fb;
        }
        return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
    }
}

async function cacheFirst(req, cacheName) {
    const cache = await caches.open(cacheName);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) {
            cache.put(req, res.clone());
            trimCache(cacheName, 120);
        }
        return res;
    } catch (err) {
        return Response.error();
    }
}

async function trimCache(cacheName, max) {
    const cache = await caches.open(cacheName);
    let keys = await cache.keys();
    while (keys.length > max) {
        await cache.delete(keys[0]);
        keys = await cache.keys();
    }
}