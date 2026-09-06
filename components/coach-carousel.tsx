'use client';

import { useEffect, useState } from 'react';
import { AtSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { coaches } from '@/lib/site-config';

export function CoachCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reducedMotion.matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % coaches.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showPrevious = () => setActiveIndex(current => (current - 1 + coaches.length) % coaches.length);
  const showNext = () => setActiveIndex(current => (current + 1) % coaches.length);

  return <div
    className="coach-carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
    }}
    aria-roledescription="carousel"
    aria-label="ICC coaches"
  >
    <div className="coach-carousel-controls">
      <p aria-live="polite">Coach {activeIndex + 1} of {coaches.length}</p>
      <div>
        <button type="button" onClick={showPrevious} aria-label="Show previous coach"><ChevronLeft aria-hidden="true" /></button>
        <button type="button" onClick={showNext} aria-label="Show next coach"><ChevronRight aria-hidden="true" /></button>
      </div>
    </div>
    <div className="coach-carousel-viewport">
      <div className="coach-carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {coaches.map((coach, index) => (
          <article className="coach-card" key={coach.name} aria-hidden={index !== activeIndex}>
            <div className="coach-portrait" aria-hidden="true"><span>{coach.initials}</span></div>
            <div className="coach-card-body">
              <div className="coach-meta"><span>{coach.role}</span></div>
              <h3>{coach.name}</h3>
              <p>{coach.description}</p>
              {coach.instagramUrl && <a href={coach.instagramUrl} target="_blank" rel="noreferrer" tabIndex={index === activeIndex ? 0 : -1}><AtSign aria-hidden="true" /> {coach.instagram}</a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>;
}
