
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import evCars from '../data/evCars';
import EVCard from '../components/EVCard';
import ChatAssistant from '../components/ChatAssistant';
import './Home.css';
const whyEv = [
  { title: 'Zero Tailpipe Emissions', text: 'Every trip runs on electricity, not petrol or diesel - cleaner air for Erode and the towns we serve.' },
  { title: 'Quieter Rides', text: 'No engine noise, no vibration - just a smooth, calm cabin for the whole journey.' },
  { title: 'Lower Running Cost', text: 'EVs cost less to run per kilometre than fuel cars, which is why we can keep our fares simple.' },
  { title: 'Modern Fleet', text: 'Every car in our fleet is a recent-generation EV with a real-world tested range.' },
];

const services = [
  { title: 'City Rides', text: 'Point-to-point travel within Erode and nearby towns.' },
  { title: 'Outstation Trips', text: 'Book an EV for longer trips anywhere across Tamil Nadu.' },
  { title: 'Scheduled Rides', text: 'Pick a future date and time - we\'ll have the car ready.' },
  { title: 'Airport & Station Drops', text: 'Reliable drops timed to your travel schedule.' },
];

const steps = [
  { title: 'Choose your EV', text: 'Browse our fleet and pick the car that fits your trip.' },
  { title: 'Set pickup & drop', text: 'Tell us where to collect you and where you\'re headed.' },
  { title: 'Pick date & time', text: 'Book instantly or schedule a ride for later - any future date.' },
  { title: 'Confirm & ride', text: 'Pay the flat fare and you\'re booked. That\'s it.' },
];

const evBrands = [
  {
    name: 'TATA',
    label: 'Nexon EV · Punch EV · Tiago EV',
    mark: 'T',
    logo: '/assets/logos/tata.png',
  },
  {
    name: 'Mahindra',
    label: 'XUV400 · BE 6 · XEV 9e',
    mark: 'M',
    logo: '/assets/logos/mahindra.png',
  },
  {
    name: 'MG',
    label: 'Comet · Windsor · ZS EV',
    mark: 'MG',
    logo: '/assets/logos/mg.png',
  },
  {
    name: 'Hyundai',
    label: 'Creta Electric · IONIQ 5',
    mark: 'H',
    logo: '/assets/logos/hyundai.png',
  },
  {
    name: 'Maruti Suzuki',
    label: 'e Vitara',
    mark: 'MS',
    logo: '/assets/logos/maruti.png',
  },
  {
    name: 'Citroën',
    label: 'ë-C3 · ë-C3 Aircross',
    mark: 'C',
    logo: '/assets/logos/citroen.png',
  },
];
const heroSlides = evCars.slice(1, 6);

const aboutPoints = [
  {
    title: 'Eco-first',
    text: '100% electric fleet, no exceptions.'
  },
  {
    title: 'Local',
    text: 'Based in Erode, serving all of Tamil Nadu.'
  },
  {
    title: 'Transparent',
    text: 'One flat fare - no surge, no surprises.'
  }
];

function AnimatedStat({ value, prefix = '', suffix = '', label }) {
  const [displayValue, setDisplayValue] = useState(0);
  const statRef = useRef(null);

  useEffect(() => {
    const stat = statRef.current;
    if (!stat) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const startTime = performance.now();
      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / 1200, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * easedProgress));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.6 });

    observer.observe(stat);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={statRef} className="hero-stat">
      <strong>{prefix}{displayValue}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

const carImages = [
  "/assets/360-view/image1.png",
  "/assets/360-view/image2.png",
  "/assets/360-view/image3.png",
  "/assets/360-view/image4.png",
  "/assets/360-view/image5.png",
  "/assets/360-view/image6.png",
  "/assets/360-view/image7.png",
  "/assets/360-view/image8.png",

];



