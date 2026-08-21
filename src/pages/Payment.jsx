import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingSummary from '../components/BookingSummary';
import EmptyState from '../components/EmptyState';
import { storage } from '../utils/storage';
import './Payment.css';

// This is a DEMO payment flow only. No real payment gateway (Razorpay
// or otherwise) is called here - we just simulate a short processing
// delay and then mark the booking as paid. The structure is kept
// simple on purpose so a real gateway can be dropped in later.

export default function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(storage.getBookings());
  const [processing, setProcessing] = useState(false);

  const booking = bookings.find((b) => b.id === bookingId);

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

  if (booking.paymentStatus === 'Paid') {
    navigate(`/booking-confirmation/${booking.id}`);
    return null;
  }

  function handlePay() {
    setProcessing(true);

    // Simulated processing delay - a real integration would replace
    // this timeout with the payment gateway's callback.
    setTimeout(() => {
      const allBookings = storage.getBookings();
      const updated = allBookings.map((b) =>
        b.id === booking.id
          ? { ...b, paymentStatus: 'Paid', status: 'Confirmed' }
          : b
      );
      storage.saveBookings(updated);
      setBookings(updated);
      setProcessing(false);
      navigate(`/booking-confirmation/${booking.id}`);
    }, 1600);
  }

  return (
    <div>
      <div className="page-header">
        <h1>Payment</h1>
        <p>Demo Payment - no real transaction will be processed.</p>
      </div>

      <section className="section">
        <div className="container payment-layout">
          <BookingSummary booking={booking} />

          <div className="card payment-panel">
            <div className="demo-tag">Demo Payment</div>
            <h3>Complete your payment</h3>
            <p>
              This is a simulated payment for demo purposes only. No real
              money will be charged and no live gateway is involved.
            </p>

            <button
              className="btn btn-primary btn-block pay-btn"
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? 'Processing Payment...' : `Pay \u20B9${booking.fare}`}
            </button>

            {processing && (
              <div className="processing-note">
                <div className="loading-spinner" />
                <span>Please wait, confirming your demo payment...</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
