/* Rebuild SEC_PRODUCTS from the Sicherheitstechnik feed (feed/category only).
 * Writes feeds/_sec_products.js. */
const fs = require('fs');
const path = require('path');
const feed = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/sicherheitstechnik-finder.json'), 'utf8'));
const BASE = 'https://edelstahl-tuerklingel.de/';
const has = (p, c) => (p.categories || []).includes(c);
const one = (a) => (Array.isArray(a) ? a : a == null ? [] : [a]);
/* Universe = real security products; the main "Sicherheitstechnik" cat both includes
   Anschlussdosen accessories AND excludes Alarmanlagen, so union the real cats explicitly. */
const REAL = ['IP Kameras', 'WLAN Kameras', 'Dual-Objektiv Kameras', 'IP Kamera Sets', 'EasyLink WLAN Sets', 'Videorekorder', 'Alarmanlagen'];
const P = feed.products.filter((p) => REAL.some((c) => has(p, c)) && !has(p, 'Anschlussdosen & Zubehör'));

function typeOf(p) {
  if (has(p, 'IP Kamera Sets') || has(p, 'EasyLink WLAN Sets')) return 'set';
  if (has(p, 'Videorekorder')) return 'rekorder';
  if (has(p, 'Alarmanlagen')) return 'alarm';
  return 'kamera';
}
function connOf(p, c) {
  if (has(p, 'WLAN Kameras') || has(p, 'EasyLink WLAN Sets')) return 'wlan';
  if (one(c.POE).some((x) => /ja/i.test(x)) || has(p, 'IP Kameras') || has(p, 'IP Kamera Sets')) return 'poe';
  return null;
}
function mpOf(c) { const m = one(c['Auflösung']).map((x) => +String(x).match(/\d+/)[0]); return m.length ? Math.max(...m) : null; }

const rows = P.map((p) => {
  const c = p.characteristics || {};
  return {
    id: p.id, sku: p.sku, name: p.name, url: (p.url || '').replace(BASE, ''),
    price: (p.price_eur_gross && p.price_eur_gross.from) || 0,
    type: typeOf(p), conn: connOf(p, c), mp: mpOf(c),
    nachtColor: one(c.Nachtsicht).some((x) => /farbe/i.test(x)),
    ptz: one(c['PTZ-Funktion']).some((x) => /ja/i.test(x)),
    dual: has(p, 'Dual-Objektiv Kameras'),
  };
});
const j = JSON.stringify;
const lines = rows.map((p) => '    {' + [
  'id:' + j(p.id), 'sku:' + j(p.sku), 'name:' + j(p.name), 'url:' + j(p.url), 'price:' + p.price,
  'type:' + j(p.type), 'conn:' + (p.conn ? j(p.conn) : 'null'), 'mp:' + (p.mp == null ? 'null' : p.mp),
  'nachtColor:' + p.nachtColor, 'ptz:' + p.ptz, 'dual:' + p.dual,
].join(',') + '}');
fs.writeFileSync(path.join(__dirname, 'feeds/_sec_products.js'), '  var SEC_PRODUCTS=[\n' + lines.join(',\n') + '\n  ];');
console.log('wrote', rows.length, 'SEC products');
const td = {}; rows.forEach((r) => { td[r.type] = (td[r.type] || 0) + 1; });
console.log('type:', JSON.stringify(td));
console.log('conn poe:', rows.filter((r) => r.conn === 'poe').length, '| wlan:', rows.filter((r) => r.conn === 'wlan').length, '| null:', rows.filter((r) => !r.conn).length);
console.log('mp set:', rows.filter((r) => r.mp).length, '| ptz:', rows.filter((r) => r.ptz).length, '| nachtColor:', rows.filter((r) => r.nachtColor).length, '| dual:', rows.filter((r) => r.dual).length);
