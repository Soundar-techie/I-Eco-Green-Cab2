import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import SmoothScroll from './components/animation/SmoothScroll';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import EVCars from './pages/EVCars';
import EVCarDetails from './pages/EVCarDetails';
import BookCab from './pages/BookCab';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <SmoothScroll />
      <Navbar />
      <main>
        <div className="route-view" key={location.pathname}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ev-cars" element={<EVCars />} />
          <Route path="/ev-cars/:carId" element={<EVCarDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookCab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings/:bookingId"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:bookingId"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation/:bookingId"
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />
          </Routes>
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
