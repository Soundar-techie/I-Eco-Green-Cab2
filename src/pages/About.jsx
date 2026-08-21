import React from 'react';
import './StaticPage.css';

export default function About() {
  return (
    <div>
      <div
        className="page-header"
        style={{ backgroundImage: "linear-gradient(135deg, rgba(13, 39, 31, 0.78), rgba(20, 58, 44, 0.48)), url('/assets/cars/home-bg.png')" }}
      >
        <h1>About I Eco Green Cab</h1>
        <p>An all-electric cab service based in Erode, built to make clean travel the easy choice across Tamil Nadu.</p>
      </div>

      <section className="section">
        <div className="container content-split">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>Started in Erode, built for Tamil Nadu.</h2>
            <p>
              I Eco Green Cab began with a straightforward question: why
              should convenient cab travel come at the cost of clean air?
              We set out to run a cab service where every single car is
              electric - no petrol, no diesel, no compromise on comfort.
            </p>
            <p>
              Today we operate out of Erode and take riders anywhere across
              Tamil Nadu, from quick trips within the city to longer
              outstation journeys, all in the same quiet, emission-free EVs.
            </p>
          </div>
          <img src="/assets/cars/nexon-ev.png" alt="I Eco Green Cab EV fleet" onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container content-split">
          <img src="/assets/cars/atto3-ev.png" alt="Electric vehicle charging" onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
          <div>
            <span className="eyebrow">Our Mission</span>
            <h2>Cleaner travel, one ride at a time.</h2>
            <ul className="mission-list">
              <li>Run a 100% electric fleet with no exceptions, so every trip is emission-free.</li>
              <li>Keep pricing transparent with one flat fare, so there's never a surprise at the end of a ride.</li>
              <li>Serve the whole of Tamil Nadu from our Erode base, from short city hops to longer outstation trips.</li>
              <li>Put the customer's schedule first - book instantly or plan ahead for any future date.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-split">
          <div>
            <span className="eyebrow">Why EV</span>
            <h2>Every ride, a little less pollution.</h2>
            <p>
              Electric vehicles produce zero tailpipe emissions, which means
              every kilometre you travel with us keeps that much diesel and
              petrol exhaust out of the air in Erode and the towns we serve.
              Beyond the environment, EVs are quieter and smoother to ride
              in - most riders notice the difference within the first few
              minutes.
            </p>
          </div>
          <img src="/assets/cars/xuv400-ev.png" alt="Mahindra XUV400 EV on the road" onError={(e) => { e.target.src = '/assets/cars/placeholder.jpg'; }} />
        </div>
      </section>
    </div>
  );
}
