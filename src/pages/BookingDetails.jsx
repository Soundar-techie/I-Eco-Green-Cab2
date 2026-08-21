import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { hoursUntil, hasRideTimePassed, statusBadgeClass } from '../utils/validation';
import EmptyState from '../components/EmptyState';
import StarRating from '../components/StarRating';
import './BookingDetails.css';

export default function BookingDetails() {
  const { bookingId } = useParams();
  const { user } = useAuth();

  const [booking, setBooking] = useState(() =>
    storage.getBookings().find((b) => b.id === bookingId && b.userId === user.id)
  );

  if (!booking) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title="Booking not found"
            message="We couldn't find this booking in your account."
            actionLabel="Go to My Bookings"
            actionTo="/my-bookings"
          />
        </div>
      </div>
    );
  }

  function updateBooking(updates) {
    const allBookings = storage.getBookings();
    const updated = allBookings.map((b) =>
      b.id === booking.id ? { ...b, ...updates } : b
    );
    storage.saveBookings(updated);
    setBooking(updated.find((b) => b.id === booking.id));
  }

  function handleCancel() {
    if (hoursUntil(booking.bookingDate, booking.bookingTime) < 2) {
      alert('This ride starts in less than 2 hours and can no longer be cancelled.');
      return;
    }
    if (window.confirm('Cancel this booking?')) {
      updateBooking({ status: 'Cancelled' });
    }
  }

  function handleMarkCompleted() {
    if (!hasRideTimePassed(booking.bookingDate, booking.bookingTime)) {
      alert('This ride has not started yet. You can mark it complete after the scheduled time.');
      return;
    }
    updateBooking({ status: 'Completed' });
  }

  function handleRate(stars) {
    updateBooking({ rating: stars });
  }

  const canCancel =
    booking.status === 'Confirmed' && hoursUntil(booking.bookingDate, booking.bookingTime) >= 2;
  const canComplete =
    booking.status === 'Confirmed' && hasRideTimePassed(booking.bookingDate, booking.bookingTime);
  const canRate = booking.status === 'Completed' && !booking.rating;

  return (
    <section className="section">
      <div className="container details-wrap">
        <Link to="/my-bookings" className="back-link">&larr; Back to My Bookings</Link>

        <div className="card booking-details-card">
          <div className="booking-details-top">
            <div>
              <h1>{booking.evCarName}</h1>
              <p className="booking-details-id">Booking ID: {booking.id}</p>
            </div>
            <span className={`badge ${statusBadgeClass(booking.status)}`}>{booking.status}</span>
          </div>

          <div className="booking-details-grid">
            <div className="detail-item">
              <span>Customer</span>
              <strong>{booking.customerName}</strong>
            </div>
            <div className="detail-item">
              <span>Pickup</span>
              <strong>{booking.pickup}</strong>
            </div>
            <div className="detail-item">
              <span>Destination</span>
              <strong>{booking.destination}</strong>
            </div>
            <div className="detail-item">
              <span>Date</span>
              <strong>{booking.bookingDate}</strong>
            </div>
            <div className="detail-item">
              <span>Time</span>
              <strong>{booking.bookingTime}</strong>
            </div>
            <div className="detail-item">
              <span>Fare</span>
              <strong>&#8377;{booking.fare}</strong>
            </div>
            <div className="detail-item">
              <span>Payment Status</span>
              <strong>{booking.paymentStatus}</strong>
            </div>
            <div className="detail-item">
              <span>Booked On</span>
              <strong>{new Date(booking.createdAt).toLocaleDateString()}</strong>
            </div>
          </div>

          {booking.status === 'Completed' && booking.rating && (
            <div className="booking-details-rating">
              <span>Your rating</span>
              <StarRating value={booking.rating} readOnly />
            </div>
          )}

          {canRate && (
            <div className="booking-details-rating">
              <span>Rate this ride</span>
              <StarRating onRate={handleRate} />
            </div>
          )}

          <div className="booking-details-actions">
            {canCancel && (
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel Booking
              </button>
            )}
            {canComplete && (
              <button className="btn btn-primary" onClick={handleMarkCompleted}>
                Mark as Completed
              </button>
            )}
            {booking.status === 'Pending Payment' && (
              <Link to={`/payment/${booking.id}`} className="btn btn-primary">
                Complete Payment
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
