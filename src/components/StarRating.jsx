import React, { useState } from 'react';
import './StarRating.css';

// Two modes:
// - readOnly: just displays a static rating number (used on EV cards)
// - interactive: lets the customer pick 1-5 stars and calls onRate

export default function StarRating({ value = 0, readOnly = false, onRate }) {
  const [hovered, setHovered] = useState(0);

  if (readOnly) {
    return (
      <div className="star-rating readonly">
        <span className="star filled">&#9733;</span>
        <span className="star-value">{value.toFixed(1)}</span>
      </div>
    );
  }

  return (
    <div className="star-rating interactive">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${(hovered || value) >= star ? 'filled' : ''}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(star)}
          aria-label={`Rate ${star} star`}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
}
