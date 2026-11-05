/* ============================================
   STIKMANIA - Consentimiento + Gestión de datos locales
   Sin cookies de terceros: solo localStorage + caché SW.
   ============================================ */
(function () {
    const KEY = 'stikmania_consent';

    function isEN() { return (localStorage.getItem('stikmania_lang') || 'es') === 'en'; }

    function injectCSS() {
        const st = document.createElement('style');
        st.textContent =
            '#stik-consent{position:fixed;bottom:0;left:0;right:0;z-index:260;background:#0f0f0f;border-top:1px solid #00FF00;padding:14px 16px calc(14px + env(safe-area-inset-bottom));display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-family:Inter,system-ui,sans-serif;font-size:0.8rem;color:#ccc;box-shadow:0 -8px 30px rgba(0,0,0,0.6);}' +
            '#stik-consent a{color:#00FF00;text-decoration:none;}' +
            '#stik-consent button{margin-left:auto;background:#00FF00;color:#000;border:none;border-radius:6px;padding:8px 16px;font-weight:700;cursor:pointer;font-family:inherit;}' +
            'body.consent-open .whatsapp-float{transform:translateY(-80px);}' +
            '@media(min-width:768px){#stik-consent{justify-content:center;}}';
        document.head.appendChild(st);
    }

    function showBanner() {
        if (localStorage.getItem(KEY)) return;
        document.body.classList.add('consent-open');
        const bar = document.createElement('div');
        bar.id = 'stik-consent';
        bar.innerHTML = isEN()
            ? '<span>We use local storage (no third-party cookies) for your cart, language and offline mode. <a href="privacidad.html#cookies">More info</a></span><button id="stik-consent-ok">Got it</button>'
            : '<span>Usamos almacenamiento local (sin cookies de terceros) para tu carrito, idioma y modo offline. <a href="privacidad.html#cookies">Más info</a></span><button id="stik-consent-ok">Entendido</button>';
        document.body.appendChild(bar);
        bar.querySelector('#stik-consent-ok').addEventListener('click', () => {
            localStorage.setItem(KEY, '1');
            bar.remove();
            document.body.classList.remove('consent-open');
        });
    }

    function clearAll() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
            navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_ALL' });
        }
        if (window.caches) caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))));
        ['stikmania_cart', 'stikmania_lang', 'stikmania_consent',
         'stikmania_recs_pref_v1', 'stikmania_recs_profile_v1', 'stikmania_recs_shown_v1']
            .forEach(k => localStorage.removeItem(k));
        setTimeout(() => location.reload(), 400);
    }
    window.STIKMANIA_STORAGE = { clearAll: clearAll };

    function injectClearButton() {
        const ul = document.querySelector('#menu-drawer .drawer-body ul');
        if (!ul) return;
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        li.innerHTML = '<a href="#" class="menu-link" id="clear-data-link" style="color:#FF3333;">' +
            '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
            (isEN() ? 'Clear local data' : 'Limpiar datos locales') + '</a>';
        ul.appendChild(li);
        li.querySelector('#clear-data-link').addEventListener('click', e => {
            e.preventDefault();
            if (confirm(isEN() ? 'Delete cart, language, cache and offline data?' : '¿Borrar carrito, idioma, caché y datos offline?')) clearAll();
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        injectCSS();
        showBanner();
        injectClearButton();
    });
})();