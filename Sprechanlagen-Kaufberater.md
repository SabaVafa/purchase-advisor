# Metzler Sprechanlagen — Kaufberater Datengrundlage
**Kategorie:** Türsprechanlagen (edelstahl-tuerklingel.de/tuersprechanlagen)
**Methode:** Feature-Mining aus Produkt-BESCHREIBUNG + KONFIGURATOR + Kategorie-/Info-Copy (`/sprechanlagen-info`). Merkmale-Tabellen & Facetten nur als Sekundär-Cross-Check. Jede Aussage mit Quelle.
**Datenstand:** 2026-07-13.

> **Grunddaten-Warnung (bestätigt):** Lieferumfang steht auf ALLEN Seiten nur im Fließtext (nie als strukturierte Liste); PoE-Switch/Netzteil werden nie ausgewiesen. Mehrere Kennzahlen widersprechen sich zwischen Produktseite, Innenstationsseite und Info-Seite (v. a. XDM10 max. Innenstationen, Adressierungsmethode). Diese sind unten als **⚑ Metzler-Klärung** markiert.

---

## Produkt-Landkarte (Serien)

| Serie | Verkabelung | Typ | Modelle | Preis ab |
|---|---|---|---|---|
| **VDM10 2.0** (IP-Serie) | IP: LAN/PoE **oder** 2-Draht-IP | Video 2MP/146° | Colson, Kian, Neo, Niko, Horizon | 649 € |
| **SDM10** (IP-Serie) | IP: LAN/PoE **oder** 2-Draht-IP | Video 2MP + Gesichtserkennung | SDM10X, SDM10H, SDM10S | 1.490 € |
| **ADM10** (IP-Serie) | IP: LAN/PoE **oder** 2-Draht-IP | **Audio-only** (keine Kamera) | Dominik, Kai | 499 € |
| **XDM10** (2-Draht-BUS-Serie) | 2-Draht-BUS (Bestandsleitung) | Video 3MP/133° | Maxior | 899 € |
| **Innenstationen** | je nach Serie | Home 7" / Pro 7" IPS / Ultra 10" / XDM10 7" / ADM10 7" | | 149 € |

---

# DELIVERABLE 1 — UNION FEATURE INVENTORY

Typ-Legende: **HARD** = harte Kompatibilitäts-/Eignungs-Bedingung (bestimmt, welche Serie überhaupt passt). **PREF** = Präferenz/Ausstattung (Auswahl innerhalb passender Produkte).

## A. System & Verkabelung  *(die entscheidende HARD-Achse)*
| # | DE Feature | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|A1|System / Serie|System family|IP-Serie (VDM10/SDM10/ADM10) · 2-Draht-BUS-Serie (XDM10)|alle|HARD|/sprechanlagen-info; Konfigurator "System"|
|A2|IP-Verkabelung LAN/PoE|LAN/PoE network wiring|CAT 5e–CAT 8 + PoE (IEEE 802.3af); Strom über Datenkabel|VDM10, SDM10, ADM10, Innenst. Home/Pro/Ultra|HARD|/sprechanlagen-info; Innenstation-Seiten|
|A3|IP-Verkabelung 2-Draht-IP|2-wire IP|geschirmte Fernmeldekabel (z. B. J-Y(ST)Y) + 24 V Trafo; **Sternverkabelung erforderlich**|VDM10, SDM10, ADM10 (Variante), Home/ADM10-Innenst.|HARD|/sprechanlagen-info; Home-Innenstation|
|A4|2-Draht-BUS|2-wire BUS|vorhandene Klingel-/2-Draht-Leitung; Daisy-Chain; Strom+Daten über 2 Adern|XDM10|HARD|/sprechanlagen-info; XDM10 Maxior|
|A5|2-Draht-Ethernet-PoE-Konverter|2-wire-over-Ethernet converter|Konverter + Netzteil 52 V/1 A (falls kein PoE-Switch)|IP-Serie|HARD|/metzler-netzteil-52v-1a-passend-zum-2-draht-ethernet-poe-konverter|
|A6|Verteiler + Trafo (BUS)|BUS distributor+transformer|4 Anschlüsse (162 €) / 8-Kanal 48 V (368 €); CH1-2 Innenst. (15 W), CH3-6 Türst. (110 W); RJ45-Uplink (nur 8er)|XDM10|HARD|/…verteiler-transformator-8/-4-anschluesse|
|A7|Nachrüstung/Modernisierung|Retrofit capability|"ohne Neuverkabelung", "keine Stemmarbeiten"|XDM10 (BUS) & IP-2-Draht-IP|HARD|/sprechanlagen-info|
|A8|Legacy-System-Kompatibilität|Legacy intercom compat|Siedle, Gira, Busch-Jaeger, Ritto, Grothe, Elcom/Hager, TCS, Bticino, SKS-Kinkel, Comelit, STR, Balter, Goliath, Balcom (Modell-Listen siehe Anhang)|XDM10 (2-Draht)|HARD ⚑|/sprechanlagen-info (nur dort, NICHT auf Produktseite)|
|A9|Topologie|Topology|Stern (IP) · Baum/Daisy-Chain (BUS)|je Serie|HARD|/sprechanlagen-info|
|A10|Adressierung|Addressing|IP: digital/IP-Adressen · BUS: DIP-Schalter/Drehregler ⚑|je Serie|PREF ⚑|/sprechanlagen-info; XDM10-Seiten (widersprüchlich)|

