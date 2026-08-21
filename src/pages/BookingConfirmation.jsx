import React, { useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { storage } from '../utils/storage';
import { statusBadgeClass } from '../utils/validation';
import EmptyState from '../components/EmptyState';
import { prefersReducedMotion } from '../utils/motionPrefs';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const bookings = storage.getBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (!booking || prefersReducedMotion() || !cardRef.current) return undefined;

    const ctx = gsap.context(() => {
      const icon = cardRef.current.querySelector('.confirmation-icon');
      const rows = cardRef.current.querySelectorAll('.confirmation-row');
      const actions = cardRef.current.querySelector('.confirmation-actions');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(cardRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(icon, { scale: 0, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(1.8)' }, '-=0.25')
        .fromTo(rows, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, '-=0.15')
        .fromTo(actions?.children || [], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.1');
    }, cardRef);

    return () => ctx.revert();
  }, [booking]);

  if (!booking) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title="Booking not found"
            message="We couldn't find this booking."
            actionLabel="Go to My Bookings"
            actionTo="/my-bookings"
          />
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container confirmation-wrap">
        <div className="card confirmation-card">
          <div className="confirmation-icon">&#10003;</div>
          <h1>Booking Confirmed</h1>
          <p>Your EV cab has been booked successfully.</p>

          <div className="confirmation-id">Booking ID: {booking.id}</div>

          <div className="confirmation-details">
            <div className="confirmation-row">
              <span>Customer</span>
              <strong>{booking.customerName}</strong>
            </div>
            <div className="confirmation-row">
              <span>Pickup</span>
              <strong>{booking.pickup}</strong>
            </div>
            <div className="confirmation-row">
              <span>Destination</span>
              <strong>{booking.destination}</strong>
            </div>
            <div className="confirmation-row">
              <span>EV Model</span>
              <strong>{booking.evCarName}</strong>
            </div>
            <div className="confirmation-row">
              <span>Date</span>
              <strong>{booking.bookingDate}</strong>
            </div>
            <div className="confirmation-row">
              <span>Time</span>
              <strong>{booking.bookingTime}</strong>
            </div>
            <div className="confirmation-row">
              <span>Fare</span>
              <strong>&#8377;{booking.fare}</strong>
            </div>
            <div className="confirmation-row">
              <span>Payment Status</span>
              <strong className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-confirmed' : 'badge-pending'}`}>{booking.paymentStatus}</strong>
            </div>
            <div className="confirmation-row">
              <span>Booking Status</span>
              <strong className={`badge ${statusBadgeClass(booking.status)}`}>{booking.status}</strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
            <Link to="/" className="btn btn-outline">Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
