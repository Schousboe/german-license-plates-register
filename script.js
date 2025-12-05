const translations = {
  da: {
    title: "Tyske Nummerplader",
    heading: "Indtast en byforkortelse!",
    placeholder: "Fx HH, B, M",
    button: "Søg",
    unknown: "Ukendt forkortelse. Har du stavet det rigtigt?",
    error: "Fejl ved indlæsning af data.",
    resultTemplate: "{input} er forkortelsen for {city}"
  },
  en: {
    title: "German License Plates",
    heading: "Enter a city abbreviation!",
    placeholder: "e.g. HH, B, M",
    button: "Search",
    unknown: "Unknown abbreviation. Check your spelling.",
    error: "Error loading data.",
    resultTemplate: "{input} is the abbreviation for {city}"
  },
  de: {
    title: "Deutsche Kennzeichen",
    heading: "Geben Sie eine Stadtkennzeichnung ein!",
    placeholder: "z.B. HH, B, M",
    button: "Suchen",
    unknown: "Unbekannte Abkürzung. Überprüfen Sie Ihre Rechtschreibung.",
    error: "Fehler beim Laden der Daten.",
    resultTemplate: "{input} ist die Abkürzung für {city}"
  }
};


let currentLanguage = 'en';

function setLanguage(lang) {
  currentLanguage = lang;

  document.title = translations[lang].title;
  document.querySelector('h1').textContent = translations[lang].heading;
  document.getElementById('input').placeholder = translations[lang].placeholder;
  document.getElementById('searchButton').textContent = translations[lang].button;

}


async function findCity() {
  const input = document.getElementById("input").value.toUpperCase().trim();
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  try {
    const response = await fetch("numberplates.json");
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
