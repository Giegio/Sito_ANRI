/**
 * Google Apps Script - Backend per Anri Commerciale
 * 
 * Istruzioni per la pubblicazione:
 * 1. Vai su https://script.google.com e crea un nuovo progetto.
 * 2. Incolla questo codice nel file Codice.gs.
 * 3. Clicca su "Esegui" per autorizzare l'accesso a Fogli Google e Gmail.
 * 4. Clicca su "Nuova distribuzione" -> "Applicazione web".
 * 5. Configura: 
 *    - Descrizione: "Anri Lead Backend"
 *    - Esegui come: "Tu"
 *    - Chi ha accesso: "Chiunque" (importante per ricevere dati dal sito).
 * 6. Copia l'URL dell'applicazione web e incollalo in components.js.
 */

function doPost(e) {
  try {
    // Parsing dei dati ricevuti
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    // 1. Salvataggio su Google Sheets
    // Crea un foglio chiamato "Lead" nel tuo Google Drive se vuoi un foglio specifico,
    // altrimenti userà il foglio attivo del file collegato.
    const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("Anri_Commerciale_Leads");
    const sheet = ss.getSheets()[0];
    
    // Se il foglio è vuoto, aggiungi l'intestazione
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data", "Nome", "Azienda", "Email", "Telefono", 
        "Interesse", "Litraggio", "Area", "Tempistica", "Messaggio", "Sorgente"
      ]);
    }
    
    // Aggiunta della riga
    sheet.appendRow([
      timestamp,
      data.name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.interest || "",
      data.liters || "",
      data.area || data.location || "",
      data.timing || "",
      data.message || "",
      data.product || "Form Sito"
    ]);
    
    // 2. Invio notifica Email
    const recipient = "anricommerciale@gmail.com"; // Email del proprietario
    const subject = "Nuovo Lead dal Sito: " + (data.name || "Contatto");
    
    const htmlBody = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d32f2f;">Nuova richiesta ricevuta</h2>
        <p>Hai ricevuto un nuovo contatto dal modulo multi-step del sito:</p>
        <hr>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Azienda:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Interesse:</strong> ${data.interest}</p>
        <p><strong>Litraggio:</strong> ${data.liters || 'N/A'}</p>
        <p><strong>Area:</strong> ${data.area || data.location || 'N/A'}</p>
        <p><strong>Tempistica:</strong> ${data.timing || 'N/A'}</p>
        <p><strong>Messaggio:</strong><br>${data.message || 'N/A'}</p>
        <hr>
        <p style="font-size: 12px; color: #777;">Email generata automaticamente dal sistema Anri Lead Generation.</p>
      </div>
    `;
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
    
    // Risposta di successo
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log dell'errore e risposta fallita
    console.error("Errore script:", error);
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
