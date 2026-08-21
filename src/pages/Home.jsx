import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "../components/effects/ParticleField";
import evCars from "../data/evCars";
import locations from "../data/locations";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();

  // Filter state for EV Fleet
  const [fleetFilter, setFleetFilter] = useState("all");

  // Quick Fare Estimator Widget State
  const [quickPickup, setQuickPickup] = useState("Erode Railway Station");
  const [quickDestination, setQuickDestination] = useState("Coimbatore");
  const [quickCarId, setQuickCarId] = useState("tata-nexon-ev");

  // Eco Calculator Slider State (KM)
  const [ecoDistance, setEcoDistance] = useState(65);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(0);

  // Counter animation refs
  const heroStatsRef = useRef(null);
  const heroContentRef = useRef(null);

  // Calculate live eco metrics
  const co2Saved = (ecoDistance * 0.142).toFixed(1);
  const fuelSaved = (ecoDistance * 0.082).toFixed(1);
  const moneySaved = Math.round(ecoDistance * 7.2);
  const treesEquiv = Math.max(1, Math.round(ecoDistance * 0.024));

  // Filter EV Cars
  const filteredCars = evCars.filter((car) => {
    if (fleetFilter === "all") return true;
    if (fleetFilter === "compact") return car.id.includes("tiago") || car.id.includes("astor") || car.id.includes("comet");
    if (fleetFilter === "suv") return car.id.includes("punch") || car.id.includes("nexon") || car.id.includes("xuv400");
    if (fleetFilter === "premium") return car.id.includes("byd") || car.id.includes("windsor") || car.id.includes("nexon");
    return true;
  });

  // Handle Quick Fare Estimator Submit
  const handleQuickBook = (e) => {
    e.preventDefault();
    navigate("/book", {
      state: {
        pickup: quickPickup,
        destination: quickDestination,
        carId: quickCarId,
      },
    });
  };

  // Route Quick Book
  const handleRouteBook = (pickup, destination) => {
    navigate("/book", {
      state: {
        pickup,
        destination,
      },
    });
  };

  // Mouse spotlight effect on glass cards
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // 3D Tilt on Hover for Fleet Cards
  const handleCardTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardTiltReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  // GSAP Animations on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements entrance
      gsap.fromTo(
        ".hero-anim-item",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Hero Widget entrance
      gsap.fromTo(
        ".hero-estimator-card",
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      // Scroll reveals for sections
      gsap.utils.toArray(".reveal-on-scroll").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const popularRoutes = [
    {
      from: "Erode Junction",
      to: "Coimbatore Airport / City",
      distance: "95 km",
      time: "~1 hr 50 min",
      tag: "Most Popular",
    },
    {
      from: "Erode Bus Stand",
      to: "Salem New Bus Stand",
      distance: "65 km",
      time: "~1 hr 20 min",
      tag: "Express Corridor",
    },
    {
      from: "Perundurai SIPCOT",
      to: "Tiruppur Textile Hub",
      distance: "48 km",
      time: "~55 min",
      tag: "Business Route",
    },
    {
      from: "Erode Central",
      to: "Bhavani Sangameshwarar",
      distance: "18 km",
      time: "~25 min",
      tag: "Local Short Ride",
    },
  ];

  const testimonials = [
    {
      name: "S. K. Ramachandran",
      location: "Erode to Coimbatore",
      comment: "Incredible ride! The Nexon EV was completely silent, air-conditioned, and spotlessly clean. The ₹50 flat fare is unbelievable value.",
      rating: 5,
      role: "Regular Commuter",
    },
    {
      name: "Dr. Ananya Natarajan",
      location: "Perundurai to Salem",
      comment: "Booking was effortless. Driver arrived 5 mins ahead of time. Travelling in a 100% zero-emission cab feels genuinely rewarding.",
      rating: 5,
      role: "Healthcare Professional",
    },
    {
      name: "Karthik Subramanian",
      location: "Erode to Tiruppur",
      comment: "Smooth acceleration and no engine vibrations. Best cab experience in Tamil Nadu by a long shot. Highly recommended!",
      rating: 5,
      role: "Textile Exporter",
    },
  ];

  const faqs = [
    {
      q: "How does the ₹50 flat fare work?",
      a: "Every booking starts with our simple flat fare of ₹50. There are no surge prices, no peak multipliers, and no hidden luggage or waiting fees.",
    },
    {
      q: "Which areas in Tamil Nadu do you cover?",
      a: "Our electric cabs are based in Erode and serve local trips (Bhavani, Perundurai, Gobi) as well as outstation trips anywhere in Tamil Nadu (Coimbatore, Salem, Tiruppur, Chennai, Madurai).",
    },
    {
      q: "What are your operating hours?",
      a: "Our cabs operate daily from 6:00 AM to 6:00 PM. You can book an immediate pickup or schedule rides in advance for future dates.",
    },
    {
      q: "Are the vehicles truly 100% electric?",
      a: "Yes! 100% of our fleet consists of modern electric vehicles (Tata Tiago EV, Punch EV, Nexon EV, MG Comet, MG Windsor, Mahindra XUV400, BYD Atto 3). Zero petrol, zero diesel, zero emissions.",
    },
  ];

  return (
    <div className="home-page-upgraded">
      {/* Dynamic ambient particle field */}
      <ParticleField />

      {/* Full Page Video & Gradient Background */}
      <div className="home-ambient-bg">
        <video
          className="home-ambient-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="home-ambient-overlay" />
        <div className="home-radial-glow top-left" />
        <div className="home-radial-glow bottom-right" />
      </div>

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section id="hero" className="hero-futuristic-section">
        <div className="home-main-container">
          <div className="hero-split-grid" ref={heroContentRef}>
            {/* Left Column: Hero Content */}
            <div className="hero-left-content">
              {/* Status Beacon */}
              <div className="hero-anim-item">
                <div className="hero-live-badge">
                  <span className="live-pulse-dot" />
                  <span className="live-badge-text">
                    ERODE, TAMIL NADU • 100% ELECTRIC FLEET
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="hero-anim-item hero-main-title">
                Electric Cabs for a
                <br />
                <span className="hero-neon-gradient">Quieter, Cleaner</span>
                <br />
                Tamil Nadu.
              </h1>

              {/* Subtitle */}
              <p className="hero-anim-item hero-subtitle">
                I Eco Green Cab runs an all-electric fleet out of Erode,
                delivering premium, emission-free transportation anywhere across
                Tamil Nadu. Zero fuel, zero noise — booked in 60 seconds.
              </p>

              {/* Action Buttons */}
              <div className="hero-anim-item hero-cta-group">
                <Link to="/book" className="hero-btn-primary">
                  <span>Book Your EV Ride</span>
                  <span className="btn-arrow-icon">→</span>
                </Link>

                <a href="#fleet-showcase" className="hero-btn-glass">
                  <span>Explore 7 EV Models</span>
                  <span className="btn-dot-indicator" />
                </a>
              </div>

              {/* Live Animated Statistics */}
              <div className="hero-anim-item hero-stats-ribbon" ref={heroStatsRef}>
                <div className="stat-item">
                  <div className="stat-number">
                    ₹50
                  </div>
                  <div className="stat-label">Flat Fare Base</div>
                </div>

                <div className="stat-separator" />

                <div className="stat-item">
                  <div className="stat-number">
                    7
                  </div>
                  <div className="stat-label">EV Fleet Models</div>
                </div>

                <div className="stat-separator" />

                <div className="stat-item">
                  <div className="stat-number">
                    100%
                  </div>
                  <div className="stat-label">Zero Emissions</div>
                </div>

                <div className="stat-separator" />

                <div className="stat-item">
                  <div className="stat-number">
                    25k+
                  </div>
                  <div className="stat-label">Clean KMs in TN</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quick Fare Estimator Widget */}
            <div className="hero-right-widget">
              <div className="hero-estimator-card" onMouseMove={handleMouseMove}>
                <div className="estimator-glow" />
                <div className="estimator-header">
                  <div className="estimator-badge">
                    <span className="badge-bolt">⚡</span>
                    <span>INSTANT EV DISPATCH</span>
                  </div>
                  <h3>Quick Cab Estimator</h3>
                  <p>Calculate your route and reserve in 1 click</p>
                </div>

                <form className="estimator-form" onSubmit={handleQuickBook}>
                  {/* Pickup Dropdown */}
                  <div className="estimator-input-group">
                    <label>
                      <span className="input-icon">📍</span> Pickup Location
                    </label>
                    <select
                      value={quickPickup}
                      onChange={(e) => setQuickPickup(e.target.value)}
                    >
                      {locations.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Destination Dropdown */}
                  <div className="estimator-input-group">
                    <label>
                      <span className="input-icon">🏁</span> Destination (Anywhere in TN)
                    </label>
                    <select
                      value={quickDestination}
                      onChange={(e) => setQuickDestination(e.target.value)}
                    >
                      {locations
                        .filter((loc) => loc.name !== quickPickup)
                        .map((loc) => (
                          <option key={loc.name} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Vehicle Model Dropdown */}
                  <div className="estimator-input-group">
                    <label>
                      <span className="input-icon">🚘</span> Select EV Model
                    </label>
                    <select
                      value={quickCarId}
                      onChange={(e) => setQuickCarId(e.target.value)}
                    >
                      {evCars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.name} ({car.seats} Seats • {car.range})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fare & Eco Preview Box */}
                  <div className="estimator-fare-box">
                    <div className="fare-preview-left">
                      <span className="fare-tag">Flat Fare Guarantee</span>
                      <strong className="fare-value">₹50</strong>
                    </div>
                    <div className="fare-preview-right">
                      <span className="eco-pill">🍃 0g CO₂ / km</span>
                      <span className="availability-status">● Instant Pickup</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="estimator-submit-btn">
                    <span>Reserve Ride Now</span>
                    <span className="btn-bolt-icon">⚡</span>
                  </button>
                </form>

                <div className="estimator-footer-note">
                  <span>🔒 No Surge Pricing</span>
                  <span>•</span>
                  <span>🛡️ Verified Eco Drivers</span>
                  <span>•</span>
                  <span>⏰ 6 AM – 6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY CHOOSE I ECO GREEN CAB (Spotlight Glass Cards)
          ========================================================================= */}
      <section id="why-us" className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="section-title-wrap text-center">
            <span className="neon-eyebrow">WHY I ECO GREEN CAB</span>
            <h2 className="section-title-h2">
              Engineered for comfort.
              <br />
              <span className="hero-neon-gradient">Built for the future.</span>
            </h2>
            <p className="section-subtitle-p">
              Every ride is emission-free, whisper-quiet, and backed by a transparent flat pricing model.
            </p>
          </div>

          <div className="features-glass-grid">
            <div
              className="feature-spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <div className="card-ambient-glow" />
              <div className="feature-icon-wrapper">
                <span className="feature-icon">⚡</span>
                <span className="feature-num">01</span>
              </div>
              <h3>100% Pure Electric</h3>
              <p>
                Zero tailpipe emissions and zero fumes. Help protect Tamil Nadu’s
                air quality with every single kilometer travelled.
              </p>
              <div className="feature-badge">Zero Carbon</div>
            </div>

            <div
              className="feature-spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <div className="card-ambient-glow" />
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🏷️</span>
                <span className="feature-num">02</span>
              </div>
              <h3>Flat ₹50 Pricing</h3>
              <p>
                Transparent, honest fare structure with no peak-hour surges or
                hidden surcharge spikes. You always know what you pay.
              </p>
              <div className="feature-badge">No Surges</div>
            </div>

            <div
              className="feature-spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <div className="card-ambient-glow" />
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🌿</span>
                <span className="feature-num">03</span>
              </div>
              <h3>Whisper-Quiet Cabins</h3>
              <p>
                Electric powertrains eliminate noisy engine rumbles and vibration,
                giving you a serene, lounge-like ride across city and state.
              </p>
              <div className="feature-badge">Silent Ride</div>
            </div>

            <div
              className="feature-spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <div className="card-ambient-glow" />
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📍</span>
                <span className="feature-num">04</span>
              </div>
              <h3>Statewide Coverage</h3>
              <p>
                Based in Erode with service stretching across Coimbatore, Salem,
                Tiruppur, and all major corridors in Tamil Nadu.
              </p>
              <div className="feature-badge">Tamil Nadu Wide</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE FLEET SHOWCASE (Filter Tabs & 3D Tilt Cards)
          ========================================================================= */}
      <section id="fleet-showcase" className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="fleet-header-flex">
            <div>
              <span className="neon-eyebrow">OUR ELECTRIC FLEET</span>
              <h2 className="section-title-h2">
                Meet Tamil Nadu’s
                <br />
                <span className="hero-neon-gradient">Green Fleet Family.</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="fleet-filter-tabs">
              <button
                className={`filter-tab-btn ${fleetFilter === "all" ? "active" : ""}`}
                onClick={() => setFleetFilter("all")}
              >
                All Models ({evCars.length})
              </button>
              <button
                className={`filter-tab-btn ${fleetFilter === "compact" ? "active" : ""}`}
                onClick={() => setFleetFilter("compact")}
              >
                City Compact
              </button>
              <button
                className={`filter-tab-btn ${fleetFilter === "suv" ? "active" : ""}`}
                onClick={() => setFleetFilter("suv")}
              >
                Electric SUVs
              </button>
              <button
                className={`filter-tab-btn ${fleetFilter === "premium" ? "active" : ""}`}
                onClick={() => setFleetFilter("premium")}
              >
                Long Range
              </button>
            </div>
          </div>

          {/* Cards Grid with 3D Tilt */}
          <div className="interactive-fleet-grid">
            {filteredCars.map((car, index) => (
              <div
                key={car.id}
                className="interactive-car-card"
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardTiltReset}
              >
                <div className="car-card-glass-glow" />

                {/* Top Badge and Counter */}
                <div className="car-card-top-row">
                  <span className="car-index-tag">#{String(index + 1).padStart(2, "0")}</span>
                  <span className="car-rating-tag">★ {car.rating}</span>
                </div>

                {/* Vehicle Image with Floating Glow */}
                <div className="car-visual-container">
                  <div className="car-under-glow" />
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-showcase-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/assets/cars/home-bg.png";
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="car-card-details">
                  <div className="car-title-row">
                    <h3>{car.name}</h3>
                    <span className="ev-badge">100% EV</span>
                  </div>

                  <p className="car-tagline-text">{car.tagline}</p>

                  {/* Specs Quick Chips */}
                  <div className="car-specs-ribbon">
                    <div className="spec-chip">
                      <span className="spec-icon">⚡</span>
                      <span>{car.battery.split(" ")[0]} kWh</span>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-icon">🛣️</span>
                      <span>{car.range.split(" ")[2] || "315"} km</span>
                    </div>
                    <div className="spec-chip">
                      <span className="spec-icon">👥</span>
                      <span>{car.seats} Seats</span>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="car-card-bottom-action">
                    <div className="car-fare-block">
                      <span className="fare-mini-label">Flat Fare</span>
                      <strong className="fare-big-price">₹{car.fare}</strong>
                    </div>

                    <div className="car-btn-group">
                      <Link
                        to={`/ev-cars/${car.id}`}
                        className="car-details-btn"
                      >
                        Specs
                      </Link>
                      <Link
                        to="/book"
                        state={{ carId: car.id }}
                        className="car-book-btn"
                      >
                        <span>Book</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE ECO-IMPACT CALCULATOR
          ========================================================================= */}
      <section className="eco-calculator-section reveal-on-scroll">
        <div className="home-main-container">
          <div className="eco-calculator-card" onMouseMove={handleMouseMove}>
            <div className="eco-card-ambient" />

            <div className="eco-card-content">
              <div className="eco-left-info">
                <span className="neon-eyebrow">INTERACTIVE GREEN FOOTPRINT</span>
                <h2>
                  See How Much Pollution
                  <br />
                  <span className="hero-neon-gradient">Your Ride Prevents.</span>
                </h2>
                <p>
                  Every ride taken in an I Eco Green Cab directly stops harmful
                  CO2 emissions and diesel soot from entering Tamil Nadu’s atmosphere.
                </p>

                {/* Distance Slider Control */}
                <div className="slider-control-box">
                  <div className="slider-label-row">
                    <span className="slider-label">Estimated Trip Distance</span>
                    <strong className="slider-distance-display">{ecoDistance} km</strong>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="250"
                    step="5"
                    value={ecoDistance}
                    onChange={(e) => setEcoDistance(Number(e.target.value))}
                    className="eco-range-slider"
                  />

                  <div className="slider-scale-row">
                    <span>5 km (Local)</span>
                    <span>65 km (Salem)</span>
                    <span>95 km (CBE)</span>
                    <span>250 km (Outstation)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Display Grid */}
              <div className="eco-metrics-grid">
                <div className="metric-box">
                  <span className="metric-icon">🌳</span>
                  <strong className="metric-value">{co2Saved} kg</strong>
                  <span className="metric-title">CO₂ Prevented</span>
                  <span className="metric-note">Zero tailpipe greenhouse gas</span>
                </div>

                <div className="metric-box">
                  <span className="metric-icon">⛽</span>
                  <strong className="metric-value">{fuelSaved} L</strong>
                  <span className="metric-title">Fuel Saved</span>
                  <span className="metric-note">Clean electric energy</span>
                </div>

                <div className="metric-box">
                  <span className="metric-icon">💰</span>
                  <strong className="metric-value">₹{moneySaved}</strong>
                  <span className="metric-title">Cost Saved</span>
                  <span className="metric-note">vs Standard Diesel Taxi</span>
                </div>

                <div className="metric-box">
                  <span className="metric-icon">🌲</span>
                  <strong className="metric-value">{treesEquiv}</strong>
                  <span className="metric-title">Trees Equivalent</span>
                  <span className="metric-note">Annual carbon absorption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: POPULAR TAMIL NADU GREEN ROUTES
          ========================================================================= */}
      <section className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="section-title-wrap text-center">
            <span className="neon-eyebrow">POPULAR GREEN CORRIDORS</span>
            <h2 className="section-title-h2">
              Frequent Routes from Erode
              <br />
              <span className="hero-neon-gradient">Across Tamil Nadu.</span>
            </h2>
            <p className="section-subtitle-p">
              Fixed flat base fare, whisper quiet express highways, and zero fuel halts.
            </p>
          </div>

          <div className="routes-card-grid">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="route-glass-card"
                onMouseMove={handleMouseMove}
              >
                <div className="card-ambient-glow" />
                <div className="route-header">
                  <span className="route-tag-pill">{route.tag}</span>
                  <span className="route-flat-pill">₹50 Flat Fare</span>
                </div>

                <div className="route-path-visual">
                  <div className="route-stop">
                    <span className="stop-marker pickup" />
                    <div>
                      <span className="stop-label">From</span>
                      <strong>{route.from}</strong>
                    </div>
                  </div>

                  <div className="route-connector-line">
                    <span className="line-pulse-beam" />
                  </div>

                  <div className="route-stop">
                    <span className="stop-marker drop" />
                    <div>
                      <span className="stop-label">To</span>
                      <strong>{route.to}</strong>
                    </div>
                  </div>
                </div>

                <div className="route-footer">
                  <div className="route-metrics">
                    <span>🛣️ {route.distance}</span>
                    <span>⏱️ {route.time}</span>
                  </div>

                  <button
                    onClick={() => handleRouteBook(route.from, route.to)}
                    className="route-book-trigger"
                  >
                    <span>Book Route</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SERVICES SPECTRUM
          ========================================================================= */}
      <section id="services" className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="section-title-wrap text-center">
            <span className="neon-eyebrow">OUR EV SERVICES</span>
            <h2 className="section-title-h2">
              Smart Electric Solutions
              <br />
              <span className="hero-neon-gradient">For Every Travel Need.</span>
            </h2>
          </div>

          <div className="services-modern-grid">
            <div className="service-glass-card" onMouseMove={handleMouseMove}>
              <div className="card-ambient-glow" />
              <div className="service-icon-box">⚡</div>
              <h3>Instant EV Booking</h3>
              <p>
                Get picked up in minutes anywhere in Erode and surrounding
                towns with our live dispatch fleet.
              </p>
              <Link to="/book" className="service-action-link">
                <span>Book Instant Cab</span>
                <span>→</span>
              </Link>
            </div>

            <div className="service-glass-card" onMouseMove={handleMouseMove}>
              <div className="card-ambient-glow" />
              <div className="service-icon-box">🛣️</div>
              <h3>Statewide Outstation</h3>
              <p>
                Long-range electric journeys to Coimbatore, Salem, Madurai,
                Tiruppur, and Chennai in spacious modern EVs.
              </p>
              <Link to="/book" className="service-action-link">
                <span>Plan Outstation</span>
                <span>→</span>
              </Link>
            </div>

            <div className="service-glass-card" onMouseMove={handleMouseMove}>
              <div className="card-ambient-glow" />
              <div className="service-icon-box">📅</div>
              <h3>Scheduled Rides</h3>
              <p>
                Reserve in advance for early morning hospital visits, railway
                station drops, and important business meetings.
              </p>
              <Link to="/book" className="service-action-link">
                <span>Schedule A Ride</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TESTIMONIALS & PASSENGER EXPERIENCES
          ========================================================================= */}
      <section className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="section-title-wrap text-center">
            <span className="neon-eyebrow">COMMUNITY EXPERIENCES</span>
            <h2 className="section-title-h2">
              Loved by Riders
              <br />
              <span className="hero-neon-gradient">Across Tamil Nadu.</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="testimonial-glass-card"
                onMouseMove={handleMouseMove}
              >
                <div className="card-ambient-glow" />
                <div className="testimonial-stars">
                  {"★".repeat(t.rating)}
                </div>
                <p className="testimonial-quote">"{t.comment}"</p>

                <div className="testimonial-author">
                  <div className="author-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role} • {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQ ACCORDION
          ========================================================================= */}
      <section className="content-section-modern reveal-on-scroll">
        <div className="home-main-container">
          <div className="section-title-wrap text-center">
            <span className="neon-eyebrow">COMMON QUESTIONS</span>
            <h2 className="section-title-h2">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="faq-accordion-wrap">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item-card ${activeFaq === index ? "open" : ""}`}
                onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
              >
                <div className="faq-question-row">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer-row">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: HIGH-VOLTAGE CALL TO ACTION (CTA BANNER)
          ========================================================================= */}
      <section className="cta-banner-section reveal-on-scroll">
        <div className="home-main-container">
          <div className="cta-banner-card" onMouseMove={handleMouseMove}>
            <div className="cta-banner-glow" />
            <div className="cta-banner-inner">
              <span className="neon-eyebrow">READY TO TRAVEL GREEN?</span>
              <h2>
                Your Next Ride Should Be
                <br />
                <span className="hero-neon-gradient">100% Electric.</span>
              </h2>
              <p>
                Book your EV cab from Erode in 60 seconds and experience the quietest,
                cleanest way to travel across Tamil Nadu. Flat ₹50 fare.
              </p>

              <div className="cta-action-buttons">
                <Link to="/book" className="hero-btn-primary">
                  <span>Book a Cab Now</span>
                  <span className="btn-arrow-icon">→</span>
                </Link>
                <Link to="/contact" className="hero-btn-glass">
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;