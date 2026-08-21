import React, { useState } from 'react';
import evCars from '../data/evCars';
import EVGrid from '../components/EVGrid';
import './EVCars.css';

export default function EVCars() {
  const [search, setSearch] = useState('');

  const filtered = evCars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="ev-cars-header">
        <h1>Our EV Fleet</h1>
        <p>Seven electric models, every one of them a flat ₹50 fare.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="ev-search">
            <input
              type="text"
              placeholder="Search by model name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <EVGrid cars={filtered} />
        </div>
      </section>
    </div>
  );
}
