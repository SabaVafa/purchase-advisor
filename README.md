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

- **`sprechanlage-share/`** — a **self-contained** snapshot of the real Türsprechanlagen category
  page (PLP) with the advisor embedded and every asset vendored. Deployed to GitHub Pages at
  <https://sabavafa.github.io/purchase-advisor/sprechanlage-share/> for on-phone layout testing.
  A throwaway harness — regenerate it rather than hand-maintaining it.

> The earlier local-only variants (`sprechanlage-test.html` + `sprechanlage.js`, which needed
> sibling `../PLP` and `../Home` folders) were removed as non-portable.

## Deploy

GitHub Pages serves the `master` branch root. Push to `master` → live in ~1 min at
<https://sabavafa.github.io/purchase-advisor/>.
