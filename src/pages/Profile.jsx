import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, isValidPhone } from '../utils/validation';
import './Profile.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.phone) newErrors.phone = 'Phone number is required.';
    else if (!isValidPhone(form.phone)) newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!validate()) return;
    updateProfile(form);
    setEditing(false);
    setSaved(true);
  }

  function handleCancel() {
    setForm({ name: user.name, email: user.email, phone: user.phone });
    setErrors({});
    setEditing(false);
  }

  return (
    <div>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account details.</p>
      </div>

      <section className="section">
        <div className="container profile-wrap">
          <div className="card profile-card">
            {saved && <div className="profile-saved-note">Your profile has been updated.</div>}

            <form onSubmit={handleSave}>
              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editing}
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
                  disabled={!editing}
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
                {errors.phone && <div className="field-error">{errors.phone}</div>}
              </div>

              {editing ? (
                <div className="profile-actions">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-outline" onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn btn-outline" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
