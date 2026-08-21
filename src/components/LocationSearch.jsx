import React, { useState } from 'react';
import locations from '../data/locations';
import './LocationSearch.css';

// A simple text input + popular-location chips. Typing a location
// that isn't in our popular list is still accepted - we just won't
// have coordinates for it, so the map marker stays on the nearest
// popular point (Erode) until a real geocoding API is wired up.

export default function LocationSearch({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value || '');

  function handleTextChange(e) {
    const text = e.target.value;
    setQuery(text);
    onChange({ name: text, lat: null, lng: null });
  }

  function handlePick(place) {
    setQuery(place.name);
    onChange(place);
  }

  const filtered = query
    ? locations.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
    : locations;

  return (
    <div className="form-field location-search">
      <label>{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleTextChange}
        placeholder={placeholder || 'Type a location in Tamil Nadu'}
      />

      <div className="location-chips">
        {filtered.slice(0, 6).map((place) => (
          <button
            type="button"
            key={place.name}
            className="location-chip"
            onClick={() => handlePick(place)}
          >
            {place.name}
          </button>
        ))}
      </div>
    </div>
  );
}
