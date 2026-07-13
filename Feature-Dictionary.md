# Metzler Kaufberater — Shared Feature Dictionary
**Role:** single source of truth for feature definitions across ALL categories. Define each feature ONCE with a stable ID; reuse IDs across categories so cross-category logic and combos work.
**Seeded from:** Sprechanlagen pilot (2026-07-13). Extend per `Kaufberater-Playbook.md`.

## Schema (fields per feature)
| field | meaning |
|--|--|
| `id` | stable ID. `H-*` = horizontal (cross-category); `<CAT>-*` = category-specific (e.g. `SPR-*`). Never reuse/renumber. |
| `name_de` / `name_en` | customer/analyst labels |
| `scope` | `horizontal` or the owning category |
| `type` | `HARD` (compatibility/fit — filters which products qualify) or `PREF` (preference/trim) |
| `values` | enumerated options or "free" |
| `applies_to` | series/products the feature is valid for |
| `question_ref` | advisor question(s) that use it |
| `source_urls` | page(s) the value was mined from |
| `status` | `verified` or `needs_confirmation` (⚑) |
| `last_verified` | crawl date |
| `notes` | conflicts, gaps, cross-refs |

## Category register
| code | category | root | info/explainer hub | status |
|--|--|--|--|--|
| SPR | Türsprechanlagen | /tuersprechanlagen | **/sprechanlagen-info** (+ /faq/sprechanlagen, /begriffserklaerung) | ✅ done 2026-07-13 |
| BRK | Briefkästen | /briefkasten | **/briefkastenanlagen-konfigurator** (verify) | ⬜ next |
| PKB | Paketboxen | /paketboxen | (find hub) | ⬜ |
| TKL | Türklingeln / Funkklingeln | /tuerklingel | (find hub) | ⬜ |
| HNR | Hausnummern | /hausnummern-schilder-schriftzuege | (find hub) | ⬜ |
| BEL | Beleuchtung / Garten | /beleuchtung | (find hub) | ⬜ |

---

## PART 1 — HORIZONTAL features (reuse across every category)
These recurred in Sprechanlagen and will recur elsewhere. **Reuse these IDs; do not redefine per category.** Add category-specific `values`/`applies_to` as you extend (a value list can grow).

| id | name_de | name_en | type | values (seed) | question_ref | source (seed) | status |
|--|--|--|--|--|--|--|--|
| H-COLOR | Standardfarbe | Stock color | PREF | Schwarz, Edelstahl, Grau, Eisenglimmer, Anthrazit, Weiß, Braun (variiert je Produkt) | Aesthetics | Konfigurator je Produkt | verified |
| H-RAL | Wunschfarbe / RAL | Custom RAL color | PREF | free RAL; pulverbeschichtet (teils ohne Aufpreis) | Aesthetics | SDM10S "individuelle Wunschfarbe" | verified |
| H-MATERIAL | Material / Oberfläche | Material / finish | PREF | V2A/V4A Edelstahl; pulverbeschichtet / geschliffen / PVD; Glas | Aesthetics/quality | Colson "5mm V2A", "pulverbeschichtet, geschliffen oder PVD" | verified |
| H-MOUNT | Montageart | Mounting type | HARD/PREF | Aufputz, Unterputz, Standmontage, Wandmontage; WDVS-geeignet | Montage | Colson "Auf- wie unter dem Putz"; SDM10S Stele | verified |
| H-ENGRAVE | Gravur / Schriftart | Engraving / font | PREF | Schriftart wählbar; Wunschgravur; "Schriftart 7 inklusive" | Aesthetics | Kombi-Produkte "Schriftart 7 inklusive" | verified |
| H-NAMEPLATE | Austauschbares Namensschild | Exchangeable name plate | PREF | magnetisch / selbstklebend / RFID-Version / Papiereinleger; beleuchtet; digital | Aesthetics | Neo "Austauschbare Namensschilder"; /ersatz-namensschilder | verified |
| H-ILLUM | Beleuchtung (Taster/Schild/Hausnr.) | Illumination | PREF | Taster-LED 8 Farben; beleuchtetes Namensschild; beleuchtete Hausnummer | Aesthetics | Colson "LED-Farbe einstellen"; SDM10H Titel | verified |
| H-SCALE | Wohneinheiten / Anzahl | Units / count | HARD | 1 (EFH) / 2–7 (MFH) / flexibel 1–500 (Großobjekt); (BRK: Fächer; PKB: Boxen) | Units | Konfigurator "Anzahl Klingeltaster"; Horizon "1–500" | verified |
| H-DELIVERY | Lieferumfang | Scope of delivery | PREF | prose-only; PoE-Switch/Netzteil NICHT ausgewiesen | Set/Kombi | alle Produktseiten | ⚑ needs_confirmation |
| H-SET | Komplettset / Plug&Play | Preconfigured set | PREF | vorprogrammiert, beschriftet, passwortgeschützt | Set/Kombi | Neo-Set "nichts konfigurieren" | verified |
| H-COMBO | Kategorie-Kombi | Cross-category combo | PREF | Sprechanlage×Briefkasten×Paketbox (mehr folgen) | Kombi | Briefkasten/Paketbox-Kombiprodukte | verified |
| H-WARRANTY | Garantie | Warranty | PREF | 10 Jahre Metzler Garantie | trust | /metzler-garantieerklaerung | verified |

