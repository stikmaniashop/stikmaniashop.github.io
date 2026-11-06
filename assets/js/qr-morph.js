/* ============================================
   STIKMANIA - QR Morph v1
   El logo del header reaparece en el footer,
   se pixela y se fija como QR de la web.
   Sin librerías: canvas + 2 imágenes locales.
   Sin red: todo offline.
   ============================================ */
(function () {
'use strict';

var CFG = {
    enabled: true,
    logoSrc: 'images/logo white.png',
    logoAlt: 'images/logo-white.png',
    qrSrc: 'images/qr-web.png',
    grid: 24,
    durationMs: 1800,
    canvasCss: 220
};

function isEN(){ try { return localStorage.getItem('stikmania_lang') === 'en'; } catch (e) { return false; } }
function L(es, en){ return isEN() ? en : es; }

function injectCSS(){
    var st = document.createElement('style');
    st.textContent =
        '.qr-morph{max-width:520px;margin:0 auto 26px;padding:22px;border:1px dashed #224422;border-radius:16px;background:rgba(0,255,0,0.04);text-align:center;}' +
        '.qr-morph canvas{width:' + CFG.canvasCss + 'px;height:' + CFG.canvasCss + 'px;border-radius:10px;background:#fff;cursor:pointer;transition:box-shadow .4s ease;}' +
        '.qr-morph canvas.qr-done{box-shadow:0 0 24px rgba(0,255,0,0.35);}' +
        '.qr-morph .qr-msg{color:#bbb;font-size:0.88rem;line-height:1.6;margin:14px auto 10px;max-width:400px;}' +
        '.qr-morph .qr-msg strong{color:#00FF00;}' +
        '.qr-chip{display:inline-flex;align-items:center;gap:10px;background:#0f0f0f;border:1px solid #00FF00;border-radius:50px;padding:8px 16px;font-family:monospace;font-size:1rem;color:#00FF00;letter-spacing:2px;}' +
        '.qr-copy{background:none;border:1px solid #444;color:#bbb;border-radius:6px;padding:6px 10px;font-size:0.75rem;cursor:pointer;font-family:Inter,system-ui,sans-serif;min-height:32px;}' +
        '.qr-copy:hover{border-color:#00FF00;color:#00FF00;}' +
        '.qr-link{display:inline-block;margin-top:10px;color:#888;font-size:0.8rem;text-decoration:underline;}' +
        '.qr-link:hover{color:#00FF00;}' +
        '.qr-morph button:focus-visible,.qr-morph a:focus-visible,.qr-morph canvas:focus-visible{outline:2px solid #00FF00;outline-offset:2px;}' +
        '@media (prefers-reduced-motion: reduce){.qr-morph canvas{transition:none;}}';
    document.head.appendChild(st);
}

function buildSection(){
    var footer = document.querySelector('footer .container');
    if (!footer || document.getElementById('qr-morph')) return null;
    var wrap = document.createElement('div');
    wrap.id = 'qr-morph';
    wrap.className = 'qr-morph';

    var canvas = document.createElement('canvas');
    canvas.width = CFG.canvasCss * 2;
    canvas.height = CFG.canvasCss * 2;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', L('Código QR de la web de STIKMANIA', 'STIKMANIA website QR code'));
    canvas.tabIndex = 0;

    var msg = document.createElement('p');
    msg.className = 'qr-msg';
    msg.innerHTML = L(
        'Enséñaselo a un amigo: si hace su primer pedido con tu código, él gana <strong>−10%</strong> y tú <strong>$1 USD de crédito</strong> en tu próximo pack. Tú enseñas, él pega, los dos ganan.',
        'Show it to a friend: if they place their first order with your code, they get <strong>−10%</strong> and you get <strong>$1 USD credit</strong> on your next pack. You show, they stick, both win.'
    );

    var chip = document.createElement('div');
    chip.className = 'qr-chip';
    var codeSpan = document.createElement('span');
    codeSpan.id = 'qr-my-code';
    codeSpan.textContent = '—';
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'qr-copy';
    copyBtn.textContent = L('Copiar código', 'Copy code');
    chip.appendChild(codeSpan);
    chip.appendChild(copyBtn);

    var link = document.createElement('a');
    link.className = 'qr-link';
    link.href = 'referidos.html';
    link.textContent = L('Cómo funciona el programa', 'How the program works');

    wrap.appendChild(canvas);
    wrap.appendChild(msg);
    wrap.appendChild(chip);
    wrap.appendChild(document.createElement('br'));
    wrap.appendChild(link);
    footer.insertBefore(wrap, footer.firstChild);

    copyBtn.addEventListener('click', function(){
        var code = codeSpan.textContent;
        try { if (navigator.clipboard) navigator.clipboard.writeText(code); } catch (e) {}
        copyBtn.textContent = L('Copiado', 'Copied');
        setTimeout(function(){ copyBtn.textContent = L('Copiar código', 'Copy code'); }, 2000);
    });

    return { wrap: wrap, canvas: canvas, codeSpan: codeSpan };
}

function drawCover(ctx, img, size){
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    var scale = Math.max(size / iw, size / ih);
    var dw = iw * scale, dh = ih * scale;
    ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
}

function initMorph(canvas){
    var size = canvas.width;
    var ctx = canvas.getContext('2d');
    var logo = new Image(), qr = new Image();
    var offLogo = document.createElement('canvas'), offQR = document.createElement('canvas');
    offLogo.width = offLogo.height = size;
    offQR.width = offQR.height = size;
    var ready = { logo: false, qr: false };
    var started = false;

    function prep(){
        if (ready.logo) drawCover(offLogo.getContext('2d'), logo, size);
        if (ready.qr) drawCover(offQR.getContext('2d'), qr, size);
        if (ready.logo && ready.qr && !started) observe();
        else if (ready.logo && !ready.qr) { ctx.clearRect(0,0,size,size); ctx.drawImage(offLogo,0,0); }
    }

    logo.onload = function(){ ready.logo = true; prep(); };
    logo.onerror = function(){
        if (logo.src.indexOf('logo-white.png') < 0) logo.src = CFG.logoAlt;
        else canvas.style.display = 'none';
    };
    qr.onload = function(){ ready.qr = true; prep(); };
    qr.onerror = function(){ canvas.style.display = 'none'; };
    logo.src = CFG.logoSrc;
    qr.src = CFG.qrSrc;

    var cells = [];
    (function shuffle(){
        var g = CFG.grid, total = g * g, i, j, tmp;
        for (i = 0; i < total; i++) cells.push(i);
        for (i = total - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = cells[i]; cells[i] = cells[j]; cells[j] = tmp;
        }
    })();

    function paintCell(idx){
        var g = CFG.grid, cw = size / g;
        var cx = idx % g, cy = Math.floor(idx / g);
        ctx.drawImage(offQR, cx*cw, cy*cw, cw+0.6, cw+0.6, cx*cw, cy*cw, cw+0.6, cw+0.6);
    }

    function run(){
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        ctx.clearRect(0,0,size,size);
        canvas.classList.remove('qr-done');
        if (reduce || !ready.qr) {
            if (ready.qr) { ctx.drawImage(offQR,0,0); canvas.classList.add('qr-done'); }
            else if (ready.logo) ctx.drawImage(offLogo,0,0);
            return;
        }
        ctx.drawImage(offLogo,0,0);
        var t0 = performance.now(), total = cells.length, done = 0;
        function frame(now){
            var p = Math.min((now - t0) / CFG.durationMs, 1);
            var ease = 1 - Math.pow(1 - p, 3);
            var target = Math.floor(ease * total);
            while (done < target) { paintCell(cells[done]); done++; }
            if (p < 1) requestAnimationFrame(frame);
            else { ctx.drawImage(offQR,0,0); canvas.classList.add('qr-done'); }
        }
        requestAnimationFrame(frame);
    }

    function observe(){
        if (!('IntersectionObserver' in window)) { run(); return; }
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(en){
                if (en.isIntersecting) { run(); io.disconnect(); }
            });
        }, { threshold: 0.4 });
        io.observe(canvas);
    }

    canvas.addEventListener('click', run);
    canvas.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); }
    });
}

function init(){
    if (!CFG.enabled) return;
    injectCSS();
    var ui = buildSection();
    if (!ui) return;
    if (window.STIK_MKT && window.STIK_MKT.myCode) ui.codeSpan.textContent = window.STIK_MKT.myCode();
    else ui.codeSpan.parentNode.style.display = 'none';
    initMorph(ui.canvas);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();