## B. Kamera & Video
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|B1|Video vorhanden|Video/camera|ja / nein|Video: VDM10/SDM10/XDM10 · **nein: ADM10**|HARD|ADM10 "Audio-only"; VDM10 Beschr.|
|B2|Kameraauflösung|Camera resolution|2 MP FullHD 1080p (IP) · **3 MP** (XDM10)|VDM10/SDM10=2MP; XDM10=3MP|PREF|VDM10 Colson; XDM10 Maxior|
|B3|Blickwinkel|Field of view|146° H / 82° V (IP) · **133° H / 82° V** (XDM10) · 88° (SDM10 Dual-Lens)|je Modell|PREF|Colson "146° Horizontal & 82° Vertikal"; XDM10 "133°/82°"; SDM10 "88°"|
|B4|Nachtsicht (IR)|Night vision|IR-LEDs bis 10 m, Lichtsensor auto Tag/Nacht|alle Video|PREF|Colson "Objekte bis zu 10m … bei vollständiger Dunkelheit"|
|B5|WDR|Wide Dynamic Range|120 dB|alle Video|PREF|"Helligkeitskontrast von 120 dB"|
|B6|DNR / BLC / Anti-Flicker|noise/backlight comp|ja|alle Video (IP); XDM10 WDR|PREF|Colson/Kian Merkmale|
|B7|RTSP-Streams / NVR|surveillance streams|2 RTSP (1080p+720p); als Überwachungskamera per NVR nutzbar|VDM10/SDM10 (IP)|PREF|Colson "2 RTSP-Streams … per NVR als Überwachungskamera"|
|B8|Privacy-Masking|Privacy by Design|Sichtfeld-Bereiche einschränkbar|VDM10 2.0|PREF|Colson "Privacy by Design"|
|B9|Anti-Spoofing (Gesicht)|anti-spoofing|duale Kamera + NIR, unterscheidet Foto/Video|SDM10|PREF|SDM10 "Anti-Spoofing-Funktion"|

## C. Audio
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|C1|Gegensprechen|two-way audio|Full-Duplex 2-Wege, omnidirektionales Mikrofon, Echo-/Geräuschunterdrückung|alle|PREF|Colson/ADM10 Merkmale|
|C2|Sprachnachrichten|voice messages|optional|VDM10, ADM10|PREF|ADM10 "optionales Hinterlassen von Sprachnachrichten"|
|C3|Melodien|ringtones|6 vorinstalliert + 4 eigene|Außenstationen-Prosa (VDM10/ADM10)|PREF ⚑|Colson "6 … um 4 eigene erweiterbar" (fehlt auf Innenstationsseiten)|
|C4|Nicht-stören-Modus|do-not-disturb|ja|Innenstation (VDM10/ADM10 Prosa)|PREF ⚑|Colson "Nicht-stören-Modus" (fehlt auf Innenstationsseiten)|

## D. Zutritt & Sicherheit
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|D1|RFID|RFID keyless|Mifare-Karte/Schlüsselanhänger, Master-Karten-Anlernung ohne PC, deaktivierbar|Niko, Horizon, SDM10, (ADM10 modellabh. ⚑)|PREF|/metzler-intercom-rfid-karte; SDM10 "100.000 RFID-Karten"|
|D2|PIN-Code|PIN|Türöffnung per PIN, je Türöffner/Wohnung separat|Horizon, SDM10|PREF|Horizon "separate PIN-Codes für jeden Türöffner"; SDM10 config|
|D3|QR-Code|QR|Zutritt per QR|SDM10 (config)|PREF|SDM10 Konfigurator "QR-Code"|
|D4|Fingerprint|fingerprint|1000 Abdrücke, Erkennung < 0,5 s|Niko; opt. Paketbox/Briefkasten-Kombi|PREF|Niko "1000 Fingerabdrücke … <0,5 Sekunden"|
|D5|Gesichtserkennung|face recognition|entsperrt in 200 ms, bis 20.000 Scans, Anti-Spoofing|SDM10 (X/H/S), Standbriefkasten-Set|PREF|SDM10 "in … 200 Millisekunden entsperrt"|
|D6|Manipulationsalarm|tamper alarm|> 85 dB, bei Montage deaktivierbar|alle IP (VDM10/SDM10/ADM10)|PREF|Colson ">85dB"|
|D7|Sicherheitsmodul|secure door release|RS-485, AES-128, Türöffner physisch getrennt, Hutschiene|alle (optional)|PREF|/metzler-sicherheitsmodul-mit-hutschienenhalter|
|D8|Türöffner-Anzahl|door openers|IP: 2 Anschlüsse · XDM10: 1 Relais + 1 DC-Impuls|je Serie|PREF|Colson "zwei Anschlüsse"; XDM10 "1 Relaisausgang … 1 DC-Impulsausgang"|
|D9|Türöffnungswege|door-open channels|Innenstation, App, (RFID/PIN/Gesicht/Fingerprint modellabh.)|alle|PREF|Colson; SDM10S "5 Türöffnungsmethoden"|
|D10|Zeitplan-Zutritt|scheduled access|Türöffnung nach Zeitplan|SDM10, XDM10-Innenst.|PREF|SDM10 "nach festgelegten Zeitplänen"|
|D11|Schutzklasse Gehäuse|IP/IK rating|IP65 durchgängig; IK09 (VDM10/SDM10/ADM10) · IK08 (Horizon-Display) · IK10 (XDM10) · IK07 (SDM10-Display)|alle|PREF|Colson "IP65 + IK09"; XDM10 "IP65, IK10"; SDM10 "IK07"; Horizon "IK08"|
|D12|Zutritts-Kapazität|credential capacity|10.000 Karten/2.000 Nutzer (VDM10) · 100.000 RFID/20.000 Gesichter (SDM10)|je Serie|PREF|Kian Tabelle; SDM10 Beschr.|