> **Extension note:** when a new category adds an option to a horizontal feature (e.g. Briefkästen add mounting value "Standbriefkasten mit Bodenverschraubung" to `H-MOUNT`), append the value here and record its source — don't create a duplicate ID.

---

## PART 2 — SPRECHANLAGEN-specific features (`SPR-*`)
Full prose/values live in `Sprechanlagen-Kaufberater.md` (Deliverable 1). This is the ID index + the HARD axes that drive the question flow. `last_verified` = 2026-07-13 for all.

### HARD axes (drive question order)
| id | name_de | values | applies_to | question_ref | source | status |
|--|--|--|--|--|--|--|
| SPR-SYS | System/Serie | IP-Serie (VDM10/SDM10/ADM10) · 2-Draht-BUS (XDM10) | all | Q1/Q1a | /sprechanlagen-info | verified |
| SPR-WIRE | Verkabelung | LAN/PoE · 2-Draht-IP (Stern) · 2-Draht-BUS (Bestand) | all | Q1a | /sprechanlagen-info | verified |
| SPR-RETRO | Nachrüstung | ja (BUS + 2-Draht-IP) / nein | XDM10, IP-2-Draht | Q1 | /sprechanlagen-info | verified |
| SPR-LEGACY | Legacy-Kompatibilität | Siedle/Gira/Ritto/Busch-Jaeger/TCS/Bticino/Grothe/Elcom/Comelit/STR/Balter/Goliath/Balcom/SKS (see Anhang) | XDM10 | Q1c | /sprechanlagen-info ONLY | ⚑ needs_confirmation |
| SPR-VID | Video vs Audio | Video (VDM10/SDM10/XDM10) · Audio (ADM10) | all | Q2 | ADM10 "Audio-only"; VDM10 Beschr. | verified |
| SPR-ISBIND | Innenstation-Serienbindung | Home/Pro/Ultra→IP · XDM10-IS→BUS · ADM10-IS→Audio | Innenst. | Q7 | XDM10-IS "nicht mit VDM10 kombinierbar" | verified |
| SPR-ISCONN | Innenstation-Anschluss | Home/ADM10: 2-Draht ODER LAN/PoE · Pro/Ultra: nur LAN/PoE · XDM10-IS: nur BUS | Innenst. | Q7 | Pro "nur LAN/PoE" | verified |

