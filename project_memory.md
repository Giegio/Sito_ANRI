# Memoria del Progetto: Sito Anri Commerciale

## Obiettivi
- Rinnovo architettonico e visivo del sito web per Anri Commerciale.
- Transizione verso un layout multi-pagina ("Stazioni di Rifornimento", "Cisterne & Serbatoi", "E-Shop", "Chi Siamo", "Contatti").
- Introduzione di nuove soluzioni per settori emergenti: "Datacenter" e "EV Charge".

## Modifiche Recenti (Maggio 2026)
- **Home Page (`index.html`)**: 
  - Rimossa la menzione alle certificazioni UNI EN ISO nella sezione hero.
  - Sostituita con un badge "Qualità garantita!" personalizzato tramite il logo `Qualita.png`.
- **Nuove Pagine Generate**:
  - `datacenter.html`: Creata seguendo lo schema di `cisterne.html`, dedicata ai sistemi di stoccaggio e pompaggio in ridondanza per l'alimentazione di gruppi elettrogeni di emergenza nei Datacenter.
  - `ev-charge.html`: Creata seguendo lo schema di `cisterne.html`, dedicata alle infrastrutture di ricarica E-Mobility, colonnine ultra-fast e soluzioni per stazioni multi-energy.
- **Aggiornamento Navigazione e Accessibilità**:
  - Ristrutturato il menu principale (Header) in tutte le pagine: raggruppate "Stazioni di Rifornimento", "Cisterne & Serbatoi", "Datacenter" ed "EV Charge" sotto un'unica macro-voce a tendina **"Le Nostre Soluzioni"**.
  - Aggiunti sotto-menu annidati per le voci all'interno di "Le Nostre Soluzioni", ripristinando i collegamenti specifici (es. Erogatori, Da Interrare, ecc.) con stili sia per desktop (hover) che per mobile (click).
  - Al primo livello della navbar restano: **E-Shop**, **Chi Siamo** e **Contatti**.
  - Aggiornati i relativi link nel footer.
  - Arricchita la sezione "Le nostre soluzioni" in `index.html` con due nuove card dedicate per un rapido accesso.

- **E-Shop & Dati Dinamici**:
  - Sostituito il layout statico (hard-coded) della vetrina E-Shop in `index.html` con un caricamento asincrono e dinamico dei prodotti a partire dal file `prodotti.json`.
  - Aggiornata la logica di filtro (Categorie) per interrogare in tempo reale i componenti generati asincronamente.

- **Lead Generation & Analytics (Aggiornamento 12 Maggio 2026)**:
  - **Infrastruttura di Conversione**: Implementato un nuovo sistema di Lead Generation basato su form multi-step per ridurre l'attrito e migliorare la qualità dei dati raccolti.
  - **Centralizzazione Analytics**: Creato `analytics.js` per gestire centralmente il tracking di Google Analytics 4 (GA4), includendo eventi automatici per click telefonici, inizio form e lead generati.
  - **Backend Integration**: Scelta l'integrazione con **Google Apps Script** per la gestione delle sottomissioni dei form. La logica in `components.js` è ora predisposta per inviare i dati a un Web App URL di Google, permettendo il salvataggio automatico su Google Sheets e l'invio di notifiche email senza dipendenze esterne pesanti.
  - **Social Proof**: Arricchita la Home Page con sezioni premium per "Case Studies" e un carosello di "Testimonianze" per aumentare la fiducia dell'utente finale.
  - **Uniformità**: Aggiornato il modal globale in tutte le pagine di servizio (`index`, `stazioni`, `cisterne`, `eshop`, `ev-charge`, `datacenter`) per garantire un'esperienza di conversione coerente su tutto il sito.

## Design e Stile
- **Estetica**: Premium, moderna, layout responsive e dinamico.
- **Componenti**: Utilizzo di icone Feather, font Barlow Condensed e DM Sans, e componenti riutilizzabili definiti in `style.css` e `pages.css`.
- **Materiali**: Focus esclusivo su soluzioni in Acciaio certificato (rimossi Polietilene e Vetroresina).
## Prossimi Passi
- Configurare l'ID reale della GA4 in `analytics.js`.
- Configurare il `GAS_URL` reale in `components.js` dopo aver pubblicato lo script su Google Apps Script.
- Continuare il popolamento del catalogo prodotti nel file `prodotti.json`.
- Ottimizzazione SEO finale per le nuove pagine generate.