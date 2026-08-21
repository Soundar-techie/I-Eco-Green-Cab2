import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../utils/motionPrefs';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrap a section (or a grid of cards) to have its direct children animate
 * in with a GSAP timeline once it enters the viewport. Falls back to a
 * static render when reduced motion is requested.
 *
 *   <Reveal as="div" className="why-grid" stagger={0.08} y={28}>
 *     {cards}
 *   </Reveal>
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  stagger = 0.1,
  y = 32,
  duration = 0.7,
  start = 'top 82%',
  once = true,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const targets = el.children.length ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, duration, start, once]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
