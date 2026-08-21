import React from 'react';
import { useParams, Link } from 'react-router-dom';
import evCars from '../data/evCars';
import StarRating from '../components/StarRating';
import EmptyState from '../components/EmptyState';
import Reveal from '../components/animation/Reveal';
import './EVCarDetails.css';

export default function EVCarDetails() {
  const { carId } = useParams();
  const car = evCars.find((c) => c.id === carId);

  if (!car) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title="Car not found"
            message="We couldn't find that EV in our fleet."
            actionLabel="Browse EV Cars"
            actionTo="/ev-cars"
          />
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <Reveal as="div" className="container details-layout" stagger={0.12} y={30}>
        <div className="details-image motion-image-reveal">
          <img src={car.image} alt={car.name} onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
        </div>

        <div className="details-info">
          <h1>{car.name}</h1>
          <StarRating value={car.rating} readOnly />
          <p className="details-tagline">{car.tagline}</p>

          <div className="details-specs">
            <div className="spec-item">
              <span>Seating Capacity</span>
              <strong>{car.seats} Seats</strong>
            </div>
            <div className="spec-item">
              <span>Battery</span>
              <strong>{car.battery}</strong>
            </div>
            <div className="spec-item">
              <span>Range</span>
              <strong>{car.range}</strong>
            </div>
            <div className="spec-item">
              <span>Charging</span>
              <strong>{car.charging}</strong>
            </div>
          </div>

          <div className="details-fare-box">
            <div>
              <span className="fare-label">Fare</span>
              <span className="fare-amount">&#8377;{car.fare}</span>
            </div>
            <Link to="/book" state={{ carId: car.id }} className="btn btn-primary">
              Book Now
            </Link>
          </div>

          <p className="details-note">
            Specifications shown are the manufacturer's published figures.
            Real-world range depends on driving conditions.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
