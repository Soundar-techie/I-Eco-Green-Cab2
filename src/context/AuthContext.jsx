import React, { createContext, useContext, useState } from 'react';
import { storage, generateId } from '../utils/storage';

// Demo-only authentication. Passwords are stored in plain text in
// localStorage, which is fine for a frontend prototype but should
// never be done in a real product - a real backend with proper
// hashing (bcrypt etc.) would replace this entirely.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getCurrentUser());

  function register({ name, email, phone, password }) {
    const users = storage.getUsers();
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: generateId('user'),
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    };

    storage.saveUsers([...users, newUser]);
    const { password: _pw, ...safeUser } = newUser;
    storage.setCurrentUser(safeUser);
    setUser(safeUser);
    return { success: true };
  }

  function login({ email, password }) {
    const users = storage.getUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { success: false, error: 'Incorrect email or password.' };
    }
    const { password: _pw, ...safeUser } = match;
    storage.setCurrentUser(safeUser);
    setUser(safeUser);
    return { success: true };
  }

  function logout() {
    storage.clearCurrentUser();
    setUser(null);
  }

  function updateProfile(updates) {
    const users = storage.getUsers();
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u
    );
    storage.saveUsers(updatedUsers);
    const updatedUser = { ...user, ...updates };
    storage.setCurrentUser(updatedUser);
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
