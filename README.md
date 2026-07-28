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

## Mobile layout test harness (NOT production)

To preview the advisor **inside the real Türsprechanlagen category page (PLP)** on a phone:

- **`sprechanlage-share/`** — a **self-contained** snapshot of the PLP with the advisor embedded
  and every asset vendored. Deployed to GitHub Pages at
  <https://sabavafa.github.io/purchase-advisor/sprechanlage-share/>. This is a throwaway test
  harness — regenerate it rather than hand-maintaining it.
- **`sprechanlage-test.html`** + **`sprechanlage.js`** — the same integration, but it references
  the PLP prototype and shared assets as **sibling folders** (`../PLP`, `../Home`) checked out
  next to this repo. Only renders in that local layout; **not portable** and broken on Pages.

> ⚠️ The advisor markup/CSS/JS currently lives in **three copies**: `index.html`,
> `sprechanlage-test.html`, and `sprechanlage-share/index.html`. `index.html` is the source of
> truth — apply advisor changes there and regenerate the two test copies.

## Deploy

GitHub Pages serves the `master` branch root. Push to `master` → live in ~1 min at
<https://sabavafa.github.io/purchase-advisor/>.
