# Metzler Kaufberater — Category Onboarding Playbook
**Purpose:** repeatable process to add any Metzler shop category to the Kaufberater, reusing one shared feature dictionary. Derived from the Sprechanlagen pilot.
**Companion files:** `Feature-Dictionary.md` (shared data layer) · `Sprechanlagen-Kaufberater.md` (worked example / reference output).

---

## 0. Golden rules (why this method exists)
1. **Facets & Merkmale tables are NOT ground truth.** Mine features from, in priority order: (1) product **description prose**, (2) **configurator** options, (3) category **info/explainer hub**, (4) linked FAQ/docs, (5) OEM datasheets. Tables/facets = secondary cross-check only.
2. **Every feature traces to an exact source sentence + URL.** Non-negotiable — it's what makes unreliable data auditable and lets a human confirm.
3. **Never invent a spec. Flag gaps as ⚑ needs-Metzler-confirmation** and keep flagged items out of the live bot until confirmed.
4. **The category info/explainer hub is the goldmine.** For Sprechanlagen, `/sprechanlagen-info` alone held the hard-compatibility axis + legacy-system list — none of it in facets. **Find the hub first, before crawling products.**
5. **Crawl by SERIES, not by SKU** (see §3). Variants that share a description are configurator axes, not separate research targets.

---

## 1. The 5-step pipeline (same every category)

| Step | Output | Tool pattern |
|--|--|--|
| 1. Map | subcategory tree + product URL list per subcat | browser `navigate` + link-extractor JS (§A) |
| 2. Mine | per-representative-product features w/ source sentences | parallel subagents + fixed extractor (§B) |
| 3. Union inventory | master feature list w/ dictionary IDs | reconcile into `Feature-Dictionary.md` |
| 4. Gap matrix | products × features (✓ / ~ / N-A) + punch-list | derive from step 2/3 |
| 5. Question flow | hard-constraint-first advisor questions | order by filter impact (§4) |

**Always do first in a new category:** open the category root + its **info/explainer hub** (and any "Konfigurator" landing page). Read those before touching product pages — they define the hard axes.

---

## 2. Environment notes (learned the hard way)
- **WebFetch returns HTTP 500 / truncates** on this shop (JS-rendered SPA, reviews push description past the truncation limit). **Use the in-app browser**, not WebFetch.
- Product slugs start with `metzler-`; exclude nav/footer noise (`metzler-garantieerklaerung`, `metzler-geschenkgutschein`, `metzler-24v-garten-lichtsystem-steinel`).
- Category pages **lazy-load / paginate** (`_s2` etc.). Check the "N Artikel" count vs. links found; scroll or page if short. Some "N Artikel" counts include shared items shown in sub-blocks (e.g. Innenstationen counted inside Zubehör).
- Reviews are heavy noise in `get_page_text`; target the description `.tab-pane` instead.
- The description tab lives in the largest `.tab-pane`; the Merkmale/tech tables are `<table>` elements; the configurator summary (System/Farbe/Anzahl) sits in the tech-details block and top buybox.

---

## 3. Series-sampling rule
1. From the category listing, group products into **series/models** (e.g. VDM10→Colson/Kian/Neo/Niko/Horizon).
2. Mine **one representative SKU per model** in full.
3. Record variant axes (button count, color, size) from the **configurator**, not by crawling each SKU.
4. Only crawl an extra SKU if its description likely differs (e.g. a "mit Fingerprint" or "Komplettset" variant). Sprechanlagen: 38 SKUs → 11 models mined → full coverage.

---

