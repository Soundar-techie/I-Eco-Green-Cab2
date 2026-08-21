import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { shouldRunHeavyEffects } from '../../utils/motionPrefs';

let enginePromise = null;

// Soft, sparse green energy motes drifting behind the hero copy. Density
// is intentionally low - this is atmosphere, not a light show.
export default function ParticleField() {
  const [ready, setReady] = useState(false);
  const enabled = useMemo(() => shouldRunHeavyEffects(), []);

  useEffect(() => {
    if (!enabled) return;
    if (!enginePromise) {
      enginePromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
    enginePromise.then(() => setReady(true));
  }, [enabled]);

  if (!enabled || !ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="particle-field"
      options={{
        fullScreen: { enable: false },
        detectRetina: true,
        fpsLimit: 60,
        background: { color: 'transparent' },
        particles: {
          number: { value: 26, density: { enable: true, area: 900 } },
          color: { value: ['#6cc18d', '#e8f5ec', '#4ca771'] },
          opacity: {
            value: { min: 0.15, max: 0.55 },
            animation: { enable: true, speed: 0.4, sync: false },
          },
          size: { value: { min: 1, max: 3 } },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.35,
            direction: 'top',
            outModes: { default: 'out' },
            straight: false,
            random: true,
          },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
          modes: { repulse: { distance: 60, duration: 0.4 } },
        },
      }}
    />
  );
}