## E. App, Netzwerk & Integration
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|E1|Smartphone-App|mobile app|kostenlos & **abofrei**, Android/iOS; Live-Video 2-Wege, Push, Auto-Snapshot, Türöffnen (App = Hik-Connect)|alle|PREF|Colson "dauerhaft kostenlos und abofrei"; /sprechanlagen-info "Hik-Connect (kostenlos)"|
|E2|SIP / PBX / FRITZ!|SIP/FRITZ! integration|integr. SIP-Modul; FRITZ!Box & FRITZ!Fon als Gegenstelle+Türöffner|VDM10, SDM10, ADM10 (**NICHT XDM10**)|PREF/HARD*|Colson "integriertes SIP-Modul"; XDM10: keine Erwähnung|
|E3|PC/Mac als Innenstation|PC/Mac client|zeitplangesteuert annehmen + Türöffnen|VDM10, SDM10, ADM10|PREF|Colson "PC + Mac als Innenstation"|
|E4|IP-Kameras einbindbar|IP camera integration|weitere IP-Kameras / ONVIF; ADM10-Kai: HiLook/Hikvision-PoE-Kamera als Klingelruf-Kamera|IP-Serie; Home-Innenst. ONVIF|PREF|Colson "Weitere IP-Kameras anschließbar"; Kai UI-3.0|
|E5|Netzwerk-Uplink (BUS)|LAN uplink for BUS|RJ45 am 8-Kanal-Verteiler → App + PC-Config|XDM10|PREF|Verteiler-8 "RJ45-Schnittstelle … Netzwerkverbindung per LAN"|
|E6|Easy UI 2.0 / Ersteinrichtung|setup without PC|Einrichtung über Innenstation ohne PC (IP) · Config per PC-Software (Pro/Ultra/XDM10)|je Modell|PREF|Colson "Easy UI 2.0 – Einrichtung ohne PC"|

*E2 wird HARD, wenn Kunde FRITZ!-Integration zwingend will → XDM10 scheidet aus.

## F. Innenstationen (Endgeräte)
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|F1|Display-Größe|screen size|7" (Home/Pro/XDM10/ADM10) · 10,1" (Ultra)|Innenst.|PREF|Innenstations-Tabelle|
|F2|Panel-Typ|panel|TFT-LCD (Home) · IPS (Pro) · LCD (Ultra) · TFT-LCD (XDM10)|Innenst.|PREF|Pro "IPS-Display"; Home "TFT-LCD"|
|F3|Anschluss-Variante|connection variant|Home/ADM10: 2-Draht **oder** LAN/PoE · Pro/Ultra: **nur** LAN/PoE · XDM10-IS: **nur** 2-Draht-BUS|Innenst.|HARD|Pro "nur LAN/PoE"; XDM10-IS "geschlossenes System"|
|F4|WLAN/WiFi|WiFi|Home 802.11 b/g/n; XDM10-IS 2,4 GHz für App; Innenst. kabellos koppelbar|je Modell|PREF|Home; XDM10-IS "WLAN 2,4 GHz für Hik-Connect"|
|F5|Kopplungskapazität|coupling capacity|Home: 10 Innenst./17 Türst./16 Cams · XDM10-IS: 4/Gebäude +3 Erw. ⚑|je Modell|PREF ⚑|Home; XDM10-IS (Widerspruch zu XDM10-Außenseite "99")|
|F6|Serien-Zugehörigkeit|system binding|Home/Pro/Ultra → VDM10/SDM10 IP · XDM10-IS → nur XDM10 · ADM10-IS → nur ADM10|Innenst.|HARD|XDM10-IS "nicht mit VDM10 kombinierbar"|
|F7|Netzteil im Lieferumfang|PSU included|Pro: **nein** · andere: ⚑|Innenst.|PREF ⚑|Pro "kein Steckernetzteil enthalten"|
|F8|Tischhalterung|desk stand|optional (Home, Pro)|Innenst.|PREF|/metzler-tischhalterung-…|

