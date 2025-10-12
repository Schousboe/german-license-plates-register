# German License Plate Lookup

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A lightweight web application that allows users to look up German license plate abbreviations and find out which **city or district** they represent.

---

## Overview

This project provides a simple, fast, and offline-capable tool to identify German vehicle registration codes.  
Users can enter a license plate abbreviation (for example, `HH`, `B`, or `M`) and instantly see the corresponding city or region.

---

## Features

- Search for any German license plate abbreviation  
- Displays the corresponding city or district name  
- Handles unknown abbreviations with clear, user-friendly error messages  
- Uses a local JSON file as the data source (no external API required)  
- Lightweight and dependency-free  

---

## Technologies Used

- **HTML5** – Structure and markup  
- **CSS3** – Styling and layout  
- **Vanilla JavaScript** – Core logic and interactivity  
- **JSON** – Data source for license plate codes  

---

## Project Structure

german-license-plates-register /<br/>
├── [index.html](index.html) <br/>
├── [style.css](style.css)  <br/>
├── [script.js](script.js)  <br/>
├── [README.md](README.md) <br/>
├── [LICENSE](LICENSE) <br/>
└── [nummerplader.json](nummerplader.json)  <br/>

---

## Usage

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/Schousboe/german-license-plates-register.git
      
   cd german-license-plates-register
   ```
   
2. **Open index.html in your browser.**
   
   You can simply double-click the file or serve it locally.

3. **Enter a license plate abbreviation and the result will be displayed immediately.** <br/>
<br/>

> [!TIP]
> If the search doesn't work when opening index.html directly, try serving the folder using a local HTTP server (e.g., `python -m http.server`) so that JSON fetch requests work properly.

---

## How It Works

1. When the user clicks "Search", the function findCity() runs.

2. The script loads the nummerplader.json file asynchronously.

3. The user input is matched against the dataset.

4. If a match is found, the city or region name is displayed; otherwise, an error message appears.

Example:

```
if (data[input]) {
  result.textContent = ${input} stands for ${data[input]};
} else {
  error.textContent = Unknown abbreviation. Please check your spelling.;
}
```
---

## Future Improvements

- [ ] Implement autocomplete or live suggestions for abbreviations

- [x] Implement different languages
  
- [ ] Improve mobile responsiveness and accessibility

- [ ] Include additional metadata such as federal state or region

---

## License

This project is licensed under the [MIT License](LICENSE).
You are free to use, modify, and distribute it for personal or commercial purposes.

---

## Author

**Developed by:** Schousboe development <br/>
**Language:** Danish, english and german <br/>
**Purpose:** Educational and reference project for identifying German vehicle registration codes. <br/>
