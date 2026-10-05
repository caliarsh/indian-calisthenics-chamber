/* oxlint-disable next/no-html-link-for-pages -- static-export links */

import Image from 'next/image';
import { ArrowUpRight, Check, Clock3, MapPin, MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo-json-ld';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig, siteImages, type Location } from '@/lib/site-config';

const siteUrl = 'https://indiancalisthenicschamber.com';

const locationContent = {
  bengaluru: {
    searchName: 'Bangalore',
    slug: 'calisthenics-classes-bangalore',
    intro: 'Build strength, movement control, and calisthenics skills with coach-led group classes and personal training at ICC in Bilekahalli, off Bannerghatta Road.',
    localCopy: 'ICC Bengaluru is a dedicated place to learn calisthenics progressively in South Bengaluru. Sessions are suitable for people beginning with foundational strength as well as experienced athletes working on statics, endurance, freestyle, or street lifting.',
  },
  hyderabad: {
    searchName: 'Hyderabad',
    slug: 'calisthenics-classes-hyderabad',
    intro: 'Build strength, movement control, and calisthenics skills with coach-led group classes and personal training at ICC in Madhapur, Hyderabad.',
    localCopy: 'ICC Hyderabad provides structured calisthenics coaching in Madhapur. Sessions are level-matched, so beginners can learn strong foundations while experienced athletes develop statics, endurance, freestyle, or street lifting.',
  },
} as const;

function locationSchema(location: Location, slug: string, image: string) {
  const streetAddress = location.address.replace(/ · /g, ', ');

  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${siteUrl}/${slug}#location`,
    name: `Indian Calisthenics Chamber ${location.name}`,
    alternateName: `ICC ${location.name}`,
    url: `${siteUrl}/${slug}`,
    image: `${siteUrl}${image}`,
    telephone: `+${location.whatsappNumber}`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: location.name,
      addressRegion: location.id === 'bengaluru' ? 'Karnataka' : 'Telangana',
      postalCode: location.id === 'bengaluru' ? '560076' : '500081',
      addressCountry: 'IN',
    },
    hasMap: location.mapsUrl,
    sameAs: [location.instagramUrl, location.mapsUrl],
    parentOrganization: { '@id': `${siteUrl}/#organization` },
  };
}

export function LocationSeoPage({ locationId }: { locationId: Location['id'] }) {
  const location = siteConfig.locations.find((entry) => entry.id === locationId)!;
  const content = locationContent[locationId];
  const image = siteImages.locations[locationId];
  const sessions = location.schedule.flatMap((group) => group.periods.flatMap((period) => period.sessions));

  return (
    <main className="location-page">
      <JsonLd data={locationSchema(location, content.slug, image.src)} />
      <SiteHeader />

      <section className="location-hero">
        <div className="location-hero-copy">
          <p className="eyebrow"><span /> {location.area}</p>
          <h1>Calisthenics classes<br />in <em>{content.searchName}.</em></h1>
          <p>{content.intro}</p>
          <div className="hero-actions">
            <a className="button" href={`/book-trial?mode=Offline&branch=${location.name}`}>Book a trial <ArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href={location.mapsUrl} target="_blank" rel="noreferrer">View on Google Maps <MapPin aria-hidden="true" /></a>
          </div>
        </div>
        <figure><Image src={image.src} width={image.width} height={image.height} alt={image.alt} priority unoptimized sizes="(max-width: 900px) 100vw, 50vw" style={{ objectPosition: image.focalPosition }} /></figure>
      </section>

      <section className="location-proof" aria-label="Location highlights">
        <span><MapPin aria-hidden="true" /> {location.area}</span>
        <span><Clock3 aria-hidden="true" /> Monday to Friday</span>
        <span><MessageCircle aria-hidden="true" /> {location.whatsappDisplay}</span>
      </section>

      <section className="section location-intro">
        <div><p className="section-kicker">Train at ICC</p><h2>A clear path from<br /><em>first rep to skill.</em></h2></div>
        <div><p>{content.localCopy}</p><p>Every athlete starts at an appropriate level and follows coached progressions. You can choose group classes for structured community training or personal training for focused one-to-one support.</p></div>
      </section>

      <section className="section location-programmes" aria-labelledby={`${locationId}-programmes`}>
        <div className="section-heading"><div><p className="section-kicker">What you can train</p><h2 id={`${locationId}-programmes`}>Coaching for<br /><em>every level.</em></h2></div><p>Training is adapted to your current ability, equipment, and goals.</p></div>
        <div className="location-programme-grid">
          <article><span>01</span><h3>Foundations</h3><p>Learn safe pushing, pulling, core control, mobility, and the strength base needed for calisthenics.</p></article>
          <article><span>02</span><h3>Skill development</h3><p>Progress towards handstands, muscle-ups, levers, statics, weighted strength, and movement combinations.</p></article>
          <article><span>03</span><h3>Athlete pathway</h3><p>Prepare for performance and competition through focused standards, programming, and coach feedback.</p></article>
        </div>
      </section>

      <section className="section location-schedule" id="schedule">
        <div className="section-heading"><div><p className="section-kicker">Current weekday schedule</p><h2>Find a batch<br /><em>that fits.</em></h2></div><p>Personal training is arranged directly with the ICC team.</p></div>
        <div className="location-schedule-list">
          {sessions.map((session, index) => <div key={`${session.name}-${session.time}-${index}`}><Check aria-hidden="true" /><strong>{session.name}</strong><span>{session.days}</span><span>{session.time}</span>{session.level !== 'L1 · L2 · L3' && <small>{session.level}</small>}</div>)}
        </div>
      </section>

      <section className="location-contact section">
        <div><p className="section-kicker">Visit ICC {location.name}</p><h2>Start with<br /><em>a trial.</em></h2><p>{location.address}</p></div>
        <div className="location-contact-actions"><a className="button" href={`/book-trial?mode=Offline&branch=${location.name}`}>Book your trial <ArrowUpRight aria-hidden="true" /></a><a href={`https://wa.me/${location.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp {location.whatsappDisplay}</a><a href="/offline-training#pricing">View membership pricing</a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
