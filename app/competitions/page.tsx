/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, MapPin, Trophy } from 'lucide-react';
import { ImagePlaceholder } from '@/components/editorial-photo';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig, siteImageBriefs } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Competitions | Indian Calisthenics Chamber', description: 'Explore past Indian Calisthenics Chamber competitions and future event announcements.' };

export default function CompetitionsPage() {
  const competition = siteConfig.competitions[0];

  return <main className="event-page"><SiteHeader />
    <section className="event-page-hero event-page-hero-with-photo"><div><p className="eyebrow"><span /> Events at ICC</p><h1>Competitions.</h1><p>Competitive platforms built around strict standards, athletic performance, and a stronger Indian calisthenics community.</p></div><ImagePlaceholder brief={siteImageBriefs.competition[0]} /></section>
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
    <section className="event-photo-story section" aria-labelledby="competition-photo-title"><div className="event-photo-intro"><p className="section-kicker">Community in motion</p><h2 id="competition-photo-title">The people behind<br /><em>the platform.</em></h2><p>ICC competition grows from athletes who practise together, hold each other to strong standards, and keep showing up.</p></div><div className="event-photo-strip" aria-label="Planned ICC competition photo gallery">{siteImageBriefs.competition.map(brief => <ImagePlaceholder brief={brief} key={brief.label} />)}</div></section>
    <SiteFooter />
  </main>;
}