## G. Physis, Material & Ästhetik
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|G1|Frontmaterial|front material|massiver Edelstahl (VDM10 5 mm V2A; SDM10 2 mm) · Glas+Edelstahl (XDM10)|je Serie|PREF|Colson "5mm … V2A Edelstahl"; XDM10 "Glas + Edelstahl"|
|G2|Oberfläche|finish|pulverbeschichtet / geschliffen / PVD|VDM10, ADM10-Dominik|PREF|Colson "pulverbeschichtet, geschliffen oder PVD"|
|G3|Farbe (Standard)|stock colors|Schwarz, Edelstahl, Grau, Eisenglimmer, Anthrazit, Weiß (Kian +Braun)|je Modell (Liste variiert!)|PREF|Konfigurator je Produkt|
|G4|Wunschfarbe/RAL|custom RAL|frei wählbar, pulverbeschichtet (SDM10S ohne Aufpreis)|fast alle (27 Produkte lt. Facette)|PREF|SDM10S "in Ihrer individuellen Wunschfarbe"|
|G5|Klingeltaster beleuchtet / LED-Farbe|illuminated button / LED color|8 Farben (Weiß/Grün/Rot/Blau/Hellblau/Lila/Gelb/Aus); V4A Taster|VDM10 (Niko explizit)|PREF|Colson "LED-Farbe … einstellen"|
|G6|Austauschbares Namensschild|exchangeable name plate|magnetisch / selbstklebend / RFID-Version; beleuchtet|Neo, Kai, XDM10 Maxior, Horizon (digital)|PREF|Neo "Austauschbare Namensschilder"; /ersatz-namensschilder|
|G7|Gravur/Personalisierung|engraving|Schriftart wählbar, Wunschgravur|SDM10S, Briefkasten/Paketbox-Kombis|PREF|Kombi "Schriftart 7 inklusive"|
|G8|Beleuchtete Hausnummer|illuminated house number|ja|**SDM10H** (Alleinstellung)|PREF ⚑|Titel SDM10H (Prosa fehlt → Lücke)|
|G9|Montageart|mounting|Aufputz & Unterputz (Universal-Kasten V2A, WDVS-Dichtung); XDM10 AP +29,99 €|alle|PREF|Colson "Auf- wie auch unter dem Putz"|
|G10|Bauform|form factor|Wandplatte flach · modular 4" (Horizon) · freistehende Stele 1,60 m (SDM10S)|je Modell|PREF|SDM10S "freistehende Stele"|

## H. Skalierung / Wohneinheiten
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|H1|Anzahl Klingeltaster|call buttons|1–7 physisch; "Flexibel von 1–500" (Horizon/SDM10 digital)|je Modell|HARD/PREF|Konfigurator; Horizon "1–500 Parteien"|
|H2|Ein-/Mehrfamilien|single/multi-family|EFH (1 Taster) · MFH (2–7) · Großobjekt (Horizon/SDM10 1–500)|je Modell|HARD|Produkt-Titel; Horizon Beschr.|
|H3|Max. Innenstationen|max indoor monitors|VDM10 "bis 500" (Außenseite) vs. Home 10 vs. XDM10 4/99 ⚑|je Serie|PREF ⚑|Kian; Home; XDM10 (widersprüchlich)|
|H4|Digitale Klingelschilder|digital name labels|pro Partei über Innenstation änderbar (Mieterwechsel)|Horizon|PREF|Horizon "minimiert … bei Mieterwechsel"|
|H5|Display-Layouts (MFH)|multi-party layouts|virtueller Taster / 4 / 5–8 / Kontaktliste >8|Horizon|PREF|Horizon Beschr.|

## I. Strom
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|I1|Stromversorgung Außenstation|outdoor power|12 VDC/PoE (802.3af) · 24 VDC 2-Draht (<16 W) · XDM10: 48 V via Verteiler / 12 VDC|je Serie|PREF|Kian Tabelle; XDM10 Tabelle|
|I2|Integrierte Türöffner-Versorgung|integrated strike power|12 VDC max 500 mA (nur PoE), ohne Zusatztrafo|VDM10/SDM10|PREF|Colson "ohne zusätzlichen Transformator"|

