/* ============================================
   STIKMANIA - Aviso de "nueva versión disponible"
   Detecta un SW esperando y ofrece actualizar al instante.
   Sin red adicional: solo lifecycle del Service Worker.
   ============================================ */
(function () {
'use strict';
var requestedUpdate = false;
var dismissedThisSession = false;

function isEN(){ try { return localStorage.getItem('stikmania_lang') === 'en'; } catch (e) { return false; } }
function L(es, en){ return isEN() ? en : es; }

function injectCSS(){
    var st = document.createElement('style');
    st.textContent =
        '#swup-bar{position:fixed;top:0;left:0;right:0;z-index:150;background:#0f0f0f;border-bottom:1px solid #00FF00;' +
        'padding:10px 16px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;' +
        'font-family:Inter,system-ui,sans-serif;font-size:0.85rem;color:#ccc;box-shadow:0 8px 30px rgba(0,0,0,0.6);}' +
        '#swup-bar button{border-radius:6px;padding:9px 14px;font-weight:700;font-size:0.82rem;cursor:pointer;min-height:40px;font-family:inherit;}' +
        '#swup-bar .swup-go{background:#00FF00;color:#000;border:1px solid #00FF00;}' +
        '#swup-bar .swup-no{background:none;color:#888;border:1px solid #444;}' +
        '#swup-bar button:focus-visible{outline:2px solid #00FF00;outline-offset:2px;}';
    document.head.appendChild(st);
}

function showBar(reg){
    if (dismissedThisSession || document.getElementById('swup-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'swup-bar';
    bar.setAttribute('role', 'status');
    var msg = document.createElement('span');
    msg.textContent = L('Hay una versión nueva de la web lista para usar.', 'A new version of the site is ready to use.');
    var go = document.createElement('button');
    go.className = 'swup-go'; go.type = 'button';
    go.textContent = L('Actualizar ahora', 'Update now');
    go.addEventListener('click', function(){
        requestedUpdate = true;
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
    var no = document.createElement('button');
    no.className = 'swup-no'; no.type = 'button';
    no.textContent = L('Después', 'Later');
    no.addEventListener('click', function(){ dismissedThisSession = true; bar.remove(); });
    bar.appendChild(msg); bar.appendChild(go); bar.appendChild(no);
    document.body.appendChild(bar);
}

function watch(reg){
    if (!reg) return;
    if (reg.waiting && navigator.serviceWorker.controller) showBar(reg);
    reg.addEventListener('updatefound', function(){
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function(){
            if (nw.state === 'installed' && navigator.serviceWorker.controller) showBar(reg);
        });
    });
    navigator.serviceWorker.addEventListener('controllerchange', function(){
        if (requestedUpdate) location.reload();
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
        injectCSS();
        navigator.serviceWorker.register('sw.js')
            .then(watch)
            .catch(function(){});
    });
}
})();