/* Rebuild BK_PRODUCTS from the Briefkasten feed (feed/category only — no scrape).
 * Writes feeds/_bk_products.js. */
const fs = require('fs');
const path = require('path');
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/briefkasten-finder.json'), 'utf8'));
const BASE = 'https://edelstahl-tuerklingel.de/';
const inc = (p, c) => (p.categories || []).includes(c);
/* Real mailbox universe = any mailbox category, minus accessories (Ständer/Schilder/
   Gravurleisten/Ersatzteile). The main "Briefkästen" cat is Einfamilien-only (1–2 fach) —
   the 3/4/6-fach Mehrfamilien models live in separate cats, so we union them in. */
const MAIL = ['Einfamilien Briefkasten', 'Mehrfamilien Briefkästen', 'Standbriefkästen', 'Unterputz Briefkästen', 'Briefkasten mit Klingel & Sprechanlage', 'Briefkästen'];
const EXC = ['Ersatzteile & Zubehör', 'Ersatz Gravurleisten & Namensschilder', 'Briefkastenschilder', 'Briefkastenständer', 'Briefkastenanlagen Konfigurator'];
const P = feed.products.filter((p) =>
  MAIL.some((c) => inc(p, c)) && !EXC.some((c) => inc(p, c)) && !/ständer|gravurleiste|nur schild|briefkastenschild/i.test(p.name));
const one = (a) => (Array.isArray(a) ? a : a == null ? [] : [a]);

function bauformOf(p) { return inc(p, 'Standbriefkästen') ? 'stand' : inc(p, 'Unterputz Briefkästen') ? 'unterputz' : 'wand'; }
function zeitungOf(z) { const v = one(z)[0]; if (!v) return null; if (/integriert/i.test(v)) return 'ja'; if (/optional/i.test(v)) return 'optional'; return 'nein'; }
function materialOf(m) {
  const s = new Set();
  one(m).forEach((x) => {
    const l = x.toLowerCase();
    if (l.includes('acryl')) s.add('acryl');
    else if (l.includes('holz') || l.includes('lärchen')) s.add('holz');
    else if (l.includes('edelstahl')) s.add('edelstahl');
    else s.add('stahl'); // Galvanisierter Stahl / Metall
  });
  return [...s];
}
function finishOf(f) { const s = new Set(); one(f).forEach((x) => { const l = x.toLowerCase(); if (l.includes('edelstahl')) s.add('edelstahl'); else if (l.includes('anthrazit')) s.add('anthrazit'); else s.add('andere'); }); return [...s]; }
function seriesOf(sku, name) { return (sku || '').replace(/-\d+(x|er|fach)?\b/i, '') || name.split('|').pop().trim(); }

const rows = P.map((p) => {
  const c = p.characteristics || {};
  const fachArr = one(c['Anzahl der Briefkastenfächer']);
  const fmax = fachArr.length ? +String(fachArr[0]).match(/\d+/)[0] : 1;
  return {
    id: p.id, sku: p.sku, series: seriesOf(p.sku, p.name), name: p.name, url: (p.url || '').replace(BASE, ''),
    price: (p.price_eur_gross && p.price_eur_gross.from) || 0,
    bauform: bauformOf(p), fmax, combo: inc(p, 'Briefkasten mit Klingel & Sprechanlage'),
    zeitung: zeitungOf(c.Zeitungsfach), material: materialOf(c.Material), finish: finishOf(c.Farbe),
  };
});
const j = JSON.stringify;
const lines = rows.map((p) => '    {' + [
  'id:' + j(p.id), 'sku:' + j(p.sku), 'series:' + j(p.series), 'name:' + j(p.name), 'url:' + j(p.url), 'price:' + p.price,
  'bauform:' + j(p.bauform), 'fmax:' + p.fmax, 'combo:' + p.combo,
  'zeitung:' + (p.zeitung ? j(p.zeitung) : 'null'), 'material:' + j(p.material), 'finish:' + j(p.finish),
].join(',') + '}');
fs.writeFileSync(path.join(__dirname, 'feeds/_bk_products.js'), '  var BK_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];');
console.log('wrote', rows.length, 'BK products');
const bf = {}; rows.forEach((r) => { bf[r.bauform] = (bf[r.bauform] || 0) + 1; });
const fd = {}; rows.forEach((r) => { fd[r.fmax] = (fd[r.fmax] || 0) + 1; });
console.log('bauform:', JSON.stringify(bf), '| combo:', rows.filter((r) => r.combo).length);
console.log('fmax:', JSON.stringify(fd), '| zeitung set:', rows.filter((r) => r.zeitung).length, '| series:', new Set(rows.map((r) => r.series)).size);
