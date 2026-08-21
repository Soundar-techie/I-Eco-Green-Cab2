// Small wrapper around localStorage so the rest of the app doesn't
// need to deal with JSON.parse/stringify or missing keys everywhere.

const KEYS = {
  USERS: 'iecogreen_users',
  CURRENT_USER: 'iecogreen_current_user',
  BOOKINGS: 'iecogreen_bookings',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error('Could not read from localStorage', key, err);
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getUsers: () => read(KEYS.USERS, []),
  saveUsers: (users) => write(KEYS.USERS, users),

  getCurrentUser: () => read(KEYS.CURRENT_USER, null),
  setCurrentUser: (user) => write(KEYS.CURRENT_USER, user),
  clearCurrentUser: () => localStorage.removeItem(KEYS.CURRENT_USER),

  getBookings: () => read(KEYS.BOOKINGS, []),
  saveBookings: (bookings) => write(KEYS.BOOKINGS, bookings),
};

export function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}
