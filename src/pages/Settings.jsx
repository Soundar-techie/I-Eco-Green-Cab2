import React from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences.</p>
      </div>

      <section className="section">
        <div className="container settings-wrap">
          <div className="card settings-card">
            <h2>Account Settings</h2>
            <p>Your account is ready for bookings across Tamil Nadu.</p>
            <div className="settings-row">
              <div>
                <strong>Profile details</strong>
                <span>Update your name, email, or phone number.</span>
              </div>
              <Link className="btn btn-outline" to="/profile">Open Profile</Link>
            </div>
            <div className="settings-row">
              <div>
                <strong>Booking history</strong>
                <span>Review your previous and upcoming rides.</span>
              </div>
              <Link className="btn btn-outline" to="/my-bookings">View Bookings</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
