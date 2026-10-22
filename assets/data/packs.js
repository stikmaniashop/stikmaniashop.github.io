/* ============================================
   STIKMANIA - Datos de Packs y Stickers
   Para agregar un pack nuevo: copia un bloque { ... }
   y pégalo al final del array con tus stickers.
   ============================================ */

window.PACKS_CONFIG = {
    folderBase: 'images/packs/',   // carpeta raíz de todos los packs
    packPriceDefault: 3,           // precio por defecto de un pack (USD)
    stickerPrice: 1                // precio de un sticker suelto (USD)
};

window.PACKS_DATA = [
    {
        id:'argolitos', name:'ARGOLITOS', folder:'argolitos', price:3,
        stickers:[
            { file:'burundanga cat.jpg', cats:['animales','letrero','argot','gato'] },
            { file:'cogiendo un aire.png', cats:['argot','letrero','stikmania'] },
            { file:'es de pinga mazinger.jpg', cats:['argot','letrero'] },
            { file:'fucktus.jpg', cats:['letrero'] },
            { file:'no me quemes - sticker.jpg', cats:['letrero','argot','stikmania'] },
            { file:'pato que pinga eh.jpg', cats:['animales','argot','letrero'] },
            { file:'rana en talla.jpg', cats:['letrero','animales','argot'] },
            { file:'silla_ahi tu sabe.jpg', cats:['argot','letrero'] }
        ]
    },
    {
        id:'dislexia', name:'DISLEXIA', folder:'dislexia', price:3,
        stickers:[
            { file:'mesero en el plato - sticker.jpg', cats:['minimalista'] },
            { file:'Sun Love - sticker.jpg', cats:['minimalista'] }
        ]
    },
    {
        id:'drop-dead', name:'DROP-DEAD', folder:'drop-dead', price:3,
        stickers:[
            { file:'dead cat.jpg', cats:['gato','animales'] },
            { file:'dead cheetah.jpg', cats:['animales','calavera'] },
            { file:'dead eye.jpg', cats:[] },
            { file:'dead fish.jpg', cats:['animales'] },
            { file:'dead flash.jpg', cats:['calavera'] },
            { file:'dead hiena.jpg', cats:['animales'] },
            { file:'dead oldman.jpg', cats:[] }
        ]
    },
    {
        id:'illus', name:'ILLUS', folder:'illus', price:3,
        stickers:[
            { file:'finger sk8.jpg', cats:['sk8'] },
            { file:'ilus_gato con ojos amarillos.jpg', cats:['gato'] }
        ]
    },
    {
        id:'los-salvajes', name:'LOS SALVAJES', folder:'los-salvajes', price:3,
        stickers:[
            { file:'cerdo volador.jpg', cats:['animales','stikmania'] },
            { file:'FUCK_AI - Sticker.jpg', cats:['animales','stikmania'] },
            { file:'Jodanse - sticker.jpg', alt:'Jódanse - sticker.jpg', cats:['gato','animales','letrero','argot'] },
            { file:'nutria sk8ter.jpg', cats:['sk8','animales'] },
            { file:'perro callejero.jpg', cats:['animales','letrero'] }
        ]
    },
    {
        id:'mad-girls', name:'MAD-GIRLS', folder:'mad-girls', price:3,
        stickers:[
            { file:'blue eyes smoking.jpg', cats:['stikmania'] },
            { file:'cabeza hueca.jpg', cats:[] },
            { file:'intuicion femenina - Sticker.jpg', alt:'intuición femenina - Sticker.jpg', cats:['letrero','stikmania'] }
        ]
    },
    {
        id:'noncritics', name:'NONCRITICS', folder:'noncritics', price:1,
        stickers:[
            { file:'comunista cleaner.jpg', cats:['stikmania'] }
        ]
    },
    {
        id:'psycker', name:'PSYCKER', folder:'psycker', price:3,
        stickers:[
            { file:'Consuelo - sticker.jpg', cats:['stikmania','letrero'] },
            { file:'Prendeme - sticker.jpg', alt:'Préndeme - sticker.jpg', cats:['stikmania'] }
        ]
    },
    {
        id:'sk8-ur-vans', name:'SK8-UR-VANS', folder:'sk8-ur-vans', price:3,
        stickers:[
            { file:'aliensk8ter.jpg', cats:['stikmania','sk8'] },
            { file:'mariask8.jpg', cats:['sk8'] },
            { file:'mini sk8 pills.jpg', cats:['sk8'] },
            { file:'Rollingsk8.jpg', cats:['sk8'] },
            { file:'sk8boro.jpg', cats:['sk8'] },
            { file:'sk8fall.jpg', cats:['sk8'] },
            { file:'sk8paletica.jpg', cats:['sk8'] },
            { file:'sk8pompom.jpg', cats:['stikmania','sk8'] },
            { file:'sk8ter enredao.jpg', cats:['sk8','stikmania'] },
            { file:'skateboll.jpg', cats:['sk8'] }
        ]
    },
    {
        id:'xxx', name:'XXX', folder:'xxx', price:3,
        stickers:[
            { file:'xxx_1.jpg', cats:['18+'] },
            { file:'xxx_2.jpg', cats:['18+','letrero'] },
            { file:'xxx_milf.jpg', cats:['18+','food','minimalista'] }
        ]
    }
];

/* === Procesamiento automático (no tocar) === */
(function () {
    function cleanName(f) {
        return f
            .replace(/\.[^/.]+$/, '')                 // quita extensión
            .replace(/\s*-\s*sticker$/i, '')           // quita "- sticker"
            .replace(/[_]+/g, ' ')                     // guiones bajos → espacio
            .trim()
            .replace(/\b\w/g, c => c.toUpperCase());   // Capitaliza Palabras
    }
    window.PACKS_DATA.forEach(p => {
        p.stickers.forEach((s, i) => {
            s.sid = p.id + '-' + i;
            s.name = s.name || cleanName(s.file);
            s.cats = s.cats || [];
            s.src = window.PACKS_CONFIG.folderBase + (p.folder || p.id) + '/' + s.file;
            if (s.alt) s.srcAlt = window.PACKS_CONFIG.folderBase + (p.folder || p.id) + '/' + s.alt;
        });
        const u = new Set();
        p.stickers.forEach(s => s.cats.forEach(c => u.add(c)));
        p.cats = Array.from(u);                        // categorías del pack = unión
        p.images = p.stickers.map(s => s.src);
        p.imagesAlt = p.stickers.map(s => s.srcAlt || s.src);
    });
})();