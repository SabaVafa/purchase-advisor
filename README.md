# Metzler Kaufberater (Purchase Advisor)

Interactive product-finder quiz for **edelstahl-tuerklingel.de**. The shopper answers a few
short questions and the advisor recommends matching products. Built category by category
(Türklingel, Türsprechanlagen, Briefkästen, Paketboxen, Sicherheitstechnik, Mülltonnenboxen).

Live preview (GitHub Pages): <https://sabavafa.github.io/purchase-advisor/>

## The deliverable

- **`index.html`** — the canonical, self-contained advisor: markup + CSS + JS + the product
  data embedded inline. **This is the source of truth** and what gets embedded on the shop's
  category pages. Edit this file.

## Repo map

| Path | What it is |
| --- | --- |
| `index.html` | Canonical standalone advisor. **Edit here.** |
| `feature-pills/` | Build tooling — `build-*.js` turn category feed exports into the product arrays embedded in the advisor. `feature-pills/feeds/` holds raw feeds (git-ignored). |
| `Json Folder/` | Raw category "finder" feed exports — inputs to the build scripts (git-ignored, kept local). |
| `Kaufbrater Images/` | Thumbnails the advisor references for cross-category recommendations. |
| `*.md` playbooks | Internal working docs — `ADVISOR-PLAYBOOK.md` is the canonical ruleset. Git-ignored, kept local. |

## Mobile / PLP preview

During development the advisor was previewed inside a snapshot of the real Türsprechanlagen
category page (the PLP prototype) for on-phone layout testing. That throwaway harness
(`sprechanlage-share/`, `sprechanlage-test.html`, `sprechanlage.js`) has been removed to keep
the repo lean — regenerate it from the PLP prototype repo if you need it again.

## Deploy

GitHub Pages serves the `master` branch root. Push to `master` → live in ~1 min at
<https://sabavafa.github.io/purchase-advisor/>.
