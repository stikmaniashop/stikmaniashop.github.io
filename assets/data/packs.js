/* ============================================
   STIKMANIA - Datos de Packs y Stickers v3
   Los precios se calculan solos (PriceEngine).
   catsMode: 'merge' | 'declared' | 'union'
   ============================================ */

window.PACKS_CONFIG = {
    folderBase: 'images/packs/',
    catsMode: 'merge'   // merge = tags declarados + tags de stickers
};

window.PACKS_DATA = [
    {
        id:'argolitos', name:'ARGOLITOS', folder:'argolitos',
        cats:['gato','letrero','animales','plant','tech','argot','stikmania'],
        stickers:[
            { file:'burundanga cat.jpg', cats:['stikmania','gato','argot'] },
            { file:'cogiendo un aire.png', cats:['stikmania','argot','tech'] },
            { file:'es de pinga mazinger.jpg', cats:['stikmania','argot','anime'] },
            { file:'fucktus.jpg', cats:['stikmania','plant'] },
            { file:'jesus te Cogi.jpg', cats:['stikmania','argot'] },
            { file:'no me quemes - sticker.jpg', cats:['stikmania','argot'] },
            { file:'pato que pinga eh.jpg', cats:['stikmania','animales','argot'] },
            { file:'rana en talla.jpg', cats:['stikmania','animales','argot'] },
            { file:'silla_ahi tu sabe.jpg', cats:['stikmania','argot'] }
        ]
    },
    {
        id:'dislexia', name:'DISLEXIA', folder:'dislexia',
        cats:['stikmania','plant','minimalista'],
        stickers:[
            { file:'mesero en el plato - sticker.jpg', cats:['stikmania','minimalista'] },
            { file:'Sun Love - sticker.jpg', cats:['stikmania','plant','minimalista'] }
        ]
    },
    {
        id:'drop-dead', name:'DROP-DEAD', folder:'drop-dead',
        cats:['stikmania','gato','animales','calavera','pyschodelic'],
        stickers:[
            { file:'dead cat.jpg', cats:['gato'] },
            { file:'dead cheetah.jpg', cats:['animales','calavera'] },
            { file:'dead eye.jpg', cats:['stikmania'] },
            { file:'dead fish.jpg', cats:['animales','stikmania'] },
            { file:'dead flash.jpg', cats:['stikmania','calavera'] },
            { file:'dead hiena.jpg', cats:['animales','stikmania'] },
            { file:'dead oldman.jpg', cats:['stikmania'] }
        ]
    },
    {
        id:'energy', name:'ENERGY', folder:'energy',
        cats:['energy'],
        stickers:[
            { file:'OJOturco.jpg', cats:['energy'] }
        ]
    },
    {
        id:'fooder', name:'FOODER', folder:'fooder',
        cats:['food'],
        stickers:[
            { file:'avocato.jpg', cats:['food'] }
        ]
    },
    {
        id:'funter', name:'FUNTER', folder:'funter',
        cats:['stikmania','letrero','minimalista','tech','music'],
        stickers:[
            { file:'artistcheck.jpg', cats:['letrero'] },
            { file:'ego.jpg', cats:['stikmania','letrero'] },
            { file:'idiotcheck.jpg', cats:['letrero'] },
            { file:'karma.jpg', cats:['letrero'] },
            { file:'PODSpara mucha gente.jpg', cats:['stikmania'] }
        ]
    },
    {
        id:'he-arts', name:'HE ARTS', folder:'he-arts',
        cats:['stikmania','heart'],
        stickers:[
            { file:'1.jpg', cats:['heart'] },
            { file:'2.jpg', cats:['heart'] },
            { file:'3.jpg', cats:['heart','stikmania'] },
            { file:'4.jpg', cats:['heart'] },
            { file:'5.jpg', cats:['heart'] },
            { file:'6.jpg', cats:['heart'] },
            { file:'7.jpg', cats:['heart','stikmania'] }
        ]
    },
    {
        id:'illus', name:'ILLUS', folder:'illus',
        cats:['stikmania','sk8','animales','girl','gato'],
        stickers:[
            { file:'Batmanmoco.jpg', cats:['stikmania'] },
            { file:'chica con ojos amarillo.jpg', cats:['stikmania'] },
            { file:'cooldog.jpg', alt:'cooldog.jpgcooldog.jpg', cats:['stikmania'] },
            { file:'finger sk8.jpg', cats:['stikmania'] },
            { file:'girlSha.jpg', cats:['stikmania'] },
            { file:'headboom.jpg', cats:['stikmania'] },
            { file:'ilus_gato con ojos amarillos.jpg', cats:['stikmania'] }
        ]
    },
    {
        id:'line', name:'LINE', folder:'line',
        cats:['minimalista','gato'],
        stickers:[
            { file:'fukcat.jpg', cats:['minimalista','gato'] }
        ]
    },
    {
        id:'los-salvajes', name:'LOS SALVAJES', folder:'los-salvajes',
        cats:['stikmania','letrero','sk8','gato','animales','pyschodelic'],
        stickers:[
            { file:'cerdo volador.jpg', cats:['animales','stikmania'] },
            { file:'FUCK_AI - Sticker.jpg', cats:['stikmania','animales','tech'] },
            { file:'Jódanse - sticker.jpg', alt:'Jodanse - sticker.jpg', cats:['stikmania','gato','argot'] },
            { file:'monkhigh.jpg', cats:['stikmania','animales','pyschodelic'] },
            { file:'nutria sk8ter.jpg', cats:['stikmania','sk8','animales'] },
            { file:'perro callejero.jpg', cats:['stikmania','animales','letrero'] }
        ]
    },
    {
        id:'mad-girls', name:'MAD GIRLS', folder:'mad-girls',
        cats:['stikmania','pyschodelic','girl','letrero'],
        stickers:[
            { file:'blue eyes smoking.jpg', cats:['girl'] },
            { file:'cabeza hueca.jpg', cats:['girl','pyschodelic'] },
            { file:'intuición femenina - Sticker.jpg', alt:'intuicion femenina - Sticker.jpg', cats:['girl','stikmania'] },
            { file:'MonaConflow.jpg', cats:['girl','stikmania'] },
            { file:'tentagua.jpg', cats:['girl','pyschodelic'] }
        ]
    },
    {
        id:'noncritics', name:'NONCRITICS', folder:'noncritics',
        cats:['stikmania','food','letrero'],
        stickers:[
            { file:'comunista cleaner.jpg', cats:['stikmania','tech'] },
            { file:'labase.jpg', cats:['stikmania','food'] }
        ]
    },
    {
        id:'psycker', name:'PSYCKER', folder:'psycker',
        cats:['stikmania','pyschodelic'],
        stickers:[
            { file:'clancy.jpg', cats:['pyschodelic'] },
            { file:'Consuelo - sticker.jpg', cats:['stikmania','girl','pyschodelic'] },
            { file:'Préndeme - sticker.jpg', alt:'Prendeme - sticker.jpg', cats:['stikmania','pyschodelic'] }
        ]
    },
    {
        id:'sk8-ur-vans', name:'SK8-UR-VANS', folder:'sk8-ur-vans',
        cats:['stikmania','sk8'],
        stickers:[
            { file:'aliensk8ter.jpg', cats:['sk8','stikmania'] },
            { file:'mariask8.jpg', cats:['sk8'] },
            { file:'mini sk8 pills.jpg', cats:['sk8','stikmania'] },
            { file:'Rollingsk8.jpg', alt:'Rollingsk8', cats:['sk8','stikmania','rock'] },
            { file:'sk8boro.jpg', cats:['sk8','stikmania'] },
            { file:'sk8fall.jpg', cats:['sk8','stikmania'] },
            { file:'sk8paletica.jpg', cats:['sk8','stikmania'] },
            { file:'sk8pompom.jpg', cats:['sk8','stikmania'] },
            { file:'sk8ter enredao.jpg', cats:['sk8','stikmania'] },
            { file:'skateboll.jpg', cats:['sk8','stikmania'] },
            { file:'vans.jpg', cats:['sk8','stikmania'] }
        ]
    },
    {
        id:'smiley-face', name:'SMILEY FACE', folder:'smiley-face',
        cats:['stikmania','pyschodelic'],
        stickers:[
            { file:'1.jpg', cats:['pyschodelic','stikmania'] },
            { file:'2.jpg', cats:['pyschodelic','stikmania'] }
        ]
    },
    {
        id:'tra-neo', name:'TRA-NEO', folder:'tra-neo',
        cats:['stikmania','animales'],
        stickers:[
            { file:'butterfly.jpg', cats:['animales'] },
            { file:'carpa.jpg', cats:['animales'] },
            { file:'kabuki.jpg', cats:['stikmania'] },
            { file:'TRA-PAN.jpg', cats:['animales'] },
            { file:'TRA-TIGER.jpg', cats:['animales','stikmania'] },
            { file:'TRA-TIGER2.jpg', cats:['animales'] }
        ]
    },
    {
        id:'xxx', name:'XXX', folder:'xxx',
        cats:['18+'],
        stickers:[
            { file:'xxx_1.jpg', cats:['18+'] },
            { file:'xxx_2.jpg', cats:['18+'] },
            { file:'xxx_milf.jpg', cats:['18+'] }
        ]
    }
];