## J. Set / Kombi / Lieferumfang
| # | DE | EN | Werte | Gilt für | Typ | Quelle |
|--|--|--|--|--|--|--|
|J1|Komplettset Plug&Play|preconfigured set|vorprogrammiert, beschriftet, passwortgeschützt|Neo-Set, XDM10-Set|PREF|Neo-Set "nichts konfigurieren – nur installieren"|
|J2|Briefkasten-Kombi|letterbox combo|Wandmontage (VDM10) · Standbriefkasten EFH/ZFH (SDM10/VDM10); Zeitungsfach, Lichttaster (opt.)|Briefkasten-Produkte|PREF|/metzler-briefkasten-mit-vdm10-…|
|J3|Paketbox-Kombi|parcel box combo|Entnahmeschutz, DIN-A4-Einwurf, opt. Fingerprint+RFID|Paketbox-Produkt|PREF|/…-paketbox-…|
|J4|Innenstations-Wahl im Set|indoor choice in set|Home/Pro/Ultra im Konfigurator|XDM10-Set, Briefkasten/Paketbox|PREF|Kombi-Konfiguratoren|
|J5|Lieferumfang-Detail|scope of delivery|nur Prosa; PoE-Switch/Netzteil nicht ausgewiesen|alle|— ⚑|alle Produktseiten|

---

# DELIVERABLE 2 — PER-PRODUCT GAP MATRIX

**Legende:** ✓ = im eigenen Produkttext gefunden · ~ = wahrscheinlich (nicht genannt, aber bei Serien-Geschwistern vorhanden → Metzler sollte ergänzen) · N/A = trifft auf dieses Modell/Serie nicht zu.

## Außenstationen

| Feature | Colson | Kian | Neo | Niko | Horizon | SDM10X | SDM10H | SDM10S | ADM10 Dominik | ADM10 Kai | XDM10 Maxior |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| IP LAN/PoE (A2) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A |
| IP 2-Draht-IP (A3) | ✓ | ✓ | ~ | ~ | ~ | ~ | ~ | ✓ | ✓ | ✓ | N/A |
| 2-Draht-BUS (A4) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ |
| Video-Kamera (B1) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | N/A | ✓ |
| Blickwinkel genannt (B3) | ✓146 | ✓146 | ✓146 | ✓146 | ✓146 | ✓88 | ~88 | ✓88 | N/A | N/A | ✓133 |
| IR-Nachtsicht (B4) | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | ~ | ✓ | N/A | N/A | ✓ |
| WDR 120 dB (B5) | ✓ | ✓ | ~ | ~ | ~ | ✓ | ~ | ✓ | N/A | N/A | ✓ |
| RTSP/NVR (B7) | ✓ | ✓ | ~ | ~ | ~ | ~ | ~ | ~ | N/A | N/A | ~ |
| Manipulationsalarm >85 dB (D6) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | ~ |
| App abofrei (E1) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SIP/FRITZ! (E2) | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A |
| RFID (D1) | N/A | N/A | N/A | ✓ | ✓ | ✓ | ✓ | ✓ | ~⚑ | ~⚑ | ~ |
| PIN (D2) | N/A | N/A | N/A | N/A | ✓ | ✓ | ✓ | ✓ | N/A | N/A | N/A |
| QR (D3) | N/A | N/A | N/A | N/A | ~ | ✓ | ✓ | ✓ | N/A | N/A | N/A |
| Fingerprint (D4) | N/A | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| Gesichtserkennung (D5) | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ | ✓ | N/A | N/A | N/A |
| Sicherheitsmodul-fähig (D7) | ✓ | ~ | ✓ | ~ | ~ | ✓ | ~ | ~ | ✓ | ~ | ✓ |
| 2 Türöffner (D8) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | N/A(1+Impuls) |
| Austauschb. Namensschild (G6) | N/A | N/A | ✓ | N/A | ✓digital | N/A | N/A | N/A | N/A | ✓ | ✓ |
| Beleuchteter Taster/LED (G5) | ~ | ~ | ✓ | ✓ | N/A | N/A | N/A | ~ | ~ | ~ | ~ |
| Wunschfarbe/RAL (G4) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A(fix) | ✓ | ✓ |
| Aufputz+Unterputz (G9) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | N/A(Stele) | ✓ | ✓ | ✓ |
| MFH-Skalierung >2 (H2) | ✓(2-7) | ✓(2-3) | ✓(2-6) | ✓(2-3) | ✓(1-500) | ✓(1-500) | ✓(1-500) | ✓(1-500) | ✓(2-6) | ✓(2-6) | ✓(2-3) |
| Legacy-Kompat. genannt (A8) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ~⚑ |

## Innenstationen

