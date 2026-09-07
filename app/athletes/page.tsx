/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, Medal, Target, UsersRound } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { athleteProfiles } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Our Athletes | Indian Calisthenics Chamber',
  description: 'Meet the athlete culture developed at Indian Calisthenics Chamber across strength, skills, and competition preparation.',
};

const culture = [
  { icon: Target, title: 'Train with standards', copy: 'Every repetition is coached with clear movement standards, not just completed for a number.' },
  { icon: UsersRound, title: 'Grow together', copy: 'Athletes share the floor, exchange feedback, and learn to raise the quality of the room together.' },
  { icon: Medal, title: 'Prepare to perform', copy: 'Training develops the composure, consistency, and decision-making required on competitive platforms.' },
] as const;

export default function AthletesPage() {
  return <main className="athletes-page">
    <SiteHeader />
    <section className="athletes-hero" id="top">
      <div className="athletes-hero-mark" aria-hidden="true">ICC</div>
      <p className="eyebrow"><span /> Built inside the chamber</p>
      <h1>Our<br /><em>Athletes.</em></h1>
      <p>ICC has an athlete-rich culture built through ambitious training, shared standards, and years of disciplined work. The academy has helped produce national-level athletes across multiple calisthenics disciplines while continuing to develop the next generation.</p>
    </section>

    <section className="athlete-culture section" aria-labelledby="athlete-culture-title">
      <div className="athlete-culture-lead">
        <p className="section-kicker">Athlete culture at ICC</p>
        <h2 id="athlete-culture-title">More than talent.<br /><em>A daily standard.</em></h2>
        <p>Strong athletes are not created by one exceptional session. They are shaped by how consistently they practise, how honestly they respond to feedback, and how well they support the people training beside them. At ICC, competition is an extension of that culture—not the beginning of it.</p>
      </div>
      <div className="athlete-culture-grid">
        {culture.map(({ icon: Icon, title, copy }, index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="athlete-roster section" id="profiles">
      <div className="section-heading">
        <div><p className="section-kicker">Athlete roster</p><h2>Built through<br /><em>the process.</em></h2></div>
        <p>These temporary sample profiles demonstrate how verified ICC athlete stories will appear. Names, photographs, disciplines, and achievements can be replaced as approved information is supplied.</p>
      </div>
      <div className="athlete-profile-grid">
        {athleteProfiles.map((athlete, index) => <article className="athlete-profile-card" key={athlete.id}>
          <div className="athlete-profile-portrait" aria-hidden="true"><span>{athlete.initials}</span><small>{String(index + 1).padStart(2, '0')}</small></div>
          <div className="athlete-profile-copy"><div className="athlete-profile-meta"><span>{athlete.discipline}</span><small>{athlete.status}</small></div><h3>{athlete.name}</h3><strong>{athlete.level}</strong><p>{athlete.description}</p></div>
        </article>)}
      </div>
    </section>

    <section className="athlete-page-cta section"><div><p className="section-kicker">Your progression starts here</p><h2>Train like an<br /><em>athlete.</em></h2></div><p>Begin with your current level. ICC will help you choose the training path that matches where you are and where you want to go.</p><a className="button" href="/book-trial">Book a trial <ArrowUpRight aria-hidden="true" /></a></section>
    <SiteFooter />
  </main>;
}
