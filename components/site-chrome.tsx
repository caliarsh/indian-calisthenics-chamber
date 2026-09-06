/* oxlint-disable next/no-html-link-for-pages -- static-export links */

import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Indian Calisthenics Chamber home"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
    <nav className="main-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/train-from-home">Online training</a><a href="/offline-training">Offline training</a><a href="/assessment">Assessment</a><a href="/#coaches">Coaches</a></nav>
    <a className="button button-small" href="/book-trial">Book a trial <ArrowUpRight size={16} /></a>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <a className="brand footer-brand" href="/" aria-label="Indian Calisthenics Chamber home"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
    <p>Strength is a skill. Learn it well.</p>
    <div className="footer-contact">{siteConfig.locations.map(location => <div className="footer-location" key={location.id}><a href={location.mapsUrl} target="_blank" rel="noreferrer">{location.name}</a><span aria-hidden="true">·</span><a href={`tel:+${location.whatsappNumber}`}>{location.whatsappDisplay}</a></div>)}</div>
  </footer>;
}
