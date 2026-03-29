import { useState, useEffect } from "react";

function MapView({ countries, allCountries }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [countries]);

  if (!countries || countries.length === 0) return null;

  const current = countries[index];
  const query = encodeURIComponent(current.name.common);

  const next = () => setIndex((prev) => (prev + 1) % countries.length);
  const prev = () => setIndex((prev) => (prev - 1 + countries.length) % countries.length);

  const resolveNeighborNames = (borders) => {
    if (!borders?.length) return "None";
    return borders
      .map((code) => allCountries.find((c) => c.cca3 === code)?.name.common || code)
      .join(", ");
  };

  return (
    <div className="viewMap">
      <h3>
        Country {index + 1} of {countries.length}: {current.name.common}
      </h3>

      <div className="viewMap-button">
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>

      <div className="viewMap-top">
        <div className="viewMap-flag">
          <img
            src={current.flags?.png || current.flags?.svg}
            alt={`${current.name.common} flag`}
          />

          <div className="side-info">
            <h4>Country Facts</h4>

            {current.capital && (
              <p>
                <strong>Capital:</strong> {current.capital[0]}
              </p>
            )}

            <p>
              <strong>Land Borders:</strong> {current.borders?.length || 0}
            </p>

            {current.borders?.length > 0 && (
              <p>
                <strong>Neighbors:</strong> {resolveNeighborNames(current.borders)}
              </p>
            )}

            {current.languages && Object.keys(current.languages).length > 0 && (
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(current.languages).filter(Boolean).join(", ")}
              </p>
            )}

            {current.currencies && Object.keys(current.currencies).length > 0 && (
              <p>
                <strong>Currency:</strong>{" "}
                {Object.values(current.currencies)
                  .filter((c) => c && c.name)
                  .map((c) => c.name)
                  .join(", ") || "N/A"}
              </p>
            )}
          </div>
        </div>

        <div className="viewMap-content">
          <div className="viewMap-frame">
            <iframe
              title={current.name.common}
              src={`https://www.google.com/maps?q=${query}&output=embed`}
              style={{ width: "100%", height: "350px", border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
