/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, MapPin, Trophy } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Competitions | Indian Calisthenics Chamber', description: 'Explore past Indian Calisthenics Chamber competitions and future event announcements.' };

export default function CompetitionsPage() {
  const competition = siteConfig.competitions[0];

  return <main className="event-page"><SiteHeader />
    <section className="event-page-hero"><p className="eyebrow"><span /> Events at ICC</p><h1>Competitions.</h1><p>Competitive platforms built around strict standards, athletic performance, and a stronger Indian calisthenics community.</p></section>
    <section className="section competition-section" id="iccwe-26">
      <div className="competition-mark" aria-hidden="true">ICCWE 26</div>
      <div className="competition-heading"><div><p className="section-kicker">Competition archive</p><span>{competition.status}</span><h2>{competition.name}<br /><em>{competition.discipline}</em></h2></div><Trophy aria-hidden="true" /></div>
      <div className="competition-body">
        <div className="competition-meta"><span><CalendarDays aria-hidden="true" /> {competition.date}</span><span><MapPin aria-hidden="true" /> {competition.location}</span></div>
        <p>{competition.description}</p>
        <p className="competition-coverage">{competition.coverageNote}</p>
        <div className="competition-links">{competition.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight aria-hidden="true" /></a>)}</div>
        <p className="competition-upcoming">Upcoming competitions will be announced soon.</p>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
