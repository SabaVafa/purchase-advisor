/* Rebuild TK_PRODUCTS from the Türklingel feed + scraped descriptions.
 * Writes feeds/_tk_products.js. Run: node feature-pills/scrape-tk.js */
const fs = require('fs');
const path = require('path');
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/tuerklingel-finder.json'), 'utf8'));
const BASE = 'https://edelstahl-tuerklingel.de/';
const UA = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } };
const main = 'Türklingeln';
const products = feed.products.filter((p) => (p.categories || []).includes(main));

const one = (a) => (Array.isArray(a) ? a : a == null ? [] : [a]);
function tasterNums(arr) { const n = []; one(arr).forEach((t) => { const m = String(t).match(/\d+/); if (m) n.push(+m[0]); }); return n; }
function finishOf(farbe) {
  const set = new Set();
  one(farbe).forEach((f) => { const l = f.toLowerCase(); if (l.includes('edelstahl')) set.add('edelstahl'); else if (l.includes('anthrazit')) set.add('anthrazit'); else set.add('andere'); });
  return [...set];
}
function mountOf(m) { return one(m).map((x) => x.toLowerCase()).filter((x) => x === 'aufputz' || x === 'unterputz'); }
function seriesOf(name) {
  const seg = name.split('|').pop().trim();           // model name, e.g. "Tara Slim M3"
  return seg.replace(/\s+M\d+\b.*$/i, '').trim() || seg; // strip trailing "M3"/"M4 ..." -> series
}
function descOf(html) {
  const i = html.indexOf('id="tab-description"'); if (i < 0) return '';
  let seg = html.slice(i, i + 30000); const j = seg.indexOf('id="tab-', 5); if (j > 0) seg = seg.slice(0, j);
  return seg.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
function detect(text, name) {
  const L = (name + ' ' + text).toLowerCase();
  // label from the NAME only — the description mentions Gravur/Namensschild generically and
  // over-triggers. "schild" = austauschbar/Papier Namensschild specifically, NOT any Namensschild
  // (a lasergraviertes Namensschild also contains the word "Namensschild").
  const N = name.toLowerCase();
  const label = [];
  if (/gravur|graviert/.test(N)) label.push('gravur');
  if (/austauschbar\w*\s+namensschild|namensschild\w*\s+austauschbar|papiereinleger/.test(N)) label.push('schild');
  if (/klingelsymbol|nur symbol|ohne namen/.test(N)) label.push('symbol');
  const optik = [];
  if (/acrylglas|acryl|\bdesign\b/.test(L)) optik.push('design');
  if (/quadrat/.test(L)) optik.push('quadratisch');
  if (/\bxl\b|großformat|gross-?format|großformat/.test(L)) optik.push('xl');
  if (/motiv|pusteblume/.test(L)) optik.push('motiv');
  if (!optik.length || /schlicht|klassisch|reduziert/.test(L)) optik.push('schlicht');
  return {
    label: label.length ? label : ['schild'],
    optik: [...new Set(optik)],
    ledname: /beleuchtet\w*\s+namensschild|led-?namensschild|hinterleuchtet/.test(L),
    hausnr: /beleuchtet\w*\s+hausnummer|led-?hausnummer|3d-?led/.test(L),
  };
}
async function pool(items, n, fn) { const out = []; let i = 0; async function w() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } } await Promise.all(Array.from({ length: n }, w)); return out; }

(async () => {
  const rows = await pool(products, 6, async (p) => {
    const c = p.characteristics || {};
    const conn = (p.categories || []).includes('Funkklingeln') ? 'funk' : 'wired';
    const ledFarbe = one(c['LED-Farbe']).filter((x) => !/ohne/i.test(x));
    let det = { label: ['schild'], optik: ['schlicht'], ledname: false, hausnr: false };
    try { det = detect(descOf(await (await fetch(p.url, UA)).text()), p.name); } catch (e) { det._err = e.message; }
    return {
      id: p.id, sku: p.sku, series: seriesOf(p.name), name: p.name, url: (p.url || '').replace(BASE, ''),
      price: (p.price_eur_gross && p.price_eur_gross.from) || 0,
      conn, taster: (tasterNums(c['Anzahl der Klingeltaster']).length ? tasterNums(c['Anzahl der Klingeltaster']) : [1]),
      label: det.label, ledbtn: ledFarbe.length > 0, ledname: det.ledname, hausnr: det.hausnr,
      optik: det.optik, finish: finishOf(c.Farbe), mount: mountOf(c.Montageart),
    };
  });
  // emit JS
  const j = JSON.stringify;
  const lines = rows.map((p) => '    {' + [
    'id:' + j(p.id), 'sku:' + j(p.sku), 'series:' + j(p.series), 'name:' + j(p.name), 'url:' + j(p.url), 'price:' + p.price,
    'conn:' + j(p.conn), 'taster:' + j(p.taster), 'label:' + j(p.label),
    'ledbtn:' + p.ledbtn, 'ledname:' + p.ledname, 'hausnr:' + p.hausnr,
    'optik:' + j(p.optik), 'finish:' + j(p.finish), 'mount:' + j(p.mount),
  ].join(',') + '}');
  fs.writeFileSync(path.join(__dirname, 'feeds/_tk_products.js'), '  var TK_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];');
  console.log('wrote', rows.length, 'TK products');
  const bad = rows.filter((r) => !r.taster.length).length;
  console.log('missing taster:', bad, '| funk:', rows.filter((r) => r.conn === 'funk').length, '| wired:', rows.filter((r) => r.conn === 'wired').length);
  const series = {}; rows.forEach((r) => { series[r.series] = (series[r.series] || 0) + 1; });
  console.log('series:', Object.keys(series).length);
})();
