/*
 * Feature-Pills generator
 * -----------------------
 * Reads every "<category>-finder.json" feed in ./feeds and produces a single
 * organized index.html that lists each product of that category with its
 * feature pills (derived straight from the feed).
 *
 * To extend to a new category:  drop its "*-finder.json" into ./feeds and run
 *   node feature-pills/build.js
 *
 * All feature data comes from the feed itself and is handled GENERICALLY:
 *   - facet pills   -> product.finder_facets  (any Merkmal the feed lists)
 *   - flag pills    -> product.categories entries starting with "<Category> "
 *                      (e.g. "Paketboxen mit Gravur" -> "mit Gravur")
 *   - Preisklasse   -> its own pill
 *   - dims in feed finder_guide.skip_single_value (+ "Marke") are skipped
 * Unknown facet keys still render (with a neutral colour), so a new feed works
 * without code changes; per-category cosmetics live in CATEGORY_CONFIG.
 */

const fs = require('fs');
const path = require('path');

const FEEDS_DIR = path.join(__dirname, 'feeds');
const OUT_FILE = path.join(__dirname, 'index.html');

/* Per-category niceties, keyed by feed category.slug. Optional.
 *  emptyFach : label to show when the Fächer facet is absent
 *  flags     : subcategory-name -> pill label, for feeds whose useful features
 *              live in the category tree instead of finder_facets (Türklingel). */
const CATEGORY_CONFIG = {
  paketboxen: { emptyFach: 'Ohne Briefkasten' },
  tuerklingel: {
    flags: {
      'Aufputz Türklingeln': 'Aufputz',
      'Unterputz Türklingeln': 'Unterputz',
      'Funkklingeln': 'Funk',
      'Aufputz Klingeln kabelgebunden': 'Kabelgebunden',
      'Mehrfamilien Klingel': 'Mehrfamilienhaus',
    },
  },
};

/* Dimensions that are NOT differentiating Merkmale for a buying decision:
 * colours (Farbe / LED-Farbe) and price (Preisklasse). Never shown as pills. */
const EXCLUDE_DIMS = new Set(['Farbe', 'LED-Farbe', 'Preisklasse']);

/* Facet key -> pill colour class. Unknown keys fall back to 'misc'. */
const DIM_STYLE = {
  'Anzahl der Briefkastenfächer': 'fach',
  'Anzahl der Klingeltaster': 'taster',
  'Material': 'material',
  'LED-Spannung': 'volt',
  'Einbaudurchmesser': 'dia',
  'Beleuchtung': 'bel',
  'Funktion': 'fn',
};

