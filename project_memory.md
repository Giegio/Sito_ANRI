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

## Design e Stile
- **Estetica**: Premium, moderna, layout responsive e dinamico.
- **Componenti**: Utilizzo di icone Feather, font Barlow Condensed e DM Sans, e componenti riutilizzabili definiti in `style.css` e `pages.css`.

## Prossimi Passi
- Aggiungere eventuali ulteriori personalizzazioni alle pagine Datacenter e EV Charge qualora si volessero arricchire con immagini specifiche.
- Popolare ulteriormente il catalogo prodotti nel file `prodotti.json`.
- Continuare l'ottimizzazione SEO e delle performance complessive.