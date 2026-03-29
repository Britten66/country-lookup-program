# QAP3 – Neighboring Countries React App
**Author:** Christopher Britten  
**Course:** Semester 2 – QAP 3  

## Summary
A React application that fetches live country data from the REST Countries API and filters countries based on whether they have neighbors whose names start with **A** or **I**. The app includes an interactive country viewer with navigation buttons, flag display, country facts, and a Google Maps embed showing the selected country's location.

## Border Code Sorting

Note: The border codes are the only elements sorted numerically within the map data. All other fields, including country names, are sorted alphabetically.

---

## Setup
```bash
git clone https://github.com/Britten66/S2_QAP3.git
cd qap3-neighbors
npm install
npm run dev
```

App runs at:  
`http://localhost:5173`

---

## Tech Used
- React (with Vite)
- REST Countries API v3.1
- Google Maps Embed API
- Modern JavaScript (ES6+)
- CSS for layout and theming

---

## Project Structure
```plaintext
src/
├── components/
│   ├── MapView.jsx
│   ├── NeighborA.jsx
│   ├── NeighborI.jsx
│   ├── NeighborA.css
│   ├── NeighborI.css
├── App.jsx
├── app.css
└── main.jsx
```

---

## How It Works

### Fetching Data
REST Countries API is called on load:

```javascript
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies"
)
```

Results are stored and filtered into two categories:  
- Countries with **A-starting** neighbors  
- Countries with **I-starting** neighbors  

### Filtering Example
```javascript
const filteredResultA = data.filter((country) => {
  if (!country.borders) return false;
  return country.borders.some((code) => {
    const neighbor = data.find(c => c.cca3 === code);
    return neighbor?.name.common.startsWith("A");
  });
});
```

### Navigation + Country Display
`MapView.jsx` shows:
- Flag  
- Country name  
- Capital  
- Border codes  
- Languages  
- Currency  
- Quick facts sidebar  
- Prev / Next buttons  

### Google Maps Embed
```jsx
const query = encodeURIComponent(current.name.common);

<iframe
  src={`https://www.google.com/maps?q=${query}&output=embed`}
  title={current.name.common}
  loading="lazy"
/>
```

---

## Styling
- Custom background using a vintage map illustration  
- Semi-transparent dark containers for readability over the background  
- Blue accent buttons and highlights for consistent UI contrast  
- Flexbox layout for country details and map display  
- Rounded containers, spacing, and subtle shadows for visual clarity  
- Responsive design adjustments for cleaner layout at various widths

---

## Time Spent
```plaintext
Project setup and environment ............ 4.0 hrs
Learning React concepts and hooks ........ 8.0 hrs
Building core components (App, MapView) .. 7.0 hrs
Styling and layout adjustments ........... 6.0 hrs
API integration and data handling ........ 5.0 hrs
Debugging and fixing edge cases .......... 12.0 hrs
Google Maps research/testing ............. 4.0 hrs
Map view integration and UI tweaks ....... 5.0 hrs
General research and documentation ....... 6.0 hrs
README preparation and final cleanup ..... 3.0 hrs
---------------------------------------------------
Total .................................... 55.0 hours
```

---

## Resources Used
Class notes and lecture materials  
React documentation:
- Hooks (useState, useEffect)  
- Component lifecycle  
- State management patterns  
REST Countries API documentation
Google Maps Embed API documentation
MDN Web Docs:
- JavaScript ES6+ features
- CSS Flexbox and Grid
- Async/await and Promises
Stack Overflow (debugging and troubleshooting)
YouTube tutorials:
- React fundamentals and project structure
- API integration with fetch
- Working with JSON data
- Responsive design techniques
W3Schools (CSS and HTML reference)  
Vite documentation (configuration and build)  
GitHub documentation (version control)
