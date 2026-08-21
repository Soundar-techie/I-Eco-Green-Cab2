import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { statusBadgeClass } from '../utils/validation';
import EmptyState from '../components/EmptyState';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const bookings = storage.getBookings().filter((b) => b.userId === user.id);

  const sorted = [...bookings].sort(
    (a, b) => new Date(`${a.bookingDate}T${a.bookingTime}`) - new Date(`${b.bookingDate}T${b.bookingTime}`)
  );

  const now = new Date();
  const upcoming = sorted.find((b) => {
    const rideTime = new Date(`${b.bookingDate}T${b.bookingTime}`);
    return rideTime > now && (b.status === 'Confirmed' || b.status === 'Pending Payment');
  });

  const latest = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const recent = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      <section className="section dashboard-hero">
        <div className="container">
          <h1>Welcome back, {user.name.split(' ')[0]}</h1>
          <p>Here's a quick look at your rides with I Eco Green Cab.</p>
          <Link to="/book" className="btn btn-primary">Book an EV Cab</Link>
        </div>
      </section>

      <section className="section">
        <div className="container dashboard-grid">
          <div className="card dashboard-card">
            <h3>Upcoming Booking</h3>
            {upcoming ? (
              <div className="dashboard-booking-info">
                <strong>{upcoming.evCarName}</strong>
                <span>{upcoming.pickup} &rarr; {upcoming.destination}</span>
                <span>{upcoming.bookingDate} at {upcoming.bookingTime}</span>
                <span className={`badge ${statusBadgeClass(upcoming.status)}`}>
                  {upcoming.status}
                </span>
                <Link to={`/my-bookings/${upcoming.id}`} className="btn btn-outline">View Details</Link>
              </div>
            ) : (
              <EmptyState
                title="No upcoming rides"
                message="Book an EV cab and it'll show up here."
                actionLabel="Book a Cab"
                actionTo="/book"
              />
            )}
          </div>

          <div className="card dashboard-card">
            <h3>Latest Booking</h3>
            {latest ? (
              <div className="dashboard-booking-info">
                <strong>{latest.evCarName}</strong>
                <span>{latest.pickup} &rarr; {latest.destination}</span>
                <span>{latest.bookingDate} at {latest.bookingTime}</span>
                <span className={`badge ${statusBadgeClass(latest.status)}`}>
                  {latest.status}
                </span>
                <Link to={`/my-bookings/${latest.id}`} className="btn btn-outline">View Details</Link>
              </div>
            ) : (
              <EmptyState
                title="No bookings yet"
                message="Your most recent booking will appear here."
              />
            )}
          </div>

          <div className="card dashboard-card dashboard-nav-card">
            <h3>Quick Navigation</h3>
            <div className="dashboard-nav-links">
              <Link to="/book">Book a Cab</Link>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/ev-cars">EV Cars</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </div>

        <div className="dashboard-recent">
          <h3>Recent Booking History</h3>
          {recent.length === 0 ? (
            <EmptyState
              title="No booking history"
              message="Your ride history will show up here once you book."
              actionLabel="Book a Cab"
              actionTo="/book"
            />
          ) : (
            <div className="card recent-list">
              {recent.map((b) => (
                <Link to={`/my-bookings/${b.id}`} key={b.id} className="recent-row">
                  <div>
                    <strong>{b.evCarName}</strong>
                    <span>{b.pickup} &rarr; {b.destination}</span>
                  </div>
                  <div className="recent-row-right">
                    <span>{b.bookingDate}</span>
                    <span className={`badge ${statusBadgeClass(b.status)}`}>
                      {b.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
