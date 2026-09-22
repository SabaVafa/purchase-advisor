/* One-off: scrape Sprechanlage product descriptions for Optik attributes,
 * merge with feed base data, write _sp_enriched.json. Run: node feature-pills/scrape-sp-optik.js */
const fs = require('path') && require('fs');
const path = require('path');
const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'feeds/_sp_base.json'), 'utf8'));
const UA = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } };

function descOf(html) {
  const i = html.indexOf('id="tab-description"');
  if (i < 0) return '';
  let seg = html.slice(i, i + 30000);
  const j = seg.indexOf('id="tab-', 5);
  if (j > 0) seg = seg.slice(0, j);
  return seg.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
function detect(t) {
  const L = t.toLowerCase();
  return {
    led: /led-?taster|led-?ring|8-?farben|beleuchtet\w*\s+(taster|klingel|namensschild)|led-?namensschild/.test(L),
    display: /touch-?display|touchscreen|digitales bedienfeld|digitales namensschild/.test(L),
    papiereinleger: /papiereinleger/.test(L),
    lasergraviert: /lasergrav/.test(L),
    nameplate: /austauschbar\w*\s+namensschild|namensschild\w*\s+austauschbar|papiereinleger/.test(L),
  };
}
async function pool(items, n, fn) {
  const out = []; let i = 0;
  async function w() { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }
  await Promise.all(Array.from({ length: n }, w));
  return out;
}
(async () => {
  const enriched = await pool(rows, 5, async (r) => {
    try {
      const html = await (await fetch(r.url, UA)).text();
      const d = descOf(html);
      return Object.assign({}, r, { optik: detect(d), descLen: d.length });
    } catch (e) {
      return Object.assign({}, r, { optik: null, err: e.message });
    }
  });
  fs.writeFileSync(path.join(__dirname, 'feeds/_sp_enriched.json'), JSON.stringify(enriched, null, 1));
  const ok = enriched.filter((e) => e.optik).length;
  console.log('scraped', enriched.length, '| ok', ok, '| errors', enriched.length - ok);
  console.log('\nsku                media  taster                 optik');
  enriched.forEach((e) => {
    const o = e.optik || {};
    const flags = [o.led && 'LED', o.display && 'TOUCH', o.papiereinleger && 'PAPIER', o.lasergraviert && 'LASER'].filter(Boolean).join(' ') || '-';
    console.log('  ' + String(e.sku || '?').padEnd(18) + ' ' + e.media.padEnd(6) + ' [' + e.taster.join(',') + ']'.padEnd(4) + '  ' + flags);
  });
})();
