/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, AtSign, CalendarDays, Check, Clock3, MapPin, Trophy } from 'lucide-react';
import { OfflinePricingExplorer } from '@/components/offline-pricing-explorer';
import { ReviewsExplorer } from '@/components/reviews-explorer';
import { ScheduleExplorer } from '@/components/schedule-explorer';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Offline Training | Indian Calisthenics Chamber', description: 'Train in person with ICC in Bengaluru or Hyderabad. Explore programs, prices, batch timings, locations, and reviews.' };

export default function OfflineTrainingPage() {
  const competition = siteConfig.competitions[0];

  return <main className="offline-page"><SiteHeader />
    <section className="offline-hero" id="top"><div className="offline-hero-media"><Image src="/icc-community-hero.jpeg" width={1280} height={1177} alt="Indian Calisthenics Chamber athletes and community members gathered inside the academy" priority unoptimized sizes="(max-width: 760px) 100vw, 66vw" /></div><div className="hero-content"><p className="eyebrow"><span /> Bengaluru · Hyderabad</p><h1>Train at<br /><em>ICC.</em></h1><p className="hero-copy">Coach-led calisthenics training, level-matched progressions, and a community built around consistent work.</p><div className="hero-actions"><a className="button" href="/book-trial?mode=Offline">Book an offline trial <ArrowUpRight /></a><a className="text-link" href="#pricing">View pricing <ArrowDown /></a></div></div></section>
    <section className="section offline-pricing" id="pricing"><div className="section-heading"><div><p className="section-kicker">Membership and coaching</p><h2>Choose how<br /><em>you train.</em></h2></div><p>Compare Group Classes and Personal Training, then choose the duration and coach that suit you.</p></div><OfflinePricingExplorer /></section>
    <section className="section schedule-section" id="locations"><div className="schedule-heading"><div><p className="section-kicker">Locations and batch timings</p><h2>Find your<br /><em>training base.</em></h2></div></div><ScheduleExplorer /><p className="placeholder-note">Group batches run Monday to Friday. Personal Training sessions are scheduled by appointment.</p></section>
    <section className="section competition-section" id="competition">
      <div className="competition-mark" aria-hidden="true">ICCWE 26</div>
      <div className="competition-heading"><div><p className="section-kicker">Competitions</p><span>{competition.status}</span><h2>{competition.name}<br /><em>{competition.discipline}</em></h2></div><Trophy aria-hidden="true" /></div>
      <div className="competition-body">
        <div className="competition-meta"><span><CalendarDays aria-hidden="true" /> {competition.date}</span><span><MapPin aria-hidden="true" /> {competition.location}</span></div>
        <p>{competition.description}</p>
        <p className="competition-coverage">{competition.coverageNote}</p>
        <div className="competition-links">{competition.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight aria-hidden="true" /></a>)}</div>
        <p className="competition-upcoming">Upcoming competitions will be announced soon.</p>
      </div>
    </section>
    <section className="section workshops-section" id="workshops">
      <div className="section-heading"><div><p className="section-kicker">Workshops and showcases</p><h2>Learn from<br /><em>the community.</em></h2></div><p>Past ICC sessions have brought athletes and coaches together to explore weighted strength, freestyle foundations, and live calisthenics performance.</p></div>
      <div className="workshop-grid">{siteConfig.workshops.map(workshop => <article className="workshop-card" key={workshop.id}>
        <div className="workshop-card-top"><span>{workshop.format}</span><small>Past event</small></div>
        <h3>{workshop.name}</h3>
        <p className="workshop-lead">Led by <strong>{workshop.ledBy}</strong></p>
        <div className="workshop-meta"><span><CalendarDays aria-hidden="true" /> {workshop.date}</span><span><Clock3 aria-hidden="true" /> {workshop.time}</span><span><MapPin aria-hidden="true" /> {workshop.location}</span></div>
        <p>{workshop.description}</p>
        <ul>{workshop.topics.map(topic => <li key={topic}><Check aria-hidden="true" /> {topic}</li>)}</ul>
        <a href={workshop.sourceUrl} target="_blank" rel="noreferrer">View event Reel <ArrowUpRight aria-hidden="true" /></a>
      </article>)}</div>
    </section>
    <section className="offline-assessment section"><MapPin aria-hidden="true" /><div><p className="section-kicker">Start at the right level</p><h2>Test yourself<br /><em>before your trial.</em></h2><p>Complete ICC’s strength, endurance, mobility, and flexibility checks to receive an indicative L1, L2, or L3 placement.</p></div><a className="button" href="/assessment?path=offline">Take the assessment <ArrowUpRight /></a></section>
    <section className="section reviews-section" id="reviews"><div className="reviews-heading"><div><p className="section-kicker">Google Maps reviews</p><h2>Two cities.<br /><em>One community.</em></h2></div></div><ReviewsExplorer /></section>
    <section className="offline-contacts">{siteConfig.locations.map(location => <article key={location.id}><MapPin aria-hidden="true" /><span>{location.name}</span><strong>{location.address}</strong><small>{location.whatsappDisplay}</small><div><a href={location.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight aria-hidden="true" /></a><a href={location.instagramUrl} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" /> {location.instagram}</a></div></article>)}</section>
    <SiteFooter />
  </main>;
}