### PREF features (index — details in Deliverable 1)
| id | name_de | applies_to | question_ref | status |
|--|--|--|--|--|
| SPR-CAM-RES | Kameraauflösung (2MP IP / 3MP XDM10 / 88° SDM10) | Video | Q6 | verified |
| SPR-CAM-FOV | Blickwinkel (146° IP / 133° XDM10 / 88° SDM10) | Video | Q6 | verified |
| SPR-NIGHT | IR-Nachtsicht (10 m) | Video | Q6 | verified |
| SPR-WDR | WDR 120 dB / DNR / BLC | Video IP | Q6 | verified |
| SPR-RTSP | RTSP-Streams / NVR-Überwachung | VDM10/SDM10 | Q6 | verified |
| SPR-APP | App abofrei (Hik-Connect) | all | info | verified |
| SPR-SIP | SIP/FRITZ! (NICHT XDM10) | VDM10/SDM10/ADM10 | Q6 | verified |
| SPR-RFID | RFID | Niko/Horizon/SDM10/(ADM10?) | Q4 | ⚑ (ADM10 modellabh.) |
| SPR-PIN | PIN-Code | Horizon/SDM10 | Q4 | verified |
| SPR-QR | QR-Code | SDM10 | Q4 | verified |
| SPR-FINGER | Fingerprint (1000, <0,5 s) | Niko | Q4 | verified |
| SPR-FACE | Gesichtserkennung (200 ms, 20.000) | SDM10 | Q4 | verified |
| SPR-TAMPER | Manipulationsalarm >85 dB | IP | Q6 | verified |
| SPR-SECMOD | Sicherheitsmodul (RS-485, AES-128) | all (opt.) | Q6 | verified |
| SPR-STRIKE | Türöffner (2 IP / 1+Impuls XDM10) | all | Q6 | verified |
| SPR-IPIK | Schutzklasse (IP65; IK07/08/09/10 modellabh.) | all | Q6 | verified |
| SPR-PCMAC | PC/Mac als Innenstation | VDM10/SDM10/ADM10 | Q7 | verified |
| SPR-IS-SIZE | Innenstation-Display (7"/10", IPS/LCD) | Innenst. | Q7 | verified |
| SPR-MELODY | Melodien (6+4) / Nicht-stören | outdoor prose | Q7 | ⚑ (fehlt auf Innenst.-Seiten) |
| SPR-VERT | BUS-Verteiler/Trafo (VT1 ≤4 / VT4 >4) | XDM10 | Q7 | ⚑ (max IS 99 vs 4) |
| SPR-ADDR | Adressierung (DIP/Dreh) | XDM10 | Q1c | ⚑ (3 widersprüchl. Quellen) |
| SPR-DSGVO | DSGVO Gesichtserkennung | SDM10 | Q4 | ⚑ needs_confirmation |

### ⚑ Open confirmations for SPR (carry into any XDM10/SDM10 advisor)
1. XDM10 max Innenstationen (99 vs 4 vs 2-Kanal). 2. XDM10 Adressierung method. 3. XDM10 named legacy compat per system. 4. ADM10 RFID which model. 5. Lieferumfang PoE-switch/Netzteil. 6. DSGVO face-recognition notice. 7. 2-Draht-IP support per IP model.

---

## PART 3 — templates for next categories (empty, ready to fill)
Copy a block per category as you onboard it.

### BRK — Briefkästen (next)
- **Info hub:** verify `/briefkastenanlagen-konfigurator`.
- **Likely HARD axes:** `H-MOUNT` (Aufputz / Unterputz / Standbriefkasten), `H-SCALE` (Fächer/Parteien EFH vs MFH), integration `H-COMBO` (mit Klingel/Sprechanlage — links to `SPR-*`), Zeitungsfach yes/no, DIN-A4 Einwurf, Paketfach.
- **Likely PREF:** `H-COLOR`,`H-RAL`,`H-MATERIAL`,`H-ENGRAVE`,`H-NAMEPLATE`,`H-ILLUM`; Entnahmeschutz; Schließsystem.
- `BRK-*` IDs to assign during mining. Reuse all `H-*`. Cross-link combos to `SPR-VID`/`SPR-SYS`.

### PKB — Paketboxen
- Reuse `H-*`; cross-link to `SPR-*` for intercom-integrated boxes (`H-COMBO`).
- Candidate `PKB-*`: Volumen/Fassungsgröße, Entnahmeschutz, beleuchtet, freistehend vs wandmontiert.

### TKL — Türklingeln / Funkklingeln
- **Likely HARD axis:** kabelgebunden vs Funk; Reichweite (Funk); Empfänger-Anzahl.
- Reuse `H-COLOR/RAL/MATERIAL/MOUNT/NAMEPLATE/ILLUM/SCALE`.

### HNR — Hausnummern · BEL — Beleuchtung/Garten
- Mostly PREF/aesthetic. Reuse `H-*`; minimal new HARD axes (BEL: Netz vs Solar vs Akku; Trafo/System like Plug&Shine).
