const translations = {
  da: {
    title: "Tyske Nummerplader",
    heading: "Indtast en byforkortelse!",
    placeholder: "Fx HH, B, M",
    button: "Søg",
    unknown: "Ukendt forkortelse. Har du stavet det rigtigt?",
    error: "Fejl ved indlæsning af data.",
    notFoundHeader: "Ikke fundet",
    notFoundParagraph: "Undskyld, vi kunne desværre ikke finde det her sted i vores servere 🫠",
    backHomeBtn: "Tilbage til hjem",
    resultTemplate: "{input} er forkortelsen for {city}"
  },
  en: {
    title: "German License Plates",
    heading: "Enter a city abbreviation!",
    placeholder: "e.g. HH, B, M",
    button: "Search",
    unknown: "Unknown abbreviation. Check your spelling.",
    error: "Error loading data.",
    notFoundHeader: "Not found",
    notFoundParagraph: "Sorry, we couldn't find this place in our servers 🫠",
    backHomeBtn: "Back to home",
    resultTemplate: "{input} is the abbreviation for {city}"
  },
  de: {
    title: "Deutsche Kennzeichen",
    heading: "Geben Sie eine Stadtkennzeichnung ein!",
    placeholder: "z.B. HH, B, M",
    button: "Suchen",
    unknown: "Unbekannte Abkürzung. Überprüfen Sie Ihre Rechtschreibung.",
    error: "Fehler beim Laden der Daten.",
    notFoundHeader: "Nicht gefunden",
    notFoundParagraph: "Leider konnten wir diesen Ort nicht auf unseren Servern finden",
    backHomeBtn: "Zurück nach Hause",
    resultTemplate: "{input} ist die Abkürzung für {city}"
  }
};


let currentLanguage = 'en';

function setLanguage(lang) {
  currentLanguage = lang;

  document.title = translations[lang].title;

  const h1 = document.querySelector('h1');
  if (h1) h1.textContent = translations[lang].heading;

  const input = document.getElementById('input');
  if (input) input.placeholder = translations[lang].placeholder;

  const searchButton = document.getElementById('searchButton');
  if (searchButton) searchButton.textContent = translations[lang].button;

  const nfHeader = document.querySelector('.notFoundHeader');
  if (nfHeader) nfHeader.textContent = translations[lang].notFoundHeader;

  const nfParagraph = document.querySelector('.notFoundParagraph');
  if (nfParagraph) nfParagraph.textContent = translations[lang].notFoundParagraph;

  const backBtn = document.querySelector('.backHomeButton');
  if (backBtn) backBtn.textContent = translations[lang].backHomeBtn;
}



async function findCity() {
  const input = document.getElementById("input").value.toUpperCase().trim();
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  try {
    const response = await fetch("/data");
    const data = await response.json();

    if (data[input]) {
      const template = translations[currentLanguage].resultTemplate;
      result.textContent = template.replace("{input}", input).replace("{city}", data[input]);
    } else {
      error.textContent = translations[currentLanguage].unknown;
    }


  } catch (err) {
    error.textContent = translations[currentLanguage].error;
    console.error(err);
  }
}