/* === Procesamiento automático (no tocar) === */
(function () {
    function cleanName(f) {
        return f
            .replace(/\.[^/.]+$/, '')
            .replace(/\s*-\s*sticker$/i, '')
            .replace(/[_]+/g, ' ')
            .trim()
            .replace(/\b\w/g, c => c.toUpperCase());
    }
    const mode = (window.PACKS_CONFIG && window.PACKS_CONFIG.catsMode) || 'merge';

    window.PACKS_DATA.forEach(p => {
        p.stickers.forEach((s, i) => {
            s.sid = p.id + '-' + i;
            s.name = s.name || cleanName(s.file);
            s.cats = s.cats || [];
            s.src = window.PACKS_CONFIG.folderBase + (p.folder || p.id) + '/' + s.file;
            if (s.alt) s.srcAlt = window.PACKS_CONFIG.folderBase + (p.folder || p.id) + '/' + s.alt;
            s.price = window.PriceEngine.stickerPrice(s.w, s.h);
            s.units = 1;
        });

        const union = new Set();
        p.stickers.forEach(s => s.cats.forEach(c => union.add(c)));
        p.union = Array.from(union);

        if (mode === 'union') p.cats = p.union;
        else if (mode === 'declared') p.cats = p.cats || p.union;
        else p.cats = Array.from(new Set([...(p.cats || []), ...p.union]));

        p.images = p.stickers.map(s => s.src);
        p.imagesAlt = p.stickers.map(s => s.srcAlt || s.src);
        p.price = window.PriceEngine.packPrice(p.stickers.length);
        p.units = p.stickers.length;
    });
})();