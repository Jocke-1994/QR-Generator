# qr-gen

En snabb och minimalistisk QR-kodsgenerator med terminal-inspirerad estetik. Byggd med React + Vite.

## Live

**[jocke-1994.github.io/qr-generator](https://jocke-1994.github.io/qr-generator)**

---

## Funktioner

- Generera QR-koder från valfri URL eller text
- Lägg till ett valfritt namn/etikett som visas ovanför eller under QR-koden
- Ladda ner QR-koden som PNG (med etikett inbakad om sådan finns)
- Terminalliknande logg som visar info om senast genererad kod
- Mörkt tema med grön accent och JetBrains Mono-typsnitt

## Tekniker

| Teknik | Syfte |
|---|---|
| React 19 | UI-ramverk |
| Vite 8 | Byggverktyg och dev-server |
| qrcode.react | QR-kodsgenerering |
| @fontsource/jetbrains-mono | Monospace-typsnitt |