| Feature | Home 7" | Pro 7" IPS | Ultra 10" | XDM10 7" | ADM10 7" |
|---|:--:|:--:|:--:|:--:|:--:|
| 2-Draht **oder** LAN/PoE (F3) | ✓ | N/A(nur LAN/PoE) | N/A(nur LAN/PoE) | N/A(nur BUS) | ✓ |
| WLAN (F4) | ✓ | ~ | ~ | ✓ | ~ |
| Kopplungskapazität genannt (F5) | ✓10 | ~ | ~ | ✓4⚑ | ~ |
| Panel-Typ genannt (F2) | ✓LCD | ✓IPS | ~LCD | ✓LCD | ~ |
| Melodien-Anzahl (C3) | ~ | ~ | ~ | ~ | ~ |
| Nicht-stören-Modus (C4) | ~ | ~ | ~ | ✓ | ~ |
| ONVIF-Kameras (E4) | ✓ | ~ | ~ | N/A | ~ |
| Netzteil enthalten (F7) | ~ | ✓nein | ~ | ~ | ~ |
| Serien-Bindung klar (F6) | ✓ | ~ | ~ | ✓ | ✓ |

## Punch-Listen "Merkmale to add" (aus allen ~-Zellen)

**VDM10 – Kian:** Sicherheitsmodul-Kompatibilität, beleuchteter Taster/LED-Farbe explizit nennen (nur bei Niko/Neo ausgeschrieben).
**VDM10 – Neo:** IR-Nachtsicht, WDR, RTSP/NVR, SIP/FRITZ!, beleuchteter Taster als eigene Abschnitte ergänzen (Prosa lässt sie weg, Tabelle bestätigt sie).
**VDM10 – Niko:** WDR, RTSP/NVR, Sicherheitsmodul explizit; QR-Code-Option prüfen.
**VDM10 – Horizon:** IR-Nachtsicht/WDR/RTSP im Fließtext bestätigen; QR-Code-Zutritt klären; Sicherheitsmodul.
**SDM10X:** IP-2-Draht-IP-Option, RTSP/NVR explizit.
**SDM10H:** ⚑ **beleuchtete Hausnummer** wird nur im Titel genannt – im Beschreibungstext komplett ungenannt (Alleinstellungsmerkmal!). Außerdem Blickwinkel, IR, WDR, Manipulationsalarm, 2. Türöffner, Aufputz/Unterputz aus X übernehmen.
**SDM10S:** RTSP/NVR, beleuchteter Taster.
**ADM10 (Dominik & Kai):** ⚑ RFID "modellabhängig" – konkret angeben, welche ADM10 RFID kann; beleuchteter Taster; (Kai) Sicherheitsmodul.
**XDM10 Maxior:** ⚑ named Legacy-Kompatibilität (Siedle/Ritto/Gira/TCS…) auf die Produktseite spiegeln (steht nur auf /sprechanlagen-info); RTSP; Manipulationsalarm; max. Innenstationen widerspruchsfrei angeben (99 vs 4).
**Innenstationen (alle):** Melodien-Anzahl & Nicht-stören-Modus ergänzen; WLAN-Fähigkeit je Modell; (Pro/Ultra) Kopplungskapazität & Panel-Typ; ONVIF-Support je Modell; Netzteil-Lieferumfang je Modell klar ausweisen.
**Alle Produkte:** strukturierter **Lieferumfang** mit PoE-Switch/Netzteil/Kabel (aktuell nur Prosa).

---

# DELIVERABLE 3 — ADVISOR QUESTION FLOW (Kaufberater)

Reihenfolge nach Filter-Wirkung: **1) Kompatibilität/Verkabelung → 2) Audio/Video → 3) Wohneinheiten → 4) Zutritt → 5) Montage → 6) Integration/Funktionen → 7) Innenstation → 8) Ästhetik → 9) Kombi/Set.**

### F1 — Bauvorhaben & Verkabelung  *(HARD, bestimmt die Serie)*
**DE:** „Handelt es sich um einen Neubau/eine Sanierung mit neuer Verkabelung – oder möchten Sie eine bestehende Anlage im Altbau nachrüsten?"
**EN:** New build / full rewire vs. retrofit in existing building?
- **Neubau/Sanierung, neue Kabel** → CAT-Netzwerk möglich → **IP-Serie (LAN/PoE)** → weiter F1b
- **Altbau, vorhandene Klingel-/2-Draht-Leitung** → weiter F1a
- **Weiß nicht** → ⚑ *needs Metzler confirmation*: Techniker-Rückfrage / Online-Support-Termin.
*Filtert A1–A4. Bei „Neubau" werden F1a-BUS-Zweige irrelevant.*

### F1a — Vorhandene Leitung (nur bei Nachrüstung)  *(HARD)*
**DE:** „Welche Leitung liegt bereits? (a) alte Gegensprech-/Klingelanlage mit 2 Adern, (b) geschirmtes Fernmeldekabel sternförmig zum Verteiler, (c) Netzwerkkabel (CAT)."
**EN:** What cabling exists?
- **(a) 2-Draht-Klingelleitung / alte Gegensprechanlage** → **2-Draht-BUS-Serie (XDM10 Maxior)** → weiter F1c
- **(b) geschirmtes Fernmeldekabel, Stern** → **IP-Serie (2-Draht-IP)** + 24 V-Trafo → weiter F2
- **(c) CAT-Netzwerk** → **IP-Serie (LAN/PoE)** → weiter F2
*Quelle: /sprechanlagen-info. Entscheidet IP vs. BUS. Wählt Verteiler (A6) bzw. PoE-Konverter (A5).*

