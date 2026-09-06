/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, Check, Clock3, MapPin } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Workshops | Indian Calisthenics Chamber', description: 'Explore previous Indian Calisthenics Chamber workshops and live showcases.' };

export default function WorkshopsPage() {
  return <main className="event-page"><SiteHeader />
    <section className="event-page-hero"><p className="eyebrow"><span /> Learn with the community</p><h1>Workshops.</h1><p>Past sessions and showcases that brought athletes and coaches together to explore weighted strength, freestyle foundations, and calisthenics performance.</p></section>
    <section className="section workshops-section" id="past-events">
      <div className="section-heading"><div><p className="section-kicker">Past workshops and showcases</p><h2>Learn from<br /><em>the community.</em></h2></div><p>Every event below is drawn from its published event description and links back to the original Reel.</p></div>
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
    <SiteFooter />
  </main>;
}
