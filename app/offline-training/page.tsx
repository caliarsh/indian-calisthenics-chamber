/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, AtSign, MapPin } from 'lucide-react';
import { OfflinePricingExplorer } from '@/components/offline-pricing-explorer';
import { OfflineLocationGallery } from '@/components/offline-location-gallery';
import { ReviewsExplorer } from '@/components/reviews-explorer';
import { ScheduleExplorer } from '@/components/schedule-explorer';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Calisthenics Classes in Bengaluru & Hyderabad | ICC', description: 'Train in person with ICC in Bengaluru or Hyderabad. Explore calisthenics group classes, personal training, pricing, batch timings, locations, and reviews.', alternates: { canonical: '/offline-training' } };

export default function OfflineTrainingPage() {
  return <main className="offline-page"><SiteHeader />
    <section className="offline-hero" id="top"><div className="offline-hero-media"><Image src="/icc-community-hero.jpeg" width={1280} height={1177} alt="Indian Calisthenics Chamber athletes and community members gathered inside the academy" priority unoptimized sizes="100vw" /></div><div className="hero-content"><p className="eyebrow"><span /> Bengaluru · Hyderabad</p><h1>Train at<br /><em>ICC.</em></h1><div className="hero-actions"><a className="button" href="#pricing">View pricing &amp; timings <ArrowDown /></a></div></div></section>
    <section className="section offline-pricing" id="pricing"><div className="section-heading"><div><p className="section-kicker">Membership pricing</p><h2>Choose your <em>plan.</em></h2></div></div><OfflinePricingExplorer /></section>
    <section className="section schedule-section" id="locations"><div className="schedule-heading"><div><p className="section-kicker">Locations &amp; batch timings</p><h2>Choose your <em>batch.</em></h2></div></div><ScheduleExplorer /></section>
    <section className="offline-assessment section"><MapPin aria-hidden="true" /><div><p className="section-kicker">Start at the right level</p><h2>Test yourself <em>before your trial.</em></h2></div><a className="button" href="/assessment?path=offline">Take the assessment <ArrowUpRight /></a></section>
    <OfflineLocationGallery />
    <section className="section reviews-section" id="reviews"><div className="reviews-heading"><div><p className="section-kicker">Google Maps reviews</p><h2>Two cities. <em>One community.</em></h2></div></div><ReviewsExplorer /></section>
    <section className="offline-contacts">{siteConfig.locations.map(location => <article key={location.id}><MapPin aria-hidden="true" /><span>{location.name}</span><strong>{location.address}</strong><small>{location.whatsappDisplay}</small><div><a href={location.id === 'bengaluru' ? '/calisthenics-classes-bangalore' : '/calisthenics-classes-hyderabad'}>Explore {location.name} classes <ArrowUpRight aria-hidden="true" /></a><a href={location.mapsUrl} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight aria-hidden="true" /></a><a href={location.instagramUrl} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" /> {location.instagram}</a></div></article>)}</section>
    <SiteFooter />
  </main>;
}
