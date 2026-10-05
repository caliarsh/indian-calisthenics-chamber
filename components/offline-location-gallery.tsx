'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { selectedOfflineGalleryImages, siteConfig } from '@/lib/site-config';

const AUTOPLAY_DELAY = 3200;

export function OfflineLocationGallery({ placement = 'offline' }: { placement?: 'offline' | 'home' }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const move = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('.offline-gallery-card');
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '0');
    const distance = firstCard.getBoundingClientRect().width + gap;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - distance / 2;

    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || reducedMotion.matches) return;

    const timer = window.setInterval(() => move(1), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [move, paused]);

  return (
    <section className={`section offline-gallery-section ${placement === 'home' ? 'home-gallery-section' : ''}`} id={placement === 'home' ? 'community-gallery' : 'gallery'} aria-labelledby={`${placement}-gallery-title`}>
      <div className="offline-gallery-heading">
        <div>
          <p className="section-kicker">Inside ICC</p>
          <h2 id={`${placement}-gallery-title`}>{placement === 'home' ? <>This is ICC.<br /><em>In motion.</em></> : <>Training in <em>motion.</em></>}</h2>
        </div>
        <div className="offline-gallery-intro">
          <div className="offline-gallery-controls" aria-label="Training gallery controls">
            <button type="button" onClick={() => move(-1)} aria-label="Show previous training photo"><ChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Show next training photo"><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div
        className="offline-gallery-track"
        ref={trackRef}
        aria-label="ICC training photo gallery"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        {selectedOfflineGalleryImages.map((image, index) => {
          const location = siteConfig.locations.find((item) => item.id === image.locationId)!;
          const locationLabel = image.locationId === 'bengaluru' ? 'BLR' : 'HYD';
          const imageLabel = placement === 'home' ? String(index + 1) : locationLabel;
          return (
            <figure className="offline-gallery-card" key={image.src}>
              <div className="offline-gallery-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 78vw, (max-width: 1000px) 44vw, 29vw"
                  style={{ objectPosition: image.focalPosition }}
                />
                <span aria-hidden="true">{imageLabel}</span>
              </div>
              <figcaption>
                <div><strong>{image.caption}</strong><span>{placement === 'home' ? `ICC training photo ${index + 1}` : `${locationLabel} · ICC`}</span></div>
                <a href={location.mapsUrl} target="_blank" rel="noreferrer" aria-label={`View ${location.name} photos on Google Maps`}>Google Maps <ExternalLink aria-hidden="true" /></a>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <p className="offline-gallery-note">The gallery advances automatically. Hover, focus, swipe, or use the arrow controls to explore at your own pace.</p>
    </section>
  );
}
