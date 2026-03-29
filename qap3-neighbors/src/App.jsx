import MapView from "./components/MapView";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies,region"
    )
      .then((res) => res.json())
      .then((data) => setAllCountries(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = () => {
    const query = input.trim().toLowerCase();
    if (!query) return;

    const results = allCountries.filter((country) => {
      const name = country.name.common.toLowerCase();
      const official = country.name.official?.toLowerCase() || "";
      const capital = country.capital?.[0]?.toLowerCase() || "";
      const region = country.region?.toLowerCase() || "";
      const languages = Object.values(country.languages || {}).map((l) => l.toLowerCase());

      return (
        name.includes(query) ||
        official.includes(query) ||
        capital.includes(query) ||
        region.includes(query) ||
        languages.some((l) => l.includes(query))
      );
    });

    // Sort: exact name matches first, then starts-with, then rest
    results.sort((a, b) => {
      const an = a.name.common.toLowerCase();
      const bn = b.name.common.toLowerCase();
      if (an === query && bn !== query) return -1;
      if (bn === query && an !== query) return 1;
      if (an.startsWith(query) && !bn.startsWith(query)) return -1;
      if (bn.startsWith(query) && !an.startsWith(query)) return 1;
      return an.localeCompare(bn);
    });

    setFiltered(results);
    setActiveQuery(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setFiltered([]);
    setActiveQuery("");
    setInput("");
  };

  return (
    <>
      <div className="container">
        <div className="headerText">
          <h2>Country Search</h2>
          <p className="header-sub">Search by name, capital, region, or language</p>
        </div>

        <div className="countryBtn">
          <input
            type="text"
            placeholder="e.g. France, Paris, Europe, Arabic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="letter-input"
          />
          <button onClick={handleSearch}>Search</button>
          {activeQuery && (
            <button className="btn-clear" onClick={handleClear}>Clear</button>
          )}
        </div>

        {activeQuery && (
          <div className="result-count">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{activeQuery}&rdquo;
          </div>
        )}

        {!activeQuery && (
          <div className="enter-text">
            <h3>Search any country, capital, region, or language</h3>
          </div>
        )}

        <div className="contentLayout">
          {filtered.length > 0 && (
            <MapView countries={filtered} allCountries={allCountries} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