export default function Home() {
  const featuredCars = evCars.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const updateVideo = () => {
      if (!video.duration || !isFinite(video.duration)) {
        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (maxScroll <= 0) return;

      const progress = Math.min(
        Math.max(window.scrollY / maxScroll, 0),
        1
      );

      video.currentTime =
        progress * video.duration;
    };

    video.addEventListener(
      'loadedmetadata',
      updateVideo
    );

    window.addEventListener(
      'scroll',
      updateVideo,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      updateVideo
    );

    return () => {
      video.removeEventListener(
        'loadedmetadata',
        updateVideo
      );

      window.removeEventListener(
        'scroll',
        updateVideo
      );

      window.removeEventListener(
        'resize',
        updateVideo
      );
    };
  }, []);

  const changeFrame = (movement) => {
    setCurrentFrame((prev) => {
      let next = prev + movement;

      if (next < 0) {
        next = carImages.length - 1;
      }

      if (next >= carImages.length) {
        next = 0;
      }

      return next;
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const difference = e.clientX - startX;

    if (Math.abs(difference) > 15) {
      changeFrame(difference > 0 ? -1 : 1);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const difference = currentX - startX;

    if (Math.abs(difference) > 15) {
      changeFrame(difference > 0 ? -1 : 1);
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };


  useEffect(() => {
    if (sliderPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [sliderPaused]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px' });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy motion-reveal">
            <span className="eyebrow motion-shimmer">Erode, Tamil Nadu</span>
            <h1>Electric cabs for a quieter, cleaner Tamil Nadu.</h1>
            <p>
              I Eco Green Cab runs an all-electric fleet out of Erode, taking
              you anywhere across Tamil Nadu. No fuel, no fumes - just a
              comfortable ride booked in a couple of minutes.
            </p>
            <div className="hero-actions motion-reveal motion-reveal-delay-2">
              <Link to="/book" className="btn btn-primary">Book an EV Cab</Link>
              <Link to="/ev-cars" className="btn btn-outline">See Our Fleet</Link>
            </div>
            <div className="hero-stats motion-reveal motion-reveal-delay-3">
              <div><strong>7</strong><span>EV models</span></div>
              <div><strong>6 AM - 6 PM</strong><span>daily operating hours</span></div>
              <div><strong>₹50</strong><span>flat fare, every ride</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="charge-pulse">
              <span className="pulse-dot" />
              <span className="pulse-ring" />
            </div>
            <img src="/assets/cars/nexon-ev.png" alt="Tata Nexon EV" onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
          </div>
        </div>
      </section> */}
      {/* 
      <section
        className="hero"
        onMouseEnter={() => setSliderPaused(false)}
        onMouseLeave={() => setSliderPaused(false)}
      >
        <div
          key={heroSlides[activeSlide].id}
          className="hero-background"
          role="img"
          aria-label={`${heroSlides[activeSlide].name} electric vehicle`}
          style={{ backgroundImage: `url("${heroSlides[activeSlide].image}")` }}
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Erode, Tamil Nadu</span>

            <h1>Electric cabs for a quieter, cleaner Tamil Nadu.</h1>

            <p>
              I Eco Green Cab runs an all-electric fleet out of Erode, taking
              you anywhere across Tamil Nadu. No fuel, no fumes - just a
              comfortable ride booked in a couple of minutes.
            </p>

            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary">
                Book an EV Cab
              </Link>

              <Link to="/ev-cars" className="btn btn-outline">
                See Our Fleet
              </Link>
            </div>

            <div className="hero-stats">
              <AnimatedStat value={7} label="EV models" />
              <AnimatedStat value={100} suffix="%" label="electric fleet" />
              <AnimatedStat value={50} prefix="₹" label="flat fare, every ride" />
            </div>
          </div>

        </div>
      </section> */}
      <video
        ref={videoRef}
        id="myVideo"
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/assets/videos/hero1.mp4"
          type="video/mp4"
        />
      </video>

      <section className="brand-showcase" aria-labelledby="brand-showcase-title" data-reveal>
        <div className="container">
          <div className="brand-showcase-heading motion-reveal">
            <span className="eyebrow">Trusted EV makers</span>
            <h2 id="brand-showcase-title">A fleet built from the best in electric mobility.</h2>
          </div>
        </div>
        <div className="brand-marquee" aria-label="Electric vehicle brands in our fleet">
          <div className="brand-track">
            {[...evBrands, ...evBrands].map((brand, index) => (
              <div className="brand-item" key={`${brand.name}-${index}`} aria-hidden={index >= evBrands.length}>
                <span className="brand-mark">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                    />
                  ) : (
                    <span>{brand.mark}</span>
                  )}
                </span>
                <span className="brand-copy">
                  <strong>{brand.name}</strong>
                  <small>{brand.label}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-slider" aria-label="Choose hero background image">
          {heroSlides.map((car, index) => (
            <button
              type="button"
              key={car.id}
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${car.name}`}
              aria-current={index === activeSlide ? 'true' : undefined}
            />
          ))}
        </div>
      </section>

      {/* <section className="section" data-reveal>
        <div className="container">
          <div className="about-split motion-reveal">
            <div>
              <span className="eyebrow">About Us</span>
              <h2>Built around one idea: cab travel shouldn't cost the environment.</h2>
              <p>
                I Eco Green Cab started in Erode with a simple goal - make
                electric mobility the easy choice for everyday travel across
                Tamil Nadu. Every car we run is fully electric, every driver
                is trained on EV handling, and every ride keeps a little more
                pollution out of the air.
              </p>
              <Link to="/about" className="btn btn-outline">Read Our Story</Link>
            </div>
            <div className="about-points">
              <div className="about-point motion-shimmer"><strong>Eco-first</strong><p>100% electric fleet, no exceptions.</p></div>
              <div className="about-point motion-shimmer"><strong>Local</strong><p>Based in Erode, serving all of Tamil Nadu.</p></div>
              <div className="about-point motion-shimmer"><strong>Transparent</strong><p>One flat fare - no surge, no surprises.</p></div>
            </div>
          </div>
        </div>
      </section> */}


      <section className="section" data-reveal>
        <div className="container">

          <div className="about-split motion-reveal">

            <div className="about-content">
              <span className="eyebrow">About Us</span>

              <h2>
                Built around one idea: cab travel shouldn't cost the environment.
              </h2>

              <p>
                I Eco Green Cab started in Erode with a simple goal - make
                electric mobility the easy choice for everyday travel across
                Tamil Nadu. Every car we run is fully electric, every driver
                is trained on EV handling, and every ride keeps a little more
                pollution out of the air.
              </p>

              <Link to="/about" className="btn btn-outline">
                Read Our Story
              </Link>
            </div>

            <div className="car-360-wrapper motion-shimmer">

              <div className="car-360-header">
                <span>360° VIEW</span>
                <small>Drag to explore</small>
              </div>

              <div className="car-360-viewer">
                <img
                  src={carImages[currentFrame]}
                  alt="I Eco Green Cab electric car 360 view"
                  draggable="false"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />

                <div className="car-360-overlay">
                  <span>↔</span>
                  <p>Drag to rotate</p>
                </div>
              </div>

              <div className="car-360-dots">
                {carImages.map((_, index) => (
                  <span
                    key={index}
                    className={index === currentFrame ? "active" : ""}
                  />
                ))}
              </div>

            </div>

          </div>


          <div className="about-points">
            {aboutPoints.map((item) => (
              <div
                key={item.title}
                className="about-point card motion-shimmer"
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted" data-reveal>
        <div className="container">
          <div className="section-heading motion-reveal">
            <span className="eyebrow">Why EV</span>
            <h2>Why choose an electric ride</h2>
          </div>
          <div className="why-grid">
            {whyEv.map((item) => (
              <div key={item.title} className="why-card card motion-shimmer">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading motion-reveal">
            <span className="eyebrow">Our Fleet</span>
            <h2>A closer look at our EV fleet</h2>
            <p>Seven electric models, one flat fare of ₹50 on every ride.</p>
          </div>
          <div className="ev-grid-preview">
            {featuredCars.map((car) => (
              <EVCard key={car.id} car={car} />
            ))}
          </div>
          <div className="view-all-wrap">
            <Link to="/ev-cars" className="btn btn-outline">View All 7 EVs</Link>
          </div>
        </div>
      </section>

      <section className="section section-tinted" data-reveal>
        <div className="container">
          <div className="section-heading motion-reveal">
            <span className="eyebrow">Services</span>
            <h2>What we offer</h2>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card card motion-shimmer">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading motion-reveal">
            <span className="eyebrow">How It Works</span>
            <h2>Booking in four simple steps</h2>
          </div>
          <div className="steps-row">
            {steps.map((step, i) => (
              <div key={step.title} className="step-card motion-float">
                <div className="step-number">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted" data-reveal>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Customer Experience</span>
            <h2>What riders say about us</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial card motion-shimmer">
              <p>"Booked a Nexon EV for an early morning trip to Coimbatore. Smooth ride and dead silent - loved it."</p>
              <span>- Priya, Erode</span>
            </div>
            <div className="testimonial card motion-shimmer">
              <p>"The flat fare made it so easy to decide. No haggling, no surprise charges."</p>
              <span>- Karthik, Salem</span>
            </div>
            <div className="testimonial card motion-shimmer">
              <p>"Scheduled a ride two days in advance for a station drop. Car was on time, driver was polite."</p>
              <span>- Divya, Tiruppur</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta" data-reveal>
        <div className="container final-cta-inner motion-reveal">
          <h2>Switch to electric for your next ride.</h2>
          <p>Join the growing number of riders choosing cleaner travel across Tamil Nadu.</p>
          <Link to="/book" className="btn btn-primary">Book an EV Cab</Link>
        </div>
      </section>

      <ChatAssistant />
    </div>
  );
}
