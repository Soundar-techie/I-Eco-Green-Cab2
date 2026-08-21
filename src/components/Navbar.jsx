import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  // const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const linksRef = useRef(null);

  // Navbar compacts and gains a solid glass background once the page
  // has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stagger the mobile menu links in on open instead of popping them all
  // in at once.
  useEffect(() => {
    if (!menuOpen || !linksRef.current) return;
    const items = linksRef.current.querySelectorAll(':scope > *');
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.045, ease: 'power2.out' }
    );
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setProfileOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate('/');
  }

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-mark" />
          I Eco Green Cab
        </NavLink>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav ref={linksRef} className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          <NavLink to="/ev-cars" onClick={closeMenu}>EV Cars</NavLink>
          <NavLink to="/book" onClick={closeMenu}>Book a Cab</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

          <div className="navbar-divider" />

          {user ? (
            <div className="profile-menu">
              <button
                type="button"
                className="profile-trigger"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label={`Open account menu for ${user.name}`}
                onClick={() => setProfileOpen((open) => !open)}
              >
                <span className="profile-avatar" aria-hidden="true">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="profile-trigger-name">{user.name}</span>
                {/* <span className="profile-chevron" aria-hidden="true">⌄</span> */}
              </button>

              <div className="profile-container" ref={profileRef}>

                <div
                  className={`profile-dropdown ${profileOpen ? 'open' : ''}`}
                  role="menu"
                >
                  <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/settings"
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Settings
                  </NavLink>

                  <button
                    type="button"
                    className="navbar-logout"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/register" className="navbar-cta" onClick={closeMenu}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
