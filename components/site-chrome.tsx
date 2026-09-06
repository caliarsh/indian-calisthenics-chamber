'use client';

/* oxlint-disable next/no-html-link-for-pages -- static-export links */

import { ArrowUpRight, AtSign, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/lib/site-config';

const navigation = [
  { href: '/', label: 'Home', note: 'Academy overview' },
  { href: '/train-from-home', label: 'Online Training', note: 'Train from home or your gym' },
  { href: '/offline-training', label: 'Offline Training', note: 'Bengaluru and Hyderabad' },
  { href: '/assessment', label: 'Assessment', note: 'Test your current level' },
  { href: '/#coaches', label: 'Coaches', note: 'Meet the ICC team' },
] as const;

export function SiteHeader() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Indian Calisthenics Chamber home"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
    <nav className="main-nav" aria-label="Primary navigation">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
    <a className="button button-small" href="/book-trial">Book a trial <ArrowUpRight size={16} /></a>
    <Sheet>
      <SheetTrigger className="mobile-menu-trigger" aria-label="Open navigation menu"><Menu aria-hidden="true" /></SheetTrigger>
      <SheetContent className="mobile-menu-sheet" side="right">
        <SheetHeader className="mobile-menu-header"><span className="brand-mark" aria-hidden="true">ICC</span><SheetTitle>Indian Calisthenics Chamber</SheetTitle><SheetDescription>Choose where you want to go.</SheetDescription></SheetHeader>
        <nav className="mobile-menu-nav" aria-label="Mobile navigation">{navigation.map((item, index) => <a href={item.href} key={item.href}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.label}</strong><small>{item.note}</small></div><ArrowUpRight aria-hidden="true" /></a>)}</nav>
        <SheetFooter className="mobile-menu-footer"><a className="button" href="/book-trial">Book a trial <ArrowUpRight aria-hidden="true" /></a><p>Bengaluru · Hyderabad</p></SheetFooter>
      </SheetContent>
    </Sheet>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <a className="brand footer-brand" href="/" aria-label="Indian Calisthenics Chamber home"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
    <p>Strength is a skill. Learn it well.</p>
    <div className="footer-contact">{siteConfig.locations.map(location => <div className="footer-location" key={location.id}><div><a href={location.mapsUrl} target="_blank" rel="noreferrer">{location.name}</a><span aria-hidden="true">·</span><a href={`tel:+${location.whatsappNumber}`}>{location.whatsappDisplay}</a></div><a className="footer-instagram" href={location.instagramUrl} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" /> {location.instagram}</a></div>)}</div>
  </footer>;
}
