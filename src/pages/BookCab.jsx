import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import evCars from '../data/evCars';
import locations from '../data/locations';
import LocationSearch from '../components/LocationSearch';
import MapView from '../components/MapView';
import { storage, generateId } from '../utils/storage';
import {
  isWithinOperatingHours,
  isDateTimeInFuture,
  todayDateString,
} from '../utils/validation';
import './BookCab.css';

export default function BookCab() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const preselectedCarId = location.state?.carId || '';
  const preselectedPickup = location.state?.pickup || '';
  const preselectedDest = location.state?.destination || '';

  const initialPickupLoc = locations.find((l) => l.name === preselectedPickup) || { name: preselectedPickup, lat: null, lng: null };
  const initialDestLoc = locations.find((l) => l.name === preselectedDest) || { name: preselectedDest, lat: null, lng: null };

  const [pickup, setPickup] = useState(initialPickupLoc);
  const [destination, setDestination] = useState(initialDestLoc);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [carId, setCarId] = useState(preselectedCarId);
  const [errors, setErrors] = useState({});

  const selectedCar = evCars.find((c) => c.id === carId);

  function validate() {
    const newErrors = {};

    if (!pickup.name.trim()) newErrors.pickup = 'Pickup location is required.';
    if (!destination.name.trim()) newErrors.destination = 'Destination is required.';
    if (!date) newErrors.date = 'Please select a date.';
    if (!time) newErrors.time = 'Please select a time.';
    if (!carId) newErrors.car = 'Please select an EV.';

    if (date && date < todayDateString()) {
      newErrors.date = 'Date cannot be in the past.';
    }

    if (date && time) {
      if (!isWithinOperatingHours(time)) {
        newErrors.time = 'We operate only between 6:00 AM and 6:00 PM.';
      } else if (!isDateTimeInFuture(date, time)) {
        newErrors.time = 'Selected time has already passed today.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      id: generateId('booking'),
      userId: user.id,
      customerName: user.name,
      pickup: pickup.name,
      destination: destination.name,
      bookingDate: date,
      bookingTime: time,
      evCarId: selectedCar.id,
      evCarName: selectedCar.name,
      fare: selectedCar.fare,
      status: 'Pending Payment',
      paymentStatus: 'Unpaid',
      rating: null,
      createdAt: new Date().toISOString(),
    };

    const bookings = storage.getBookings();
    storage.saveBookings([...bookings, booking]);

    navigate(`/payment/${booking.id}`);
  }

  return (
    <div
      className="book-page"
      style={{ backgroundImage: "linear-gradient(rgba(20, 70, 32, 0.9), rgba(64, 76, 67, 0.96)), url('/assets/cars/home-bg.png')" }}
    >
      <div className="page-header">
        <h1>Book a Cab</h1>
        <p>Pickup and destination can be anywhere in Tamil Nadu. Rides run 6:00 AM - 6:00 PM.</p>
      </div>

      <section className="section">
        <div className="container book-layout">
          <form className="book-form" onSubmit={handleConfirm} noValidate>
            <div className="card book-form-card">
              <h3>Trip Details</h3>

              <LocationSearch
                label="Pickup Location"
                value={pickup.name}
                onChange={setPickup}
                placeholder="e.g. Erode Railway Station"
              />
              {errors.pickup && <div className="field-error">{errors.pickup}</div>}

              <LocationSearch
                label="Destination"
                value={destination.name}
                onChange={setDestination}
                placeholder="e.g. Coimbatore"
              />
              {errors.destination && <div className="field-error">{errors.destination}</div>}

              <MapView pickup={pickup} destination={destination} />

              <div className="book-form-row">
                <div className="form-field">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    min={todayDateString()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {errors.date && <div className="field-error">{errors.date}</div>}
                </div>

                <div className="form-field">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  {errors.time && <div className="field-error">{errors.time}</div>}
                  <span className="field-hint">Operating hours: 6:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="card book-form-card">
              <h3>Choose Your EV</h3>
              {errors.car && <div className="field-error">{errors.car}</div>}

              <div className="car-select-grid">
                {evCars.map((car) => (
                  <button
                    type="button"
                    key={car.id}
                    className={`car-select-option ${carId === car.id ? 'selected' : ''}`}
                    onClick={() => setCarId(car.id)}
                  >
                    <img src={car.image} alt={car.name} onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
                    <div>
                      <strong>{car.name}</strong>
                      <span>{car.seats} seats &middot; &#8377;{car.fare}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>


          </form>

          <aside className="book-sidebar">
            <div className="card book-summary-card">
              <h3>Trip Summary</h3>
              <div className="summary-row">
                <span>Pickup</span>
                <strong>{pickup.name || '-'}</strong>
              </div>
              <div className="summary-row">
                <span>Destination</span>
                <strong>{destination.name || '-'}</strong>
              </div>
              <div className="summary-row">
                <span>Date</span>
                <strong>{date || '-'}</strong>
              </div>
              <div className="summary-row">
                <span>Time</span>
                <strong>{time || '-'}</strong>
              </div>
              <div className="summary-row">
                <span>EV</span>
                <strong>{selectedCar ? selectedCar.name : '-'}</strong>
              </div>
              <div className="summary-fare">
                <span>Fare</span>
                <span className="summary-fare-amount">&#8377;{selectedCar ? selectedCar.fare : 50}</span>
              </div>
            </div>
          </aside>
          
          <button type="submit" className="btn btn-primary btn-block book-submit">
            Continue to Confirm &amp; Pay
          </button>
        </div>
      </section>
    </div>
  );
}
