/* ============================================
   STIKMANIA - Recomendaciones locales v1
   Módulo autocontenido: sin red, sin terceros, sin framework.
   Desactivar todo: CONFIG.enabled = false  (o quitar el <script>).
   ============================================ */
(function () {
'use strict';

/* === CONFIGURACIÓN CENTRALIZADA === */
var CONFIG = {
    enabled: true,
    purposeVersion: 1,              // Si cambian las finalidades, subir → exige nueva elección
    prefix: 'stikmania_recs_',
    keys: { pref:'pref_v1', profile:'profile_v1', shown:'shown_v1', session:'session_v1' },
    dwellMs: 15000,                 // señal de interés: 15 s visibles consecutivos
    signalsBeforePriority: 2,       // umbral inicial: 2 señales
    personalizedIntervalMs: 86400000, // 1 presentación personalizada / 24 h
    profileTtlDays: 30,             // caducidad del perfil (sin renovación por actividad)
    prefTtlDays: 180,               // punto de partida TÉCNICO, no plazo legal
    disabledRoutes: ['terminos.html', 'privacidad.html'],
    allowedCats: ['argot','animales','minimalista','sk8','gato','stikmania','food','letrero','calavera','anime','plant','game','girl','heart','marvel','music','pyschodelic','rock','tech','energy'],
    catLabels: {
        es:{argot:'argot cubano',animales:'animales',minimalista:'minimalista',sk8:'skate',gato:'gatos',stikmania:'STIKMANIA',food:'food',letrero:'letreros',calavera:'calaveras',anime:'anime',plant:'plantas',game:'gaming',girl:'girl',heart:'corazones',marvel:'marvel',music:'música',pyschodelic:'psicodelia',rock:'rock',tech:'tech',energy:'energy'},
        en:{argot:'Cuban slang',animales:'animals',minimalista:'minimalist',sk8:'skate',gato:'cats',stikmania:'STIKMANIA',food:'food',letrero:'signs',calavera:'skulls',anime:'anime',plant:'plants',game:'gaming',girl:'girl',heart:'hearts',marvel:'marvel',music:'music',pyschodelic:'psychedelic',rock:'rock',tech:'tech',energy:'energy'}
    }
};

/* === TEXTOS (voz de marca: cercana, clara, sin presión) === */
var L = {
    es:{
        prefs_link:'Tus preferencias',
        panel_title:'Hagamos este espacio más tuyo',
        panel_desc:'Si quieres, podemos recordar en este navegador qué temas te interesan para sugerirte nuestros servicios relacionados. También puedes seguir sin personalizar.',
        panel_what:'Guardamos solo categorías generales de interés (por ejemplo: skate, gatos, food). No guardamos nombre, correo, textos de formularios, búsquedas ni URLs.',
        panel_where:'Todo vive en este navegador y no se envía a ningún servidor.',
        panel_retention:'Los intereses se borran a los 30 días. Tu elección se conserva 180 días.',
        btn_no:'Seguir sin personalizar',
        btn_yes:'Sí, personalizar',
        btn_withdraw:'Desactivar y borrar intereses',
        msg_yes:'Listo. Las próximas sugerencias podrán tener en cuenta tus intereses.',
        msg_no:'Listo. Seguimos sin personalizar tus intereses.',
        msg_off:'Hecho. Borramos los intereses guardados por este módulo.',
        msg_fail:'No pudimos guardar tu elección. Puedes seguir usando la web sin personalización.',
        rec_label:'Un servicio nuestro que puede encajar',
        rec_why:'¿Por qué aparece aquí?',
        rec_hide:'Ocultar sugerencia',
        invite_line:'¿Quieres que las sugerencias tengan en cuenta tus gustos? Es opcional y solo en este navegador.',
        invite_btn:'Elegir preferencias',
        ctx_index_title:'¿Buscas algo que no está en los packs?',
        ctx_index_desc:'Cotiza stickers a tu medida: tamaño, material y cantidad en segundos.',
        ctx_galeria_title:'Etiquetas y empaques para tu negocio',
        ctx_galeria_desc:'Si tu marca necesita etiquetas o empaques, podemos cotizarlos a medida.',
        ctx_cta_quote:'Ir al cotizador',
        rec_cta_pack:'Ver este pack',
        rec_pack_prefix:'Pack de ',
        rec_stickers:' stickers · ',
        rec_custom_title:'Lo hacemos a tu medida',
        rec_custom_desc:'No tenemos un pack cerrado de este tema, pero lo diseñamos y producimos para ti.',
        why_context_index:'Aparece porque estás viendo la tienda de STIKMANIA. Es una sugerencia fija: no usa tus datos.',
        why_context_galeria:'Aparece porque estás viendo trabajos reales de STIKMANIA. Es una sugerencia fija: no usa tus datos.',
        why_personal:'Aparece porque en este navegador mostraste interés en ',
        why_local:' Esa información no sale de tu dispositivo.',
        why_nopack:' No tenemos pack cerrado de ese tema, así que te proponemos hacerlo a medida.'
    },
    en:{
        prefs_link:'Your preferences',
        panel_title:'Let’s make this space more yours',
        panel_desc:'If you want, we can remember in this browser which topics interest you to suggest related services of ours. You can also continue without personalization.',
        panel_what:'We store only general interest categories (e.g. skate, cats, food). We do not store names, emails, form text, searches or URLs.',
        panel_where:'Everything stays in this browser and is never sent to any server.',
        panel_retention:'Interests are deleted after 30 days. Your choice is kept for 180 days.',
        btn_no:'Continue without personalization',
        btn_yes:'Yes, personalize',
        btn_withdraw:'Turn off and delete interests',
        msg_yes:'Done. Future suggestions may take your interests into account.',
        msg_no:'Done. We keep not personalizing your interests.',
        msg_off:'Done. We deleted the interests stored by this module.',
        msg_fail:'We couldn’t save your choice. You can keep using the site without personalization.',
        rec_label:'A service of ours that may fit',
        rec_why:'Why am I seeing this?',
        rec_hide:'Hide suggestion',
        invite_line:'Want suggestions to consider your tastes? Optional, and only in this browser.',
        invite_btn:'Choose preferences',
        ctx_index_title:'Looking for something not in the packs?',
        ctx_index_desc:'Quote custom stickers: size, material and quantity in seconds.',
        ctx_galeria_title:'Labels and packaging for your business',
        ctx_galeria_desc:'If your brand needs labels or packaging, we can quote them custom.',
        ctx_cta_quote:'Go to quote tool',
        rec_cta_pack:'See this pack',
        rec_pack_prefix:'Pack of ',
        rec_stickers:' stickers · ',
        rec_custom_title:'We make it custom for you',
        rec_custom_desc:'We don’t have a closed pack for this theme, but we can design and produce it for you.',
        why_context_index:'Shown because you are browsing the STIKMANIA shop. Fixed suggestion: it does not use your data.',
        why_context_galeria:'Shown because you are viewing real STIKMANIA work. Fixed suggestion: it does not use your data.',
        why_personal:'Shown because in this browser you showed interest in ',
        why_local:' That information never leaves your device.',
        why_nopack:' We have no closed pack for that theme, so we propose making it custom.'
    }
};

function lang(){ try { return localStorage.getItem('stikmania_lang') === 'en' ? 'en' : 'es'; } catch (e) { return 'es'; } }
function t(k){ var d = L.es[k] || k; return (L[lang()] && L[lang()][k]) || d; }
function catLabel(c){ var m = CONFIG.catLabels[lang()] || {}; return m[c] || c; }
function isDisabledRoute(){ var p = location.pathname; for (var i=0;i<CONFIG.disabledRoutes.length;i++){ if (p.indexOf(CONFIG.disabledRoutes[i]) >= 0) return true; } return false; }

/* === ALMACENAMIENTO TOLERANTE A FALLOS === */
function sGet(k){ try { var r = localStorage.getItem(CONFIG.prefix + k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
function sSet(k,v){ try { localStorage.setItem(CONFIG.prefix + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
function sDel(k){ try { localStorage.removeItem(CONFIG.prefix + k); } catch (e) {} }
function ssGet(k){ try { var r = sessionStorage.getItem(CONFIG.prefix + k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
function ssSet(k,v){ try { sessionStorage.setItem(CONFIG.prefix + k, JSON.stringify(v)); return true; } catch (e) { return false; } }

/* === VALIDACIÓN DE DATOS LEÍDOS === */
function validPref(p){ return p && p.v === 1 && typeof p.ts === 'number' && typeof p.expires === 'number' && p.purposeVersion === CONFIG.purposeVersion && (p.status === 'accepted' || p.status === 'declined' || p.status === 'closed'); }
function validProfile(p){
    if (!p || p.v !== 1 || typeof p.created !== 'number' || typeof p.expires !== 'number' || !p.interests || typeof p.interests !== 'object') return null;
    var clean = {};
    for (var k in p.interests) {
        if (Object.prototype.hasOwnProperty.call(p.interests, k) && CONFIG.allowedCats.indexOf(k) >= 0 && typeof p.interests[k] === 'number' && p.interests[k] > 0) clean[k] = p.interests[k];
    }
    return { v:1, created:p.created, expires:p.expires, interests:clean };
}

var prefCache = null, prefLoaded = false, profileCache = null, profileLoaded = false;
function getPref(){
    if (prefLoaded) return prefCache;
    prefLoaded = true;
    var now = Date.now(), p = sGet(CONFIG.keys.pref);
    if (!validPref(p)) { if (p) sDel(CONFIG.keys.pref); p = null; }
    else if (p.expires <= now) { sDel(CONFIG.keys.pref); sDel(CONFIG.keys.profile); p = null; profileCache = null; profileLoaded = false; }
    prefCache = p; return p;
}
function getProfile(){
    if (profileLoaded) return profileCache;
    profileLoaded = true;
    var now = Date.now(), p = validProfile(sGet(CONFIG.keys.profile));
    if (!p) { sDel(CONFIG.keys.profile); p = null; }
    else if (p.expires <= now) { sDel(CONFIG.keys.profile); p = null; }
    profileCache = p; return p;
}
function consentActive(){ var p = getPref(); return !!(p && p.status === 'accepted' && p.expires > Date.now()); }
function hiddenSession(){ var s = ssGet(CONFIG.keys.session); return !!(s && s.hidden); }
function setHiddenSession(){ var s = ssGet(CONFIG.keys.session) || { routes:{} }; s.hidden = true; ssSet(CONFIG.keys.session, s); }
function shownOk(){ var s = sGet(CONFIG.keys.shown); if (!s || typeof s.ts !== 'number') return true; return (Date.now() - s.ts) >= CONFIG.personalizedIntervalMs; }
function topCat(){
    var pr = getProfile(); if (!pr) return null;
    var best = null, bestN = 0;
    for (var k in pr.interests) { if (pr.interests[k] > bestN) { bestN = pr.interests[k]; best = k; } }
    return (best && bestN >= CONFIG.signalsBeforePriority) ? best : null;
}

/* === CATÁLOGO DE RECOMENDACIONES (solo oferta real) === */
function packForCat(cat){
    var list = (window.PACKS_DATA || []).filter(function(p){ return (p.cats || []).indexOf(cat) >= 0; });
    list.sort(function(a,b){ return (b.stickers||[]).length - (a.stickers||[]).length; });
    return list[0] || null;
}
function contextualRec(){
    if (location.pathname.indexOf('galeria') >= 0) {
        return { kind:'context', title:t('ctx_galeria_title'), desc:t('ctx_galeria_desc'), cta:t('ctx_cta_quote'), href:'index.html#cotizador', reason:t('why_context_galeria') };
    }
    return { kind:'context', title:t('ctx_index_title'), desc:t('ctx_index_desc'), cta:t('ctx_cta_quote'), href:'#cotizador', reason:t('why_context_index') };
}
function personalizedRec(cat){
    var pack = packForCat(cat);
    if (pack) {
        return { kind:'personal', cat:cat, title:pack.name,
            desc:t('rec_pack_prefix') + pack.stickers.length + t('rec_stickers') + '$' + pack.price.toFixed(2) + ' USD',
            cta:t('rec_cta_pack'), packId:pack.id,
            reason:t('why_personal') + catLabel(cat) + '.' + t('why_local') };
    }
    return { kind:'personal', cat:cat, title:t('rec_custom_title'), desc:t('rec_custom_desc'), cta:t('ctx_cta_quote'),
        href:(location.pathname.indexOf('galeria') >= 0 ? 'index.html#cotizador' : '#cotizador'),
        reason:t('why_personal') + catLabel(cat) + '.' + t('why_nopack') + t('why_local') };
}

/* === CSS (inyectado, respeta modo oscuro y movimiento reducido) === */
function injectCSS(){
    var st = document.createElement('style');
    st.textContent =
        '.stik-rec{max-width:1200px;margin:0 auto 40px;padding:0 16px;}' +
        '.stik-rec-inner{background:#0f0f0f;border:1px solid #222;border-left:3px solid #00FF00;border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:10px;}' +
        '.stik-rec-label{font-size:0.68rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;}' +
        '.stik-rec h3{font-family:var(--font-display,\'Permanent Marker\',cursive);color:#fff;font-size:1.2rem;font-weight:normal;letter-spacing:0.5px;}' +
        '.stik-rec p{color:#bbb;font-size:0.9rem;line-height:1.6;}' +
        '.stik-rec-reason{border-top:1px dashed #333;padding-top:10px;color:#888;font-size:0.8rem;}' +
        '.stik-rec-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}' +
        '.stik-rec-cta{background:#00FF00;color:#000;border:none;border-radius:8px;padding:11px 18px;font-weight:600;font-size:0.9rem;cursor:pointer;min-height:44px;}' +
        '.stik-rec-ghost{background:none;border:1px solid #444;color:#bbb;border-radius:8px;padding:11px 16px;font-size:0.85rem;cursor:pointer;min-height:44px;}' +
        '.stik-rec-ghost:hover{border-color:#00FF00;color:#00FF00;}' +
        '.stik-rec-invite{border-top:1px solid #222;padding-top:10px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;}' +
        '.stik-rec-invite p{font-size:0.8rem;color:#888;}' +
        '.stik-prefs-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:320;}' +
        '.stik-prefs{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;max-height:88vh;overflow-y:auto;background:#0f0f0f;border:1px solid #00FF00;border-radius:16px;z-index:321;padding:24px;display:flex;flex-direction:column;gap:12px;}' +
        '.stik-prefs h2{font-family:var(--font-display,\'Permanent Marker\',cursive);color:#00FF00;font-size:1.4rem;font-weight:normal;}' +
        '.stik-prefs p{color:#bbb;font-size:0.88rem;line-height:1.6;}' +
        '.stik-prefs-btns{display:flex;flex-direction:column;gap:10px;margin-top:6px;}' +
        '.stik-btn{border-radius:8px;padding:13px 18px;font-size:0.95rem;font-weight:600;cursor:pointer;min-height:48px;font-family:inherit;}' +
        '.stik-btn-yes{background:#00FF00;color:#000;border:1px solid #00FF00;}' +
        '.stik-btn-no{background:none;color:#bbb;border:1px solid #444;}' +
        '.stik-btn-withdraw{background:none;color:#FF3333;border:1px solid #FF3333;}' +
        '.stik-prefs-close{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:1px solid #444;background:none;color:#bbb;font-size:1.1rem;cursor:pointer;}' +
        '.stik-rec button:focus-visible,.stik-prefs button:focus-visible,.stik-rec a:focus-visible{outline:2px solid #00FF00;outline-offset:2px;}' +
        '@media (prefers-reduced-motion: reduce){.stik-rec *,.stik-prefs *{transition:none !important;animation:none !important;}}';
    document.head.appendChild(st);
}

/* === BLOQUE DE RECOMENDACIÓN === */
var blockEl = null;
function removeBlock(){ if (blockEl && blockEl.parentNode) blockEl.parentNode.removeChild(blockEl); blockEl = null; }

function el(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

function render(){
    removeBlock();
    if (!CONFIG.enabled || isDisabledRoute() || hiddenSession()) return;

    var rec = null;
    if (consentActive() && shownOk() && topCat()) {
        rec = personalizedRec(topCat());
        sSet(CONFIG.keys.shown, { v:1, ts:Date.now() });
    } else {
        rec = contextualRec();
    }

    var wrap = el('aside', 'stik-rec');
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', t('rec_label'));
    var inner = el('div', 'stik-rec-inner');

    inner.appendChild(el('span', 'stik-rec-label', t('rec_label')));
    inner.appendChild(el('h3', null, rec.title));
    inner.appendChild(el('p', null, rec.desc));

    var actions = el('div', 'stik-rec-actions');
    var cta = el('button', 'stik-rec-cta', rec.cta);
    cta.type = 'button';
    cta.addEventListener('click', function(){
        if (rec.packId && typeof window.openModal === 'function') { window.openModal('pack', rec.packId); }
        else if (rec.href) { location.hash = rec.href.replace(/^.*#/, '#'); var tgt = document.querySelector(rec.href.indexOf('#')===0?rec.href:'#cotizador'); if (tgt) tgt.scrollIntoView({behavior:'smooth',block:'start'}); else if (rec.href.indexOf('index')===0) location.href = rec.href; }
    });
    actions.appendChild(cta);

    var whyBtn = el('button', 'stik-rec-ghost', t('rec_why'));
    whyBtn.type = 'button';
    whyBtn.setAttribute('aria-expanded', 'false');
    var reason = el('p', 'stik-rec-reason', rec.reason);
    reason.hidden = true;
    whyBtn.addEventListener('click', function(){
        reason.hidden = !reason.hidden;
        whyBtn.setAttribute('aria-expanded', String(!reason.hidden));
    });
    actions.appendChild(whyBtn);

    var hideBtn = el('button', 'stik-rec-ghost', t('rec_hide'));
    hideBtn.type = 'button';
    hideBtn.addEventListener('click', function(){ setHiddenSession(); removeBlock(); });
    actions.appendChild(hideBtn);
    inner.appendChild(actions);
    inner.appendChild(reason);

    // Invitación discreta al panel (solo sin preferencia guardada, una vez por sesión)
    var pref = getPref();
    var sess = ssGet(CONFIG.keys.session) || { routes:{} };
    if (rec.kind === 'context' && !pref && !sess.invite) {
        var inv = el('div', 'stik-rec-invite');
        inv.appendChild(el('p', null, t('invite_line')));
        var ib = el('button', 'stik-rec-ghost', t('invite_btn'));
        ib.type = 'button';
        ib.addEventListener('click', function(){ openPanel(); });
        inv.appendChild(ib);
        inner.appendChild(inv);
        sess.invite = true; ssSet(CONFIG.keys.session, sess);
    }

    wrap.appendChild(inner);

    // Punto de anclaje: antes del cotizador (index) o del CTA final (galeria); si no, antes del footer
    var anchor = document.getElementById('cotizador') || document.querySelector('.cta-final') || document.querySelector('footer');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(wrap, anchor);
    else document.body.appendChild(wrap);
    blockEl = wrap;
}

/* === PANEL DE PREFERENCIAS === */
var panelOverlay = null, panelBox = null, lastFocus = null, liveRegion = null;

function liveMsg(msg){
    if (!liveRegion) { liveRegion = el('p'); liveRegion.setAttribute('role', 'status'); liveRegion.style.position = 'absolute'; liveRegion.style.left = '-9999px'; document.body.appendChild(liveRegion); }
    liveRegion.textContent = msg;
}

function buildPanel(){
    if (panelBox) return;
    panelOverlay = el('div', 'stik-prefs-overlay');
    panelBox = el('div', 'stik-prefs');
    panelBox.setAttribute('role', 'dialog');
    panelBox.setAttribute('aria-modal', 'true');
    panelBox.setAttribute('aria-labelledby', 'stik-prefs-title');

    var closeBtn = el('button', 'stik-prefs-close', '×');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.addEventListener('click', function(){ closePanel('closed'); });
    panelBox.appendChild(closeBtn);

    var h = el('h2', null, t('panel_title')); h.id = 'stik-prefs-title';
    panelBox.appendChild(h);
    panelBox.appendChild(el('p', null, t('panel_desc')));
    panelBox.appendChild(el('p', null, t('panel_what')));
    panelBox.appendChild(el('p', null, t('panel_where')));
    panelBox.appendChild(el('p', null, t('panel_retention')));

    var btns = el('div', 'stik-prefs-btns');
    var yes = el('button', 'stik-btn stik-btn-yes', t('btn_yes')); yes.type = 'button';
    yes.addEventListener('click', function(){ savePref('accepted'); });
    var no = el('button', 'stik-btn stik-btn-no', t('btn_no')); no.type = 'button';
    no.addEventListener('click', function(){ savePref('declined'); });
    var wd = el('button', 'stik-btn stik-btn-withdraw', t('btn_withdraw')); wd.type = 'button';
    wd.addEventListener('click', function(){ withdraw(); });
    btns.appendChild(yes); btns.appendChild(no); btns.appendChild(wd);
    panelBox.appendChild(btns);

    panelOverlay.addEventListener('click', function(){ closePanel('closed'); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && panelBox && !panelBox.hidden) closePanel('closed'); });
    document.body.appendChild(panelOverlay);
    document.body.appendChild(panelBox);
    panelOverlay.style.display = 'none';
    panelBox.style.display = 'none';
}

function openPanel(){
    buildPanel();
    lastFocus = document.activeElement;
    panelOverlay.style.display = 'block';
    panelBox.style.display = 'flex';
    var first = panelBox.querySelector('.stik-btn-yes');
    if (first) first.focus();
}
function closePanel(mode){
    if (!panelBox) return;
    panelOverlay.style.display = 'none';
    panelBox.style.display = 'none';
    if (mode === 'closed') {
        var p = getPref();
        if (!p) { // cerrar ≠ aceptar: recordamos que no quiso elegir, para no insistir
            var now = Date.now();
            sSet(CONFIG.keys.pref, { v:1, status:'closed', ts:now, expires:now + CONFIG.prefTtlDays * 86400000, purposeVersion:CONFIG.purposeVersion });
            prefCache = null; prefLoaded = false;
        }
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function savePref(status){
    var now = Date.now();
    var ok = sSet(CONFIG.keys.pref, { v:1, status:status, ts:now, expires:now + CONFIG.prefTtlDays * 86400000, purposeVersion:CONFIG.purposeVersion });
    prefCache = null; prefLoaded = false;
    if (!ok) { liveMsg(t('msg_fail')); closePanelKeep(); return; }
    if (status !== 'accepted') { sDel(CONFIG.keys.profile); profileCache = null; profileLoaded = false; }
    liveMsg(status === 'accepted' ? t('msg_yes') : t('msg_no'));
    closePanelKeep();
    render();
}
function withdraw(){
    sDel(CONFIG.keys.pref); sDel(CONFIG.keys.profile);
    prefCache = null; prefLoaded = false; profileCache = null; profileLoaded = false;
    stopDwell(); startDwell();
    liveMsg(t('msg_off'));
    closePanelKeep();
    render();
}
function closePanelKeep(){ if (panelBox) { panelOverlay.style.display = 'none'; panelBox.style.display = 'none'; if (lastFocus && lastFocus.focus) lastFocus.focus(); } }

/* === SEÑAL DE INTERÉS (dwell 15 s visibles) === */
var dwellTimer = null, dwellAcc = 0, lastPackCat = null;
function route(){ return location.pathname; }
function startDwell(){
    stopDwell();
    if (!CONFIG.enabled || isDisabledRoute()) return;
    dwellAcc = 0;
    dwellTimer = setInterval(function(){
        if (document.visibilityState !== 'visible') return;   // pestaña oculta: no acumula
        if (!consentActive()) return;                          // sin consentimiento: no se registra nada
        dwellAcc += 1000;
        if (dwellAcc >= CONFIG.dwellMs) { dwellAcc = 0; recordSignal(); }
    }, 1000);
}
function stopDwell(){ if (dwellTimer) { clearInterval(dwellTimer); dwellTimer = null; } dwellAcc = 0; }
function recordSignal(){
    var sess = ssGet(CONFIG.keys.session) || { routes:{} };
    if (!sess.routes) sess.routes = {};
    var r = route();
    if (sess.routes[r]) return;                                // máx 1 señal por ruta y visita
    var cat = null;
    var chip = document.querySelector('.filter-chip.active');
    if (chip && chip.dataset && chip.dataset.filter && chip.dataset.filter !== 'all' && CONFIG.allowedCats.indexOf(chip.dataset.filter) >= 0) cat = chip.dataset.filter;
    else if (lastPackCat) cat = lastPackCat;
    if (!cat) return;
    sess.routes[r] = true; ssSet(CONFIG.keys.session, sess);
    var now = Date.now();
    var pr = getProfile() || { v:1, created:now, expires:now + CONFIG.profileTtlDays * 86400000, interests:{} };
    pr.interests[cat] = (pr.interests[cat] || 0) + 1;
    if (sSet(CONFIG.keys.profile, pr)) profileCache = pr;
}

/* === CADUCIDAD Y SINCRONIZACIÓN === */
function purgeExpired(){
    var now = Date.now(), changed = false;
    var p = sGet(CONFIG.keys.pref);
    if (p && (!validPref(p) || p.expires <= now)) { sDel(CONFIG.keys.pref); sDel(CONFIG.keys.profile); changed = true; }
    var pr = sGet(CONFIG.keys.profile);
    if (pr && (!validProfile(pr) || pr.expires <= now)) { sDel(CONFIG.keys.profile); changed = true; }
    if (changed) { prefCache = null; prefLoaded = false; profileCache = null; profileLoaded = false; }
    return changed;
}

/* === ACCESO PERMANENTE EN EL MENÚ === */
function ensureDrawerLink(){
    var ul = document.querySelector('#menu-drawer .drawer-body ul');
    if (!ul || document.getElementById('stik-prefs-link')) return;
    var li = document.createElement('li');
    li.style.marginBottom = '10px';
    var b = el('button', 'menu-link', t('prefs_link'));
    b.type = 'button'; b.id = 'stik-prefs-link';
    b.style.textAlign = 'left'; b.style.width = '100%';
    b.addEventListener('click', function(){ openPanel(); });
    li.appendChild(b); ul.appendChild(li);
}

/* === ARRANQUE === */
function init(){
    if (!CONFIG.enabled) return;
    injectCSS();
    purgeExpired();
    ensureDrawerLink();
    render();
    startDwell();

    // Interés por pack abierto (solo con consentimiento activo al usarlo)
    document.addEventListener('click', function(e){
        var card = e.target && e.target.closest ? e.target.closest('.pack-card[data-kind="pack"]') : null;
        if (!card) return;
        var p = (window.PACKS_DATA || []).filter(function(x){ return x.id === card.getAttribute('data-ref'); })[0];
        if (!p) return;
        var c = (p.cats || []).filter(function(x){ return CONFIG.allowedCats.indexOf(x) >= 0; })[0];
        if (c) lastPackCat = c;
    });

    // Caducidad con la página abierta
    setInterval(function(){ if (purgeExpired()) { stopDwell(); startDwell(); render(); } }, 60000);

    // Sincronización entre pestañas
    window.addEventListener('storage', function(e){
        if (e.key && e.key.indexOf(CONFIG.prefix) === 0) {
            prefCache = null; prefLoaded = false; profileCache = null; profileLoaded = false;
            purgeExpired(); stopDwell(); startDwell(); render();
        }
    });

    // Re-render al cambiar idioma (MutationObserver sobre <html lang>)
    if (window.MutationObserver) {
        new MutationObserver(function(){ render(); ensureDrawerLink(); }).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    }

    window.addEventListener('pagehide', stopDwell);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();