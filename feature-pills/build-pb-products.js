/* Rebuild PB_PRODUCTS from the Paketbox feed (feed/category only — no scrape needed;
 * the one non-facet axis, XL, is reliably in the name/sku). Writes feeds/_pb_products.js. */
const fs = require('fs');
const path = require('path');
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/paketboxen-finder.json'), 'utf8'));
const BASE = 'https://edelstahl-tuerklingel.de/';
const main = 'Paketboxen';
const P = feed.products.filter((p) => (p.categories || []).includes(main));
const inc = (p, c) => (p.categories || []).includes(c);
const one = (a) => (Array.isArray(a) ? a : a == null ? [] : [a]);

function materialOf(m) { const s = new Set(); one(m).forEach((x) => s.add(/galvan|stahl/i.test(x) && !/edelstahl/i.test(x) ? 'stahl' : 'edelstahl')); return [...s]; }
function finishOf(f) { const s = new Set(); one(f).forEach((x) => { const l = x.toLowerCase(); if (l.includes('edelstahl')) s.add('edelstahl'); else if (l.includes('anthrazit')) s.add('anthrazit'); else s.add('andere'); }); return [...s]; }
function seriesOf(sku, name) { return (sku || name || '').replace(/-\d+x\b/i, ''); } // strip fach-count token
function isXL(p) { return /paketbox xl|bispo\s*max|\bxl\b|-max\b|-max-/i.test(p.name + ' ' + (p.sku || '')); }

const rows = P.map((p) => {
  const c = p.characteristics || {};
  const fachArr = one(c['Anzahl der Briefkastenfächer']);
  const fmax = fachArr.length ? +String(fachArr[0]).match(/\d+/)[0] : 0;
  const gravur = inc(p, 'Paketboxen mit Gravur') ? ['mit'] : inc(p, 'Paketboxen ohne Gravur') ? ['ohne'] : [];
  return {
    id: p.id, sku: p.sku, series: seriesOf(p.sku, p.name), name: p.name, url: (p.url || '').replace(BASE, ''),
    price: (p.price_eur_gross && p.price_eur_gross.from) || 0,
    fmax, combo: inc(p, 'Paketboxen mit Klingel & Sprechanlage'), xl: isXL(p), bel: inc(p, 'Paketboxen beleuchtet'),
    gravur, material: materialOf(c.Material), finish: finishOf(c.Farbe),
  };
});
const j = JSON.stringify;
const lines = rows.map((p) => '    {' + [
  'id:' + j(p.id), 'sku:' + j(p.sku), 'series:' + j(p.series), 'name:' + j(p.name), 'url:' + j(p.url), 'price:' + p.price,
  'fmax:' + p.fmax, 'combo:' + p.combo, 'xl:' + p.xl, 'bel:' + p.bel,
  'gravur:' + j(p.gravur), 'material:' + j(p.material), 'finish:' + j(p.finish),
].join(',') + '}');
fs.writeFileSync(path.join(__dirname, 'feeds/_pb_products.js'), '  var PB_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];');
console.log('wrote', rows.length, 'PB products | XL:', rows.filter((r) => r.xl).length, '| combo:', rows.filter((r) => r.combo).length, '| bel:', rows.filter((r) => r.bel).length);
const fd = {}; rows.forEach((r) => { fd[r.fmax] = (fd[r.fmax] || 0) + 1; });
console.log('fmax dist:', JSON.stringify(fd), '| series:', new Set(rows.map((r) => r.series)).size);
