# MetalTrack v4.2 — Waste Manager

Gestionale per officine e lavorazioni metalliche. Monitora magazzino lamiere/tondi, sfridi riutilizzabili, lavorazioni e costi cliente.

## 🚀 Caratteristiche

- 📱 **PWA installabile** su PC, Android e iPhone (senza app store)
- ☁️ **Cloud sync automatico** con database Appwrite
- 🔌 **Offline-first**: lavora senza internet, sincronizza al ritorno della connessione
- 🟢 **Indicatore stato connessione** sempre visibile nella barra in alto
- 🧪 **Elenco materiali gestibile** con densità preimpostate (v4.2)
- 🔒 Accesso protetto da **PIN a 4 cifre**
- 📊 Dashboard con KPI, costi, efficienza
- 📄 Export PDF (bolle, report annuale, guida)
- 📑 Export CSV per backup

## 📥 Installazione come App

| Dispositivo | Browser | Come installare |
|-------------|---------|-----------------|
| PC / Mac    | Chrome, Edge | Icona ➕ nella barra indirizzi → "Installa" |
| Android     | Chrome  | Menu ⋮ → "Aggiungi alla schermata Home" |
| iPhone/iPad | Safari  | Condividi □↑ → "Aggiungi alla schermata Home" |

Una volta installata, MetalTrack si apre come app nativa a schermo intero.

## 🌐 Pubblicazione su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `metaltrack`)
2. Carica **tutti i file di questa cartella**: `index.html`, `manifest.json`, `sw.js`, `.nojekyll`, e la cartella `icons/`
3. Vai su **Settings → Pages**
4. Seleziona branch `main`, cartella `/ (root)` → **Save**
5. Attendi 1-2 minuti. L'app sarà disponibile su:
   ```
   https://TUO_NOME.github.io/metaltrack/
   ```

## 📁 Struttura del repository

```
metaltrack/
├── index.html                   # App principale (file unico con tutta la logica)
├── manifest.json                # Manifest PWA per l'installazione
├── sw.js                        # Service Worker (offline + cache)
├── .nojekyll                    # Disabilita Jekyll su GitHub Pages
├── README.md                    # Questo file
└── icons/
    ├── icon-192.png             # Icona standard 192x192
    ├── icon-512.png             # Icona standard 512x512
    ├── icon-maskable-512.png    # Icona maskable per Android
    └── apple-touch-icon.png     # Icona 180x180 per iOS
```

## ☁️ Configurazione Appwrite

L'app si connette al progetto Appwrite configurato nel codice (`index.html` → sezione `APPWRITE CONFIG`). Per un setup completo servono:

- **1 Database** (ID: `69e48d53001cbfe3f77d`)
- **6 Collection**: `magazzino`, `lavorazioni`, `sfridi`, `snapshots`, `storici`, `materiali`
- Ogni collection deve avere un attributo **String** chiamato `payload` (size 1000000, non required)
- Permessi **Role: Any** con Create/Read/Update/Delete abilitati

⚠️ **Nuova collection v4.2**: se avevi già il database dalla v4.1, aggiungi la collection `materiali` con le stesse impostazioni delle altre. Se non la crei, l'app funziona comunque ma i materiali resteranno solo nel localStorage locale.

## 🔐 PIN

- Default: `1234`
- Cambia subito tramite il pulsante 🔑 nella barra di navigazione
- ⚠️ Se dimenticato non è recuperabile

## 🟢 Stato Connessione

Il pallino nella barra di navigazione mostra in tempo reale:

| Pallino | Stato | Significato |
|---------|-------|-------------|
| 🟢 Verde | SYNC | Connesso al cloud, dati sincronizzati |
| 🟡 Giallo lampeggiante | SYNC… | Salvataggio in corso |
| ⚪ Grigio | — | Offline, salvataggio solo locale |
| 🟡 Giallo fisso | IN CODA | Sync in attesa |

Il sync avviene automaticamente quando torna la connessione.

## 💾 Backup

I dati sono salvati in:
1. **localStorage** del browser (immediato)
2. **Appwrite Cloud** (sync automatico)

In aggiunta, si consiglia di esportare il CSV dalle Commesse settimanalmente come backup di emergenza.

## 📖 Documentazione completa

Il PDF del manuale utente è scaricabile dalla sezione **📖 Guida** dentro l'app, oppure disponibile nella release del repository.

## 🛠 Tecnologie

- HTML / CSS / JavaScript vanilla (zero dipendenze frontend)
- [Appwrite](https://appwrite.io) per il database cloud
- [jsPDF](https://github.com/parallax/jsPDF) + autotable per l'export PDF
- Service Worker API per offline-first
- Web App Manifest per l'installazione PWA

## 📝 Licenza

Proprietario — tutti i diritti riservati.
