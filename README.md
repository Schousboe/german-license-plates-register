# German License Plate Lookup

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)]()
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
- **Node.js** - For starting up the HTTPS server
- **JSON** – Data source for license plate codes  

---

## Project Structure

german-license-plates-register /<br/>
├── .chglog <br/>
│   ├── CHANGELOG.tpl.md <br/>
│   └── config.yml <br/>
├── .gitignore <br/>
├── CHANGELOG.md <br/>
├── LICENSE <br/>
├── README.md  <br/>
├── index.html  <br/>
├── numberplates.json <br/>
├── script.js <br/>
├── server.cert <br/>
├── server.js <br/>
├── server.key  <br/>
└── style.css <br/>

---

## Usage

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/Schousboe/german-license-plates-register.git
   &&
   cd german-license-plates-register
   ```
   
2. **Generate a SSL certificate (Only the first time)**

    ```bash
   openssl req -nodes -new -x509 -keyout server.key -out server.cert
    ```
   You can just press "." and enter to all the questions asked.


3. **Start a local HTTPS server**
   
   ```bash
   node server.js
   ```
   The terminal should display:
    ```bash
   HTTPS Server running at https://localhost:8443
    ```
  
4. **Open your web browser**

     Open [https://localhost:8443](https://localhost:8443) in your browser.


5. **Enter a license plate abbreviation and the result will be displayed immediately.** 
  
    Enter an abbreviation like `B` for Berlin or `M` for Munich and click "Search" and watch the magic happen!

---

## How It Works

1. When the user clicks "Search", the function findCity() runs.

2. The script loads the numberplates.json file asynchronously.

3. The user input is matched against the dataset.

4. If a match is found, the city or region name is displayed; otherwise, an error message appears.

Example:

```
if (data[input]) {
  result.textContent = `${input} stands for ${data[input]}`;
} else {
  error.textContent = "Unknown abbreviation. Please check your spelling.";
}
```
---

## Future Improvements

- [ ] Implement autocomplete or live suggestions for abbreviations

- [x] Implement different languages
  
- [ ] Improve mobile responsiveness and accessibility

- [ ] Include additional metadata such as federal state or region

- [ ] Better project structure

---

## License

This project is licensed under the [MIT License](LICENSE).
You are free to use, modify, and distribute it for personal or commercial purposes.

---

## Author

**Developed by:** Schousboe development <br/>
**Language:** Danish, english and german <br/>
**Purpose:** Educational and reference project for identifying German vehicle registration codes. <br/>
