/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowDown, ArrowUpRight, Check, MapPin } from 'lucide-react';
import { ReviewsExplorer } from '@/components/reviews-explorer';
import { ScheduleExplorer } from '@/components/schedule-explorer';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { offlineOffers, siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Offline Training | Indian Calisthenics Chamber', description: 'Train in person with ICC in Bengaluru or Hyderabad. Explore programs, sample prices, batch timings, locations, and reviews.' };

export default function OfflineTrainingPage() {
  return <main className="offline-page"><SiteHeader />
    <section className="offline-hero" id="top"><div className="hero-grid" aria-hidden="true" /><div className="hero-monogram" aria-hidden="true">ICC</div><div className="hero-content"><p className="eyebrow"><span /> Bengaluru · Hyderabad</p><h1>Train at<br /><em>ICC.</em></h1><p className="hero-copy">Coach-led calisthenics training, level-matched progressions, and a community built around consistent work.</p><div className="hero-actions"><a className="button" href="/book-trial?mode=Offline">Book an offline trial <ArrowUpRight /></a><a className="text-link" href="#pricing">View sample pricing <ArrowDown /></a></div></div></section>
    <section className="section offline-pricing" id="pricing"><div className="section-heading"><div><p className="section-kicker">Sample pricing</p><h2>Choose how<br /><em>you train.</em></h2></div><p>These prices are temporary examples. Confirm current pricing and availability with your selected branch before booking.</p></div><div className="offline-price-grid">{offlineOffers.map(offer => <article className="offline-price-card" key={offer.id}><div><span>Sample price</span><strong>{offer.levels}</strong></div><h3>{offer.name}</h3><p className="online-price">{offer.price}</p><small>{offer.billingPeriod}</small><ul>{offer.inclusions.map(item => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul><a href={`/book-trial?mode=Offline&offer=${offer.id}`}>Confirm pricing &amp; book trial <ArrowUpRight /></a></article>)}</div></section>
    <section className="section schedule-section" id="locations"><div className="schedule-heading"><div><p className="section-kicker">Locations and batch timings</p><h2>Find your<br /><em>training base.</em></h2></div></div><ScheduleExplorer /><p className="placeholder-note">Group batches run Monday to Friday. Personal Training sessions are scheduled by appointment.</p></section>
    <section className="offline-assessment section"><MapPin aria-hidden="true" /><div><p className="section-kicker">Start at the right level</p><h2>Test yourself<br /><em>before your trial.</em></h2><p>Complete ICC’s strength, endurance, mobility, and flexibility checks to receive an indicative L1, L2, or L3 placement.</p></div><a className="button" href="/assessment?path=offline">Take the assessment <ArrowUpRight /></a></section>
    <section className="section reviews-section" id="reviews"><div className="reviews-heading"><div><p className="section-kicker">Google Maps reviews</p><h2>Two cities.<br /><em>One community.</em></h2></div></div><ReviewsExplorer /></section>
    <section className="offline-contacts">{siteConfig.locations.map(location => <a href={location.mapsUrl} target="_blank" rel="noreferrer" key={location.id}><MapPin aria-hidden="true" /><span>{location.name}</span><strong>{location.address}</strong><small>{location.whatsappDisplay}</small></a>)}</section>
    <SiteFooter />
  </main>;
}
