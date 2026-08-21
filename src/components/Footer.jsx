import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark" />
            I Eco Green Cab
          </div>
          <p>
            EV-only cab rides across Tamil Nadu, based out of Erode.
            Quiet, clean and comfortable travel - powered by electricity,
            not petrol or diesel.
          </p>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/ev-cars">EV Cars</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h4>Get Started</h4>
          <Link to="/book">Book a Cab</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-links">
          <h4>Reach Us</h4>
          <p className="footer-contact">Erode, Tamil Nadu, India</p>
          <p className="footer-contact">+91 98XXX XXXXX</p>
          <p className="footer-contact">support@iecogreencab.in</p>
          <p className="footer-contact">Daily, 6:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          &copy; {year} I Eco Green Cab. All rides, zero tailpipe emissions.
        </div>
      </div>
    </footer>
  );
}