### F1b — Netzwerk-Integration gewünscht? *(PREF, verfeinert IP-Variante)*
**DE:** „Soll die Anlage ins Heimnetz (SIP-Telefonie, IP-Kameras, Videorekorder, FRITZ!Box) eingebunden werden?"
- **Ja** → IP LAN/PoE bevorzugen (volle Integration). → F2
- **Nein, nur Türkommunikation** → beide IP-Varianten ok. → F2

### F1c — Altes System identifizieren *(HARD ⚑ needs Metzler confirmation)*
**DE:** „Von welchem Hersteller ist Ihre alte Anlage? (Siedle, Gira, Ritto, Busch-Jaeger, TCS, Bticino, Grothe, Elcom, Comelit, …)"
**EN:** Which legacy system?
- Auswahl aus der Liste in Anhang → „XDM10 ist kompatibel/geeignet zur Umrüstung".
- ⚑ *Die konkrete Modell-Kompatibilität steht nur auf /sprechanlagen-info, nicht auf der XDM10-Produktseite → vor verbindlicher Zusage durch Metzler bestätigen lassen.*

### F2 — Video oder Audio?  *(HARD)*
**DE:** „Möchten Sie sehen, wer klingelt (Video) – oder reicht Ihnen Sprechen/Hören (Audio)?"
- **Video** → VDM10/SDM10 (IP) bzw. XDM10 (BUS). *ADM10 entfällt.*
- **Audio genügt** → **ADM10** (nur IP-Verkabelung; kein BUS-Audio-Modell im Sortiment). *Alle Video-/Kamera-Fragen (B, D3–D5) werden irrelevant.*

