/* Build the new SP_PRODUCTS array from the enriched scrape + feed prices.
 * Writes feeds/_sp_products.js (JS array text) to splice into index.html. */
const fs = require('fs');
const path = require('path');
const enriched = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/_sp_enriched.json'), 'utf8'));
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/tuersprechanlagen-finder.json'), 'utf8'));
const priceById = {};
feed.products.forEach((p) => { priceById[p.id] = (p.price_eur_gross && p.price_eur_gross.from) || 0; });

const BASE = 'https://edelstahl-tuerklingel.de/';
const ACCESS = { 'RFID': 'rfid', 'PIN-Code': 'pin', 'Fingerprint': 'fingerprint', 'Gesichtserkennung': 'face', 'QR-Code': 'qr' };

function tasterNums(arr) {
  const nums = []; let flex = false;
  (arr || []).forEach((t) => { if (/flexibel/i.test(t)) flex = true; else { const m = t.match(/\d+/); if (m) nums.push(+m[0]); } });
  return { nums, flex };
}
function seriesOf(sku, name) {
  if (!sku) return name;
  return sku.replace(/-\d+N?T$/i, '').replace(/-S\d+$/i, ''); // strip trailing -4T / -3NT / -S250
}
function systemsOf(sysArr) {
  return (sysArr || []).some((s) => /BUS/i.test(s)) ? ['bus'] : ['ip-lan', 'ip-2draht'];
}

const products = enriched.map((e) => {
  const { nums, flex } = tasterNums(e.taster);
  const taster = nums.length ? nums : [1]; // fallback for the odd empty (paketbox combo)
  const access = ['app'].concat((e.access || []).map((a) => ACCESS[a]).filter(Boolean));
  const o = e.optik || {};
  const farbe = (e.farbe || []).map((f) => f.toLowerCase());
  const nm = (e.name || '').toLowerCase();
  // display = Touch-Display/Digitales Namensschild (SDM10); led = has a classic physical Klingeltaster = everything else
  const display = !!o.display || /touch-?display|digitales namensschild/.test(nm);
  const nameplate = !!(o.nameplate || o.papiereinleger) || /austauschbar\w*\s+namensschild/.test(nm);
  return {
    id: e.id, sku: e.sku, series: seriesOf(e.sku, e.name), name: e.name,
    url: (e.url || '').replace(BASE, ''), price: priceById[e.id] || 0,
    systems: systemsOf(e.system),
    media: e.media, combo: e.combo,
    taster, flex,
    access,
    wunsch: farbe.includes('wunschfarbe'),
    led: !display, display: display, nameplate: nameplate,
    farbe, material: (e.material || []).map((m) => m.toLowerCase()), fach: (e.fach || [])[0] || null,
  };
});

// emit compact JS
function j(v) { return JSON.stringify(v); }
const lines = products.map((p) => {
  const parts = [
    'id:' + j(p.id), 'sku:' + j(p.sku), 'series:' + j(p.series), 'name:' + j(p.name), 'url:' + j(p.url),
    'price:' + p.price, 'systems:' + j(p.systems), 'media:' + j(p.media),
    'combo:' + (p.combo === 'none' ? 'false' : j(p.combo)),
    'taster:' + j(p.taster), 'flex:' + p.flex, 'access:' + j(p.access),
    'wunsch:' + p.wunsch, 'led:' + p.led, 'display:' + p.display, 'nameplate:' + p.nameplate,
  ];
  return '    {' + parts.join(',') + '}';
});
const out = '  var SP_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];';
fs.writeFileSync(path.join(__dirname, 'feeds/_sp_products.js'), out);
console.log('wrote', products.length, 'products');
// sanity summary
const bySeries = {};
products.forEach((p) => { bySeries[p.series] = (bySeries[p.series] || 0) + 1; });
console.log('series count:', Object.keys(bySeries).length);
console.log(Object.entries(bySeries).map(([s, n]) => s + '(' + n + ')').join(', '));