/* Pill display order (lower = earlier); unknown dims -> 50, flags always last. */
const DIM_ORDER = {
  'Anzahl der Briefkastenfächer': 10,
  'Anzahl der Klingeltaster': 11,
  'Material': 20,
  'LED-Spannung': 21,
  'Einbaudurchmesser': 22,
  'Funktion': 23,
  'Beleuchtung': 24,
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const fachLabel = (v) => (v === '1' ? '1 Briefkastenfach' : `${v} Briefkastenfächer`);

/* Build the grouped pill list for one product (differentiating Merkmale only). */
function pillsFor(p, main, cfg, skipSet) {
  const f = p.finder_facets || {};
  const entries = [];
  for (const key in f) {
    if (key === 'Marke' || EXCLUDE_DIMS.has(key) || skipSet.has(key)) continue;
    let vals = f[key];
    vals = Array.isArray(vals) ? vals : [vals];
    if (vals.length) entries.push({ key, vals });
  }
  if (cfg.emptyFach && !f['Anzahl der Briefkastenfächer'])
    entries.push({ key: 'Anzahl der Briefkastenfächer', vals: [cfg.emptyFach] });

  entries.sort(
    (a, b) => (DIM_ORDER[a.key] ?? 50) - (DIM_ORDER[b.key] ?? 50) || a.key.localeCompare(b.key)
  );

  const groups = entries.map((e) => {
    const isFach = e.key === 'Anzahl der Briefkastenfächer';
    return {
      group: DIM_STYLE[e.key] || 'misc',
      items: e.vals.map((v) => ({ text: isFach && /^\d+$/.test(v) ? fachLabel(v) : v })),
    };
  });

  /* Flag pills — differentiating features that live in the category tree.
   * (a) auto: subcategories named "<Main> …" ("Paketboxen mit Gravur" -> "mit Gravur")
   * (b) mapped: per-category CATEGORY_CONFIG.flags (Türklingel: Aufputz, Funk, …) */
  const seen = new Set();
  const flags = [];
  const prefix = main + ' ';
  (p.categories || []).forEach((c) => {
    if (c.startsWith(prefix)) {
      const l = c.slice(prefix.length);
      if (!seen.has(l)) { seen.add(l); flags.push(l); }
    }
  });
  if (cfg.flags) {
    Object.keys(cfg.flags).forEach((cat) => {
      if ((p.categories || []).includes(cat)) {
        const l = cfg.flags[cat];
        if (!seen.has(l)) { seen.add(l); flags.push(l); }
      }
    });
  }
  if (flags.length) groups.push({ group: 'flag', items: flags.map((t) => ({ text: t })) });

  return groups;
}

function priceLabel(pr) {
  if (!pr || pr.from == null) return '';
  return pr.from === pr.to ? `${pr.from} €` : `${pr.from}–${pr.to} €`;
}

function renderPill({ text }, group) {
  return `<span class="pill pill--${group}">${esc(text)}</span>`;
}

function renderCard(p, main, cfg, skipSet) {
  const groups = pillsFor(p, main, cfg, skipSet);
  const pills = groups
    .map((g) => g.items.map((it) => renderPill(it, g.group)).join(''))
    .join('');
  const searchBlob = esc(
    [p.name, p.sku, p.id, ...groups.flatMap((g) => g.items.map((i) => i.text))].join(' ').toLowerCase()
  );
  const artnr = p.id != null ? `<span class="artnr">Art.-Nr. ${esc(p.id)}</span>` : '';
  return `      <article class="card" data-search="${searchBlob}">
        <header class="card__head">
          <a class="card__name" href="${esc(p.url || '#')}" target="_blank" rel="noopener">${esc(p.name)}</a>
          <div class="card__meta"><span class="ids">${artnr}<span class="sku">${esc(p.sku || '')}</span></span><span class="price">${esc(priceLabel(p.price_eur_gross))}</span></div>
        </header>
        <div class="pills">${pills}</div>
      </article>`;
}

function renderSection(feed, idx) {
  const main = feed.category.name;
  const slug = feed.category.slug || String(idx);
  const cfg = CATEGORY_CONFIG[slug] || {};
  const skip = (feed.finder_guide && feed.finder_guide.skip_single_value) || {};
  const skipSet = new Set(Object.keys(skip));
  const products = feed.products
    .filter((p) => (p.categories || []).includes(main))
    .sort((a, b) => (a.price_eur_gross?.from ?? 0) - (b.price_eur_gross?.from ?? 0));

  const rec = (feed.finder_guide && feed.finder_guide.recommended_questions) || [];
  const legend = rec
    .map((r) => `<li><b>${esc(r.merkmal)}</b> <span class="muted">${r.answers.length} Werte · ${r.covers_models} Modelle</span></li>`)
    .join('');
  const skipList = Object.keys(skip).map((k) => `${esc(k)} = ${esc(skip[k])}`).join(' · ');

  const cards = products.map((p) => renderCard(p, main, cfg, skipSet)).join('\n');

  return `  <section class="cat" id="${esc(slug)}">
    <div class="cat__head">
      <h2>${esc(main)} <span class="count">${products.length} Produkte</span></h2>
      <a class="cat__link" href="${esc(feed.category.url || '#')}" target="_blank" rel="noopener">Kategorie ansehen ↗</a>
    </div>
    <details class="legend">
      <summary>Feature-Legende (aus dem Feed)</summary>
      <ul class="legend__list">${legend}</ul>
      ${skipList ? `<p class="muted">Ausgelassen (nur ein Wert): ${skipList}</p>` : ''}
    </details>
    <div class="grid">
${cards}
    </div>
  </section>`;
}

function renderPage(feeds) {
  const nav = feeds
    .map((f) => `<a href="#${esc(f.category.slug)}">${esc(f.category.name)}</a>`)
    .join('');
  const sections = feeds.map((f, i) => renderSection(f, i)).join('\n\n');
  const totalProducts = feeds.reduce(
    (n, f) => n + f.products.filter((p) => (p.categories || []).includes(f.category.name)).length,
    0
  );

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Feature-Pills · Metzler Kategorien</title>
<style>
  :root{
    --bg:#f4f6f7; --card:#fff; --ink:#0f2f36; --muted:#6b7a80; --line:#e2e8ea; --accent:#0b5563;
    --fach:#0b6bcb; --fach-bg:#e6f1fd; --taster:#c2410c; --taster-bg:#fdece2;
    --material:#0f766e; --material-bg:#e3f4f1; --flag:#15803d; --flag-bg:#e6f4ea;
    --volt:#b45309; --volt-bg:#fdefd0; --dia:#0e7490; --dia-bg:#d9f2f6;
    --bel:#4f46e5; --bel-bg:#e7e6fb; --fn:#be123c; --fn-bg:#fde3ea;
    --misc:#475569; --misc-bg:#eef1f4;
  }
  @media (prefers-color-scheme: dark){
    :root{ --bg:#0e1517; --card:#152023; --ink:#e8eef0; --muted:#8ba0a6; --line:#243237; --accent:#4bb3c6;
      --fach:#7cc0ff; --fach-bg:#12314d; --taster:#f0a878; --taster-bg:#3a1f10;
      --material:#5fd0c4; --material-bg:#0e332f; --flag:#86e0a5; --flag-bg:#123322;
      --volt:#f4c877; --volt-bg:#3a2a0c; --dia:#67d4e6; --dia-bg:#0c3239; --bel:#b4adff; --bel-bg:#201d47;
      --fn:#f78fa7; --fn-bg:#3a1220; --misc:#cbd5e1; --misc-bg:#222c31; }
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
  .wrap{max-width:1180px;margin:0 auto;padding:28px 20px 64px}
  header.top{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:baseline;justify-content:space-between;margin-bottom:8px}
  h1{font-size:22px;margin:0}
  .sub{color:var(--muted);font-size:13px}
  .nav{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}
  .nav a{font-size:13px;padding:5px 12px;border:1px solid var(--line);border-radius:999px;color:var(--ink);text-decoration:none;background:var(--card)}
  .nav a:hover{border-color:var(--accent);color:var(--accent)}
  .search{width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font-size:14px;margin-bottom:24px}
  .cat{margin:0 0 40px}
  .cat__head{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:baseline;justify-content:space-between;border-bottom:2px solid var(--line);padding-bottom:8px;margin-bottom:14px}
  .cat__head h2{font-size:18px;margin:0}
  .count{font-size:13px;color:var(--muted);font-weight:400;margin-left:6px}
  .cat__link{font-size:13px;color:var(--accent);text-decoration:none}
  .legend{margin-bottom:16px;font-size:13px}
  .legend summary{cursor:pointer;color:var(--accent)}
  .legend__list{display:flex;flex-wrap:wrap;gap:6px 18px;list-style:none;padding:10px 0 4px;margin:0}
  .muted{color:var(--muted)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 15px;display:flex;flex-direction:column;gap:10px}
  .card__name{font-weight:600;font-size:14px;color:var(--ink);text-decoration:none;line-height:1.35}
  .card__name:hover{color:var(--accent)}
  .card__meta{display:flex;justify-content:space-between;gap:10px;margin-top:5px;font-size:12px;color:var(--muted)}
  .ids{display:flex;flex-wrap:wrap;gap:3px 10px;align-items:baseline}
  .artnr,.sku{font-family:ui-monospace,Menlo,Consolas,monospace}
  .artnr{color:var(--ink);font-weight:600}
  .sku{color:var(--muted)}
  .price{font-weight:600;color:var(--ink);white-space:nowrap}
  .pills{display:flex;flex-wrap:wrap;gap:6px}
  .pill{display:inline-flex;align-items:center;gap:5px;font-size:12px;line-height:1;padding:5px 9px;border-radius:999px;white-space:nowrap;font-weight:500}
  .pill--fach{background:var(--fach-bg);color:var(--fach)}
  .pill--taster{background:var(--taster-bg);color:var(--taster)}
  .pill--material{background:var(--material-bg);color:var(--material)}
  .pill--flag{background:var(--flag-bg);color:var(--flag)}
  .pill--volt{background:var(--volt-bg);color:var(--volt)}
  .pill--dia{background:var(--dia-bg);color:var(--dia)}
  .pill--bel{background:var(--bel-bg);color:var(--bel)}
  .pill--fn{background:var(--fn-bg);color:var(--fn)}
  .pill--misc{background:var(--misc-bg);color:var(--misc)}
</style>
</head>
<body>
  <div class="wrap">
    <header class="top">
      <h1>Feature-Pills nach Kategorie</h1>
      <span class="sub">${feeds.length} Kategorie(n) · ${totalProducts} Produkte · Merkmale direkt aus dem Feed</span>
    </header>
    <nav class="nav">${nav}</nav>
    <input class="search" type="search" placeholder="Produkt, SKU, Art.-Nr. oder Feature suchen …" oninput="filterCards(this.value)">
${sections}
  </div>
  <script>
    function filterCards(q){
      q=(q||'').trim().toLowerCase();
      document.querySelectorAll('.card').forEach(function(c){
        c.style.display = !q || c.dataset.search.indexOf(q)>-1 ? '' : 'none';
      });
      document.querySelectorAll('.cat').forEach(function(s){
        var any=[].some.call(s.querySelectorAll('.card'),function(c){return c.style.display!=='none';});
        s.style.display=any?'':'none';
      });
    }
  </script>
</body>
</html>
`;
}

/* --- main --- */
const files = fs.readdirSync(FEEDS_DIR).filter((f) => f.endsWith('.json')).sort();
if (!files.length) {
  console.error('No feed *.json files in', FEEDS_DIR);
  process.exit(1);
}
const feeds = files.map((f) => JSON.parse(fs.readFileSync(path.join(FEEDS_DIR, f), 'utf8')));
fs.writeFileSync(OUT_FILE, renderPage(feeds), 'utf8');
feeds.forEach((f) => {
  const n = f.products.filter((p) => (p.categories || []).includes(f.category.name)).length;
  console.log(`  ${f.category.name}: ${n} products`);
});
console.log('Wrote', OUT_FILE);
