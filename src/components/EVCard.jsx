import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './EVCard.css';

export default function EVCard({ car }) {
  return (
    <div className="ev-card card">
      <div className="ev-card-image motion-image-reveal">
        <img src={car.image} alt={car.name} onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
      </div>

      <div className="ev-card-body">
        <div className="ev-card-top">
          <h3>{car.name}</h3>
          <StarRating value={car.rating} readOnly />
        </div>

        <p className="ev-card-tagline">{car.tagline}</p>

        <ul className="ev-card-specs">
          <li><strong>{car.seats}</strong> Seats</li>
          <li><strong>{car.battery}</strong></li>
          <li><strong>{car.range}</strong></li>
        </ul>

        <div className="ev-card-footer">
          <div className="ev-card-fare">
            <span className="fare-label">Fare</span>
            <span className="fare-amount">&#8377;{car.fare}</span>
          </div>
          <div className="ev-card-actions">
            <Link to={`/ev-cars/${car.id}`} className="btn btn-outline">View Details</Link>
            <Link to="/book" state={{ carId: car.id }} className="btn btn-primary">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
