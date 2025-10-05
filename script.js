async function findCity() {
  const input = document.getElementById("input").value.toUpperCase().trim();
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  result.textContent = "";
  error.textContent = "";

  try {
    const response = await fetch("nummerplader.json");
    const data = await response.json();

    if (data[input]) {
      result.textContent = `${input} står for ${data[input]}`;
    } else {
      error.textContent = `Ukendt forkortelse. Har du stavet det rigtigt?`;
    }
  } catch (err) {
    error.textContent = "Fejl ved indlæsning af data.";
    console.error(err);
  }
}