## 4. Question-flow ordering heuristic (reusable)
Order questions by **how many products each eliminates**, hardest constraints first:
1. **Hard compatibility / fit** (the category's defining axis — e.g. Verkabelung for Sprechanlagen, Einbauart/Montage for Briefkästen, wired-vs-Funk for Klingeln).
2. **Type/mode split** (Video vs Audio; Auf-/Unter-/Standmontage; Einzel vs Anlage).
3. **Scale / units** (EFH vs MFH, number of parties/compartments).
4. **Function/feature preferences** (access methods, app, night vision…).
5. **Aesthetics last** (color/RAL, engraving, nameplate).
- Each question: **DE customer text + EN gloss**, options mapped to feature **values (by dictionary ID)**, and branching (which attrs it filters, which later Qs it makes irrelevant).
- Any question that can't be answered from data → **⚑ needs-Metzler-confirmation**, not a guess.

---

## 5. Metzler data-fix loop (turn the gap matrix into business value)
The "~" cells + ⚑ inconsistencies are a **content punch-list**. Per category:
1. Export the per-product "Merkmale to add" list.
2. Hand to Metzler to fix the **source** page content (also improves facets + SEO).
3. **Re-verify** after fixes; promote ⚑ items into the live bot only once confirmed.
This fixes the root cause (bad source data) instead of patching each advisor.

---

## 6. Cadence & governance
- **Traceability:** keep source-sentence + URL for every value (already in the dictionary schema).
- **Re-crawl cadence:** quarterly, or on catalog change. A static extract goes stale silently — data drifts and even contradicts itself across pages of the same product.
- **Versioning:** stamp each category extract with a crawl date (dictionary `last_verified`).

---

## Appendix A — Link/URL extractor (paste into browser `javascript_tool`)
```javascript
// Category product-URL collector. Run after navigate + scroll-to-bottom if lazy-loaded.
(() => {
  const skip = new Set(['metzler-garantieerklaerung','metzler-geschenkgutschein','metzler-24v-garten-lichtsystem-steinel']);
  const prods = [...new Set([...document.querySelectorAll('a[href]')]
    .map(a => a.href.replace('https://edelstahl-tuerklingel.de/',''))
    .filter(s => s.startsWith('metzler-') && !s.includes('#') && !s.includes('__') && !skip.has(s)))];
  const count = (document.body.innerText.match(/(\d+)\s*Artikel/) || [])[1];
  return JSON.stringify({ url: location.pathname, artikel: count, n: prods.length, products: prods }, null, 0);
})();
```

## Appendix B — Fixed product extractor (paste into browser `javascript_tool`)
```javascript
// Per-product feature extractor. Returns description prose + tables + configurator-bearing top block.
(() => {
  const desc = [...document.querySelectorAll('.tab-pane')].map(e => e.innerText).sort((a,b)=>b.length-a.length)[0] || '';
  const tables = [...document.querySelectorAll('table')].map(t => t.innerText).join('\n==TABLE==\n');
  const bodyTop = document.body.innerText.split(/Beschreibung|Bewertungen/)[0].slice(0,3500);
  const title = document.querySelector('h1') ? document.querySelector('h1').innerText : '';
  const art = (document.body.innerText.match(/Artikelnummer:?\s*([0-9]+)/) || [])[1] || '';
  const price = (document.body.innerText.match(/ab\s*[\d.,]+\s*€|[\d.]+,\d{2}\s*€/) || [])[0] || '';
  return JSON.stringify({ title, art, price, bodyTop, desc: desc.slice(0,13000), tables: tables.slice(0,4500) });
})();
```
> If the configurator color/option list isn't in `bodyTop`, also run `get_page_text` (max ~6000 chars) and read the top section before "Beschreibung".

## Appendix C — Parallel extraction subagent prompt (template)
Fill `{CATEGORY}`, `{FIRST_URL}`, `{URL_LIST}`, `{CATEGORY_SPECIFIC_HINTS}`.
```
You are mining product features from Metzler {CATEGORY} product pages (edelstahl-tuerklingel.de).
DATA CAVEAT: Merkmale tables & facets are OUTDATED; PRIMARY source = DESCRIPTION PROSE + CONFIGURATOR. Tables = secondary only.

TOOLS: in-app browser (mcp__Claude_Browser__*). SETUP ONCE: call tabs_create for your OWN tabId;
if no preview open, preview_start {"url":"{FIRST_URL}"} and use the returned tabId. Never use "seed"/"main".

For EACH url: (a) navigate {tabId,url}; (b) javascript_tool with the FIXED EXTRACTOR (Appendix B), verbatim;
(c) if options missing, get_page_text {tabId,max_chars:6000} and read the top (configurator) section.

Extract every feature/claim/spec. {CATEGORY_SPECIFIC_HINTS}
Capture horizontal features too: color/RAL-Wunschfarbe, material, mounting (Auf-/Unterputz/Stand), engraving/Schriftart,
austauschbares Namensschild, EFH/MFH scaling, illuminated, Lieferumfang.

OUTPUT (only this), per product:
### <title> | Art <art> | <price>
URL: <url>
CONFIG: <each configurator option group + selectable values>
FEATURES: bullets `<feature>: <value>` — "<short source sentence <20 words>" [desc|config|table]
LIEFERUMFANG: <if stated>
NOTES: what is UNIQUE to this model vs siblings.
Never invent. If absent, omit.

URLs (base = https://edelstahl-tuerklingel.de/):
{URL_LIST}
```
Batch ~4–5 products per subagent; run 4–6 subagents in parallel, each on its own browser tab.

## Appendix D — Per-category checklist
- [ ] Root + info/explainer hub + any "Konfigurator" page read first
- [ ] Subcategory tree mapped; product URLs collected per subcat (lazy-load/pagination checked)
- [ ] Products grouped into series; representatives chosen
- [ ] Parallel extraction run; source sentences captured
- [ ] Horizontal features reconciled to existing dictionary IDs (reuse, don't redefine)
- [ ] Category-specific features assigned new IDs (`<CAT>-…`)
- [ ] Union inventory + gap matrix + punch-list produced
- [ ] Question flow ordered hard-first; ⚑ gaps flagged
- [ ] Punch-list sent to Metzler; ⚑ items withheld from live bot
- [ ] Crawl date stamped; re-crawl scheduled
