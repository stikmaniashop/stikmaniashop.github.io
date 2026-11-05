/* ============================================
   STIKMANIA - Service Worker v3.0 (OFFLINE PERMANENTE)
   --------------------------------------------
   REGLA DE ORO: todo se descarga UNA sola vez.
   Cuando subas contenido nuevo (packs, imágenes, HTML),
   CAMBIA el número de VERSION (ej: v3.1, v3.2...).
   Eso renueva el caché de todos tus usuarios automáticamente.
   Si NO cambias contenido, no toques nada: nadie re-descarga nada.
   ============================================ */

const VERSION = 'stikmania-v3.0';
const CACHE = VERSION + '-full';

/* === TODO el sitio: páginas, núcleo, fuentes, íconos, galería, logos y 78 stickers === */
const PRECACHE = [
    '/', '/index.html', '/galeria.html', '/terminos.html', '/privacidad.html',
    '/manifest.json', '/assets/data/packs.js', '/assets/js/consent.js',
    '/assets/fonts/PermanentMarker-Regular.ttf', '/assets/fonts/PermanentMarker.ttf', '/assets/fonts/permanent-marker-regular.ttf',
    '/images/favicon.png', '/images/icon-192.png', '/images/icon-512.png', '/images/OG_IMAGE.png',
    '/images/logo white.png', '/images/logo-white.png',
    /* galería */
    '/images/gallery/delitaystickers_envase de cristal.png',
    '/images/gallery/munchies_stickers envoltorio.png',
    '/images/gallery/sticker_envase de plastico.jpeg',
    '/images/gallery/verda_stickers.png',
    '/images/gallery/Laptop_HDD_iPhone.jpg',
    '/images/gallery/B_and_W.jpg',
    '/images/gallery/santa_cruz.jpg',
    '/images/gallery/thrasher_en_finger.jpg',
    '/images/gallery/atono.jpeg',
    '/images/gallery/WhatsApp Image 2026-10-12 at 11.40.08 PM.jpeg',
    /* logos entidades */
    '/images/logos/munchies.jpg', '/images/logos/Nova_LOGO.png', '/images/logos/ashsoap_logo.png',
    '/images/logos/deli.png', '/images/logos/magnum_logo.png', '/images/logos/Sin título-1.png',
    /* ARGOLITOS */
    '/images/packs/Argolitos/burundanga cat.jpg', '/images/packs/Argolitos/cogiendo un aire.png',
    '/images/packs/Argolitos/es de pinga mazinger.jpg', '/images/packs/Argolitos/fucktus.jpg',
    '/images/packs/Argolitos/jesus te Cogi.jpg', '/images/packs/Argolitos/no me quemes - sticker.jpg',
    '/images/packs/Argolitos/pato que pinga eh.jpg', '/images/packs/Argolitos/rana en talla.jpg',
    '/images/packs/Argolitos/silla_ahi tu sabe.jpg',
    /* DISLEXIA */
    '/images/packs/DISLEXIA/mesero en el plato - sticker.jpg', '/images/packs/DISLEXIA/Sun Love - sticker.jpg',
    /* DROP-DEAD */
    '/images/packs/DROP-DEAD/dead cat.jpg', '/images/packs/DROP-DEAD/dead cheetah.jpg',
    '/images/packs/DROP-DEAD/dead eye.jpg', '/images/packs/DROP-DEAD/dead fish.jpg',
    '/images/packs/DROP-DEAD/dead flash.jpg', '/images/packs/DROP-DEAD/dead hiena.jpg',
    '/images/packs/DROP-DEAD/dead oldman.jpg',
    /* ENERGY */
    '/images/packs/ENERGY/OJOturco.jpg',
    /* FOODER */
    '/images/packs/FOODer/avocato.jpg',
    /* FUNTER */
    '/images/packs/FUNTER/artistcheck.jpg', '/images/packs/FUNTER/ego.jpg',
    '/images/packs/FUNTER/idiotcheck.jpg', '/images/packs/FUNTER/karma.jpg',
    '/images/packs/FUNTER/PODSpara mucha gente.jpg',
    /* HE ARTS */
    '/images/packs/HE ARTS/1.jpg', '/images/packs/HE ARTS/2.jpg', '/images/packs/HE ARTS/3.jpg',
    '/images/packs/HE ARTS/4.jpg', '/images/packs/HE ARTS/5.jpg', '/images/packs/HE ARTS/6.jpg',
    '/images/packs/HE ARTS/7.jpg',
    /* ILLUS */
    '/images/packs/ILLUS/Batmanmoco.jpg', '/images/packs/ILLUS/chica con ojos amarillo.jpg',
    '/images/packs/ILLUS/cooldog.jpg', '/images/packs/ILLUS/finger sk8.jpg',
    '/images/packs/ILLUS/girlSha.jpg', '/images/packs/ILLUS/headboom.jpg',
    '/images/packs/ILLUS/ilus_gato con ojos amarillos.jpg',
    /* LINE */
    '/images/packs/LINE/fukcat.jpg',
    /* LOS SALVAJES */
    '/images/packs/LOS SALVAJES/cerdo volador.jpg', '/images/packs/LOS SALVAJES/FUCK_AI - Sticker.jpg',
    '/images/packs/LOS SALVAJES/Jódanse - sticker.jpg', '/images/packs/LOS SALVAJES/monkhigh.jpg',
    '/images/packs/LOS SALVAJES/nutria sk8ter.jpg', '/images/packs/LOS SALVAJES/perro callejero.jpg',
    /* MAD GIRLS */
    '/images/packs/MAD-GIRLS/blue eyes smoking.jpg', '/images/packs/MAD-GIRLS/cabeza hueca.jpg',
    '/images/packs/MAD-GIRLS/intuición femenina - Sticker.jpg', '/images/packs/MAD-GIRLS/MonaConflow.jpg',
    '/images/packs/MAD-GIRLS/tentagua.jpg',
    /* NONCRITICS */
    '/images/packs/Noncritics/comunista cleaner.jpg', '/images/packs/Noncritics/labase.jpg',
    /* PSYCKER */
    '/images/packs/PSYCKER/clancy.jpg', '/images/packs/PSYCKER/Consuelo - sticker.jpg',
    '/images/packs/PSYCKER/Préndeme - sticker.jpg',
    /* SK8-UR-VANS */
    '/images/packs/SK8-UR-VANS/aliensk8ter.jpg', '/images/packs/SK8-UR-VANS/mariask8.jpg',
    '/images/packs/SK8-UR-VANS/mini sk8 pills.jpg', '/images/packs/SK8-UR-VANS/Rollingsk8.jpg',
    '/images/packs/SK8-UR-VANS/sk8boro.jpg', '/images/packs/SK8-UR-VANS/sk8fall.jpg',
    '/images/packs/SK8-UR-VANS/sk8paletica.jpg', '/images/packs/SK8-UR-VANS/sk8pompom.jpg',
    '/images/packs/SK8-UR-VANS/sk8ter enredao.jpg', '/images/packs/SK8-UR-VANS/skateboll.jpg',
    '/images/packs/SK8-UR-VANS/vans.jpg',
    /* SMILEY FACE */
    '/images/packs/SmileyFACE/1.jpg', '/images/packs/SmileyFACE/2.jpg',
    /* TRA-NEO */
    '/images/packs/TRA-NEO/butterfly.jpg', '/images/packs/TRA-NEO/carpa.jpg',
    '/images/packs/TRA-NEO/kabuki.jpg', '/images/packs/TRA-NEO/TRA-PAN.jpg',
    '/images/packs/TRA-NEO/TRA-TIGER.jpg', '/images/packs/TRA-NEO/TRA-TIGER2.jpg',
    /* XXX */
    '/images/packs/XXX/xxx_1.jpg', '/images/packs/XXX/xxx_2.jpg', '/images/packs/XXX/xxx_milf.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => Promise.all(PRECACHE.map(url => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
    if (event.data && event.data.type === 'CLEAR_ALL') {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
});

/* === CACHE-FIRST ETERNO: si está en caché, NUNCA vuelve a la red === */
self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // Navegación: caché primero; si no está y hay red, guarda; si no, fallback al index
    if (req.mode === 'navigate') {
        if (url.origin !== location.origin) return;
        event.respondWith(
            caches.match(req).then(hit => hit ||
                fetch(req).then(res => {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(req, clone));
                    return res;
                }).catch(() => caches.match('/index.html'))
            )
        );
        return;
    }

    // Todo lo demás (imágenes, JS, fuentes, Google Fonts): cache-first + guardado en primer uso
    if (url.origin === location.origin ||
        url.hostname.endsWith('fonts.googleapis.com') ||
        url.hostname.endsWith('fonts.gstatic.com')) {
        event.respondWith(
            caches.match(req).then(hit => hit ||
                fetch(req).then(res => {
                    if (res && (res.ok || res.type === 'opaque')) {
                        const clone = res.clone();
                        caches.open(CACHE).then(c => c.put(req, clone));
                    }
                    return res;
                }).catch(() => Response.error())
            )
        );
    }
});