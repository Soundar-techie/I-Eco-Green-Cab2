import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { hoursUntil, hasRideTimePassed, statusBadgeClass } from '../utils/validation';
import EmptyState from '../components/EmptyState';
import StarRating from '../components/StarRating';
import './MyBookings.css';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(
    storage.getBookings().filter((b) => b.userId === user.id)
  );

  function updateBooking(bookingId, updates) {
    const allBookings = storage.getBookings();
    const updated = allBookings.map((b) =>
      b.id === bookingId ? { ...b, ...updates } : b
    );
    storage.saveBookings(updated);
    setBookings(updated.filter((b) => b.userId === user.id));
  }

  function handleCancel(booking) {
    if (hoursUntil(booking.bookingDate, booking.bookingTime) < 2) {
      alert('This ride starts in less than 2 hours and can no longer be cancelled.');
      return;
    }
    if (window.confirm('Cancel this booking?')) {
      updateBooking(booking.id, { status: 'Cancelled' });
    }
  }

  function handleMarkCompleted(booking) {
    if (!hasRideTimePassed(booking.bookingDate, booking.bookingTime)) {
      alert('This ride has not started yet. You can mark it complete after the scheduled time.');
      return;
    }
    updateBooking(booking.id, { status: 'Completed' });
  }

  function handleRate(booking, stars) {
    updateBooking(booking.id, { rating: stars });
  }

  const sorted = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>All of your EV cab bookings in one place.</p>
      </div>

      <section className="section">
        <div className="container">
          {sorted.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              message="Once you book an EV cab, it will show up here."
              actionLabel="Book a Cab"
              actionTo="/book"
            />
          ) : (
            <div className="bookings-list">
              {sorted.map((booking) => {
                const canCancel =
                  booking.status === 'Confirmed' &&
                  hoursUntil(booking.bookingDate, booking.bookingTime) >= 2;

                const canComplete =
                  booking.status === 'Confirmed' &&
                  hasRideTimePassed(booking.bookingDate, booking.bookingTime);

                const canRate =
                  booking.status === 'Completed' && !booking.rating;

                return (
                  <div className="card booking-row" key={booking.id}>
                    <div className="booking-row-main">
                      <div className="booking-row-top">
                        <strong>{booking.evCarName}</strong>
                        <span className={`badge ${statusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="booking-row-route">
                        {booking.pickup} &rarr; {booking.destination}
                      </div>
                      <div className="booking-row-meta">
                        <span>{booking.bookingDate} at {booking.bookingTime}</span>
                        <span>Booking ID: {booking.id}</span>
                        <span className="booking-row-fare">&#8377;{booking.fare}</span>
                      </div>

                      {booking.status === 'Completed' && booking.rating && (
                        <div className="booking-row-rating">
                          <StarRating value={booking.rating} readOnly />
                        </div>
                      )}

                      {canRate && (
                        <div className="booking-row-rate-prompt">
                          <span>Rate this ride:</span>
                          <StarRating onRate={(stars) => handleRate(booking, stars)} />
                        </div>
                      )}
                    </div>

                    <div className="booking-row-actions">
                      <Link to={`/my-bookings/${booking.id}`} className="btn btn-outline">
                        View Details
                      </Link>
                      {canCancel && (
                        <button className="btn btn-danger" onClick={() => handleCancel(booking)}>
                          Cancel
                        </button>
                      )}
                      {canComplete && (
                        <button className="btn btn-primary" onClick={() => handleMarkCompleted(booking)}>
                          Mark as Completed
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
