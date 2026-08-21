import React, { useState } from 'react';
import { isValidEmail } from '../utils/validation';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.message.trim()) newErrors.message = 'Please enter a message.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // No backend is connected - this only shows a frontend success
    // message. No email is actually sent.
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Questions about a ride or our service? Reach out - we're happy to help.</p>
      </div>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-label">Company</span>
              <strong>I Eco Green Cab</strong>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Location</span>
              <strong>Erode, Tamil Nadu, India</strong>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Phone</span>
              <strong>+91 98XXX XXXXX</strong>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <strong>support@iecogreencab.in</strong>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Business Hours</span>
              <strong>Daily, 6:00 AM - 6:00 PM</strong>
            </div>
          </div>

          <div className="card contact-form-card">
            <h3>Send us a message</h3>

            {submitted && (
              <div className="contact-success">
                Thanks - your message has been noted. This is a demo form,
                so no email was actually sent.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                />
                {errors.message && <div className="field-error">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary btn-block">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
