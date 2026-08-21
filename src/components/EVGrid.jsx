import React from 'react';
import EVCard from './EVCard';
import EmptyState from './EmptyState';
import Reveal from './animation/Reveal';
import './EVGrid.css';

export default function EVGrid({ cars }) {
  if (!cars.length) {
    return (
      <EmptyState
        title="No cars match your search"
        message="Try a different keyword or clear the search box."
      />
    );
  }

  return (
    <Reveal as="div" className="ev-grid" stagger={0.08} y={26}>
      {cars.map((car) => (
        <EVCard key={car.id} car={car} />
      ))}
    </Reveal>
  );
}
