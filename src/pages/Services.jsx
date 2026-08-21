import React from 'react';
import { Link } from 'react-router-dom';
import './StaticPage.css';

const services = [
  {
    icon: '\u26A1',
    title: 'EV Cab Booking',
    text: 'Book any of our 7 electric models in a couple of minutes, for pickup anywhere in Tamil Nadu.',
  },
  {
    icon: '\u{1F3D9}',
    title: 'Local Travel',
    text: 'Quick, quiet rides within Erode and neighbouring towns for everyday travel.',
  },
  {
    icon: '\u{1F6E3}',
    title: 'Outstation Travel',
    text: 'Heading to Coimbatore, Salem, or further? Book an EV for longer trips across the state.',
  },
  {
    icon: '\u{1F4C5}',
    title: 'Scheduled Rides',
    text: 'Plan ahead - pick any future date and time and we\'ll have the car ready at your pickup point.',
  },
  {
    icon: '\u{1F6CB}',
    title: 'Comfortable EV Travel',
    text: 'Every car in our fleet is a modern EV with a quiet cabin, so long rides stay relaxed.',
  },
];

export default function Services() {
  return (
    <div
      style={{ backgroundImage: "linear-gradient(rgba(53, 64, 55, 0.9), rgba(246, 250, 247, 0.96)), url('/assets/cars/home-bg.png')" }}

    >
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Everything we offer runs on electricity - here's what you can book with us.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-list-grid">
            {services.map((s) => (
              <div key={s.title} className="service-item card">
                <div className="service-item-icon">{s.icon}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-wrap" style={{ marginTop: '40px' }}>
            <Link to="/book" className="btn btn-primary">Book an EV Cab</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
