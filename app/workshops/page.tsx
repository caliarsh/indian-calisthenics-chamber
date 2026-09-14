/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, Check, MapPin } from 'lucide-react';
import { EditorialImage } from '@/components/editorial-photo';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteConfig, workshopHeroImage, workshopImages } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Workshops | Indian Calisthenics Chamber', description: 'Explore previous Indian Calisthenics Chamber workshops and live showcases.' };

export default function WorkshopsPage() {
  return <main className="event-page"><SiteHeader />
    <section className="event-page-hero event-page-hero-with-photo"><div><p className="eyebrow"><span /> Learn with the community</p><h1>Workshops.</h1><p>Past sessions and showcases that brought athletes and coaches together to explore weighted strength, freestyle foundations, and calisthenics performance.</p></div><EditorialImage {...workshopHeroImage} sizes="(max-width: 900px) 100vw, 46vw" showCaption={false} /></section>
    <section className="section workshops-section" id="past-events">
      <div className="section-heading"><div><p className="section-kicker">ICC community sessions</p><h2>Past<br /><em>workshops.</em></h2></div><p>Explore previous ICC workshops across strength, freestyle, movement, and community training.</p></div>
      <div className="workshop-grid">{siteConfig.workshops.map(workshop => <article className="workshop-card" key={workshop.id}>
        <EditorialImage {...workshopImages[workshop.id]} sizes="(max-width: 900px) 100vw, 50vw" />
        <div className="workshop-card-top"><span>{workshop.format}</span><small>Past event</small></div>
        <h3>{workshop.name}</h3>
        <p className="workshop-lead">Led by <strong>{workshop.ledBy}</strong></p>
        <div className="workshop-meta"><span><CalendarDays aria-hidden="true" /> {workshop.date}</span><span><MapPin aria-hidden="true" /> {workshop.location}</span></div>
        <p>{workshop.description}</p>
        <ul>{workshop.topics.map(topic => <li key={topic}><Check aria-hidden="true" /> {topic}</li>)}</ul>
        {workshop.sourceUrl && <a href={workshop.sourceUrl} target="_blank" rel="noreferrer">View event Reel <ArrowUpRight aria-hidden="true" /></a>}
      </article>)}</div>
    </section>
    <SiteFooter />
  </main>;
}
