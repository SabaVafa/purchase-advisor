/* Rebuild MT_PRODUCTS from the Mülltonnenbox feed (feed + name; no scrape —
 * pflanz & optik are reliably in the product name). Writes feeds/_mt_products.js. */
const fs = require('fs');
const path = require('path');
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/muelltonnenbox-finder.json'), 'utf8'));
const BASE = 'https://edelstahl-tuerklingel.de/';
const has = (p, c) => (p.categories || []).includes(c);
const one = (a) => (Array.isArray(a) ? a : a == null ? [] : [a]);
// real boxes: Mülltonnenboxen, minus accessories, minus the Zaun/Erweiterung (no Tonnen count)
const P = feed.products.filter((p) =>
  has(p, 'Mülltonnenboxen') && !has(p, 'Ersatzteile & Zubehör') && one((p.characteristics || {})['Anzahl der Mülltonnen']).length);

function tonnenOf(a) { return one(a).map((x) => +String(x).match(/\d+/)[0]); }
function finishOf(f) { const s = new Set(); one(f).forEach((x) => { const l = x.toLowerCase(); if (l.includes('edelstahl')) s.add('edelstahl'); else if (l.includes('anthrazit')) s.add('anthrazit'); else s.add('andere'); }); return [...s]; }
function optikOf(name) {
  const L = name.toLowerCase(); const o = [];
  if (/holzoptik/.test(L)) o.push('holz');
  if (/raute|quadratmuster|muster|designlinien|sichtstreifen|design-mülltonnenbox|geometr/.test(L)) o.push('design');
  if (/edelstahl-?akzent|mit edelstahl/.test(L)) o.push('akzent');
  if (!o.length) o.push('schlicht');
  return [...new Set(o)];
}
function seriesOf(sku, name) { return (sku || '').replace(/-\d+x/i, '').replace(/-(an|es|ral\w*|weiss|braun|grau|schwarz|beige)$/i, '') || name.split('|')[0].trim(); }

const rows = P.map((p) => {
  const c = p.characteristics || {};
  return {
    id: p.id, sku: p.sku, series: seriesOf(p.sku, p.name), name: p.name, url: (p.url || '').replace(BASE, ''),
    price: (p.price_eur_gross && p.price_eur_gross.from) || 0,
    tonnen: tonnenOf(c['Anzahl der Mülltonnen']), pflanz: /pflanzdach/i.test(p.name),
    optik: optikOf(p.name), finish: finishOf(c.Farbe),
  };
});
const j = JSON.stringify;
const lines = rows.map((p) => '    {' + [
  'id:' + j(p.id), 'sku:' + j(p.sku), 'series:' + j(p.series), 'name:' + j(p.name), 'url:' + j(p.url), 'price:' + p.price,
  'tonnen:' + j(p.tonnen), 'pflanz:' + p.pflanz, 'optik:' + j(p.optik), 'finish:' + j(p.finish),
].join(',') + '}');
fs.writeFileSync(path.join(__dirname, 'feeds/_mt_products.js'), '  var MT_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];');
console.log('wrote', rows.length, 'MT products | pflanz:', rows.filter((r) => r.pflanz).length);
const td = {}; rows.forEach((r) => r.tonnen.forEach((t) => { td[t] = (td[t] || 0) + 1; }));
console.log('tonnen dist:', JSON.stringify(td), '| series:', new Set(rows.map((r) => r.series)).size);
const od = {}; rows.forEach((r) => r.optik.forEach((o) => { od[o] = (od[o] || 0) + 1; }));
console.log('optik dist:', JSON.stringify(od));
