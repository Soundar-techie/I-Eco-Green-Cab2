import React from 'react';
import './BookingSummary.css';

export default function BookingSummary({ booking }) {
  return (
    <div className="booking-summary card">
      <h3>Booking Summary</h3>
      <dl>
        <div className="summary-row">
          <dt>EV</dt>
          <dd>{booking.evCarName}</dd>
        </div>
        <div className="summary-row">
          <dt>Pickup</dt>
          <dd>{booking.pickup}</dd>
        </div>
        <div className="summary-row">
          <dt>Destination</dt>
          <dd>{booking.destination}</dd>
        </div>
        <div className="summary-row">
          <dt>Date</dt>
          <dd>{booking.bookingDate}</dd>
        </div>
        <div className="summary-row">
          <dt>Time</dt>
          <dd>{booking.bookingTime}</dd>
        </div>
      </dl>
      <div className="summary-fare">
        <span>Total Fare</span>
        <span className="summary-fare-amount">&#8377;{booking.fare}</span>
      </div>
    </div>
  );
}