### F3 — Wohneinheiten / Klingeltaster  *(HARD)*
**DE:** „Für wie viele Parteien/Klingelknöpfe? (1 = Einfamilien, 2–7 = Mehrfamilien, >7 = Großobjekt)."
- **1** → EFH-Modelle (Colson/Kian/Neo/Niko 1 Taster; ADM10 1 Taster; XDM10 1 Taster)
- **2–7** → Mehrfamilien-Varianten (Taster-Anzahl im Konfigurator)
- **>7 bzw. flexibel/wachsend** → **Horizon** oder **SDM10** („Flexibel von 1–500", digitale Klingelschilder). *XDM10 max. Parteien ⚑ (99 vs 4 unklar → Metzler).*
*Filtert H1/H2; Kombination mit F2 (BUS nur bis 3 Taster physisch verfügbar).*

### F4 — Zutritt / Türöffnung  *(PREF, wählt Modell in der Serie)*
**DE:** „Wie möchten Sie schlüssellos öffnen? (Mehrfachauswahl): nur App · RFID-Karte/-Chip · PIN-Code · Fingerabdruck · Gesichtserkennung."
- **nur App** → jedes Modell.
- **RFID** → Niko/Horizon/SDM10 (IP); ⚑ ADM10 „modellabhängig".
- **PIN** → Horizon oder SDM10.
- **Fingerprint** → **Niko** (oder Briefkasten/Paketbox-Kombi optional).
- **Gesichtserkennung** → **SDM10 (X/H/S)**.
*Erklärt harte Modellwahl. Bei „nur App" werden D1–D5 irrelevant. Bei Gesichtserkennung ⚑ DSGVO-Hinweis (Datenschutz) – von Metzler bestätigen lassen.*

### F5 — Montageart  *(PREF)*
**DE:** „Aufputz (auf die Wand) oder Unterputz (bündig eingelassen)? Wärmedämmung (WDVS) vorhanden?"
- Aufputz / Unterputz → Universal-Montagekasten deckt beides ab; WDVS-Dichtung integriert. (XDM10 Aufputz +29,99 €.)
- **Stele gewünscht (kein Wandmontageort)** → **SDM10S** (freistehende Säule 1,60 m).
*Quelle: Colson „Auf- wie auch unter dem Putz"; SDM10S.*

### F6 — Integration & Funktionen  *(PREF)*
**DE:** „Welche Funktionen sind Ihnen wichtig? (Mehrfachauswahl): FRITZ!Box/SIP-Telefon als Gegenstelle · Nachtsicht · Manipulationsalarm · sicherer Türöffner (Sicherheitsmodul) · Nutzung als Überwachungskamera (NVR)."
- **FRITZ!/SIP** → nur IP-Serie (VDM10/SDM10/ADM10). ⚑ *XDM10 (BUS) unterstützt KEIN SIP/FRITZ! → falls zwingend, IP wählen.*
- **NVR/Überwachung** → VDM10/SDM10 (RTSP-Streams).
- **Sicherheitsmodul** → optionales Add-on (alle Serien).
*Nachtsicht/Alarm sind bei allen Video-IP-Modellen Standard → informativ, nicht filternd.*

### F7 — Innenstation(en)  *(PREF)*
**DE:** „Wie viele Innenstationen und welche Ausstattung? Home (7" Einstieg), Pro (7" IPS, Aluminium, LAN/PoE), Ultra (10")."
- Anzahl abfragen. ⚑ *Max. koppelbare Innenstationen je nach Serie klären (Home 10; XDM10 4/99 unklar).*
- **Pro/Ultra** nur bei LAN/PoE-Verkabelung möglich (nicht 2-Draht). Bei BUS → XDM10-Innenstation. Bei Audio → ADM10-Innenstation.
- **WLAN-Anbindung gewünscht?** → Home/XDM10-IS (WLAN); Innenstationen kabellos koppelbar.
- Hinweis: bei Pro ist **kein Netzteil** enthalten.
*Filtert F1–F7 (Serien-Bindung F6-Tabelle).*

### F8 — Ästhetik / Personalisierung  *(PREF)*
**DE:** „Farbe? (Standardfarben oder Wunschfarbe nach RAL) · austauschbares Namensschild (bei Mieterwechsel)? · beleuchteter Klingeltaster / LED-Farbe? · Gravur?"
- Farbe/RAL → G3/G4 (Farbliste variiert je Modell – z. B. Braun nur bei Kian; Neo ohne Weiß/Braun).
- Austauschbares Namensschild → Neo / Kai / XDM10 / Horizon(digital).
- Beleuchteter Taster/LED-Farbe → VDM10 (Niko explizit 8 Farben).
- Gravur/Schriftart → SDM10S & Kombi-Produkte.

### F9 — Briefkasten-/Paketbox-Kombi & Komplettset  *(PREF)*
**DE:** „Möchten Sie die Sprechanlage mit Briefkasten oder Paketbox kombinieren? Und lieber ein vorkonfiguriertes Plug-&-Play-Komplettset?"
- **Briefkasten** → Wandmontage (VDM10, mit Zeitungsfach, opt. Lichttaster) oder Standbriefkasten EFH/ZFH (SDM10/VDM10).
- **Paketbox** → VDM10-Paketbox (DIN-A4-Einwurf, Entnahmeschutz, opt. Fingerprint+RFID).
- **Komplettset** → Neo-Set (IP, vorprogrammiert) / XDM10-Set (BUS, Innenstation im Konfigurator wählbar).
- ⚑ *Exakter Lieferumfang (PoE-Switch/Netzteil/Kabel) ist online nicht ausgewiesen → vor Zusage durch Metzler bestätigen.*

## ⚑ „Needs Metzler confirmation"-Liste (nicht raten!)
1. **XDM10 max. Innenstationen/Parteien** — Produktseite „99", Innenstation „4/Gebäude", Verteiler „2 Kanäle Innenstation". Widersprüchlich.
2. **XDM10 Adressierung** — DIP-Schalter vs. Drehschalter vs. „mechanische Drehregler" (drei Quellen, drei Aussagen).
3. **XDM10 Legacy-Kompatibilität pro Altsystem** — nur allgemein auf /sprechanlagen-info; nicht produktseitig verifiziert.
4. **ADM10 RFID** — „modellabhängig"; unklar, welche ADM10-Variante RFID kann.
5. **Lieferumfang aller Sets/Produkte** — PoE-Switch/Netzteil/Kabel nicht ausgewiesen.
6. **DSGVO/Datenschutz Gesichtserkennung (SDM10)** — Speicherung biometrischer Daten; rechtlicher Hinweis fehlt online.
7. **2-Draht-IP-Fähigkeit je IP-Modell** — Konverter/Trafo-Bedarf nur teils genannt (SDM10S/Colson bestätigt, andere per Analogie „~").

## Anhang — Legacy-Systeme (XDM10-Umrüstung, Quelle /sprechanlagen-info)
Siedle (511/611, TLM 511-0x/611-0x) · Gira (TX_44, System 106) · Busch-Jaeger (Busch-Welcome Audio 1–15, Video A21381/H81381) · Ritto (Entravox 18401xx/18404xx, Portier/Acero) · Grothe (MIKRA SET 1122/31, MIKRA 2) · Elcom/Hager (ELCOM.ONE/.ESTA/.STABILA, TAP-1/1, TAP-2/1, REQ001Y) · TCS (TCS:BUS, PUK-Serie, PAK) · Bticino (Linea 3000: 343071 Audio, 343091 Video) · SKS-Kinkel (Basic Line BL2012, Edelstahl-Serie) · Comelit (Quadra, Ciao) · STR Elektronik (Softline, Varoflex) · Balter (EVO-HD, EVIDA) · Goliath (AV-VTA, Basic Line) · Balcom (BHT 9800, ETL 290).
