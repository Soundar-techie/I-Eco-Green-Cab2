// Shared helpers so every animation-related component checks the same
// signals for "should this run" - reduced motion, screen size, touch.

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function isSmallScreen() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// The one flag the heavier visual effects (3D scene, particles, cursor glow)
// should gate on: skip them entirely rather than degrade badly.
export function shouldRunHeavyEffects() {
  return !prefersReducedMotion() && !isCoarsePointer() && !isSmallScreen();
}
