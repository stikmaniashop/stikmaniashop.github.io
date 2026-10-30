/* ============================================
   STIKMANIA - Motor de Precios v1
   TODO el sistema de precios vive aquí.
   ============================================ */

window.PRICING = {
    // Tamaño estándar de referencia (packs y precio base de tienda)
    standard: { w: 6, h: 6 },

    // Tarifa por sticker según área (cm²)
    tiers: [
        { maxArea: 16, price: 0.15 },   // hasta 4x4
        { maxArea: 49, price: 0.18 }    // hasta 7x7
    ],
    extraCm2: 0.005,                    // por cada cm² sobre el último tramo

    // Multiplicador por material
    materials: { vinyl: 1, paper: 0.7, transparent: 1.3 },

    // Redondeo POR EXCESO del precio de pack (USD)
    // 0.5 = precios tipo $1.50/$2.00 · 1 = enteros · 0.01 = centavos exactos
    packRoundStep: 0.5,

    // Descuentos mayoristas (unidades de stickers/etiquetas)
    wholesale: [
        { min: 50,  off: 0.10 },
        { min: 100, off: 0.15 },
        { min: 500, off: 0.20 }
    ]
};

window.PriceEngine = {
    area(w, h) { return w * h; },

    baseUnit(w, h) {
        const a = this.area(w, h);
        for (const t of PRICING.tiers) {
            if (a <= t.maxArea) return t.price;
        }
        const last = PRICING.tiers[PRICING.tiers.length - 1];
        return last.price + (a - last.maxArea) * PRICING.extraCm2;
    },

    unit(w, h, mat) {
        const m = (mat && PRICING.materials[mat]) || 1;
        return this.baseUnit(w, h) * m;
    },

    ceilTo(x, step) { return Math.ceil((x / step) - 1e-9) * step; },
    ceilCent(x) { return Math.ceil((x * 100) - 1e-9) / 100; },

    // Precio de PACK: n stickers a tamaño estándar, redondeado por exceso
    packPrice(count, mat) {
        const raw = count * this.unit(PRICING.standard.w, PRICING.standard.h, mat || 'vinyl');
        return this.ceilTo(raw, PRICING.packRoundStep);
    },

    // Precio REAL de sticker suelto según su tamaño
    stickerPrice(w, h, mat) {
        return this.ceilCent(this.unit(w || PRICING.standard.w, h || PRICING.standard.h, mat || 'vinyl'));
    },

    wholesaleOff(units) {
        let off = 0;
        for (const t of PRICING.wholesale) if (units >= t.min) off = t.off;
        return off;
    },

    wholesaleLabel() {
        return PRICING.wholesale.map(t => t.min + '+: −' + Math.round(t.off * 100) + '%').join(' · ');
    }
};