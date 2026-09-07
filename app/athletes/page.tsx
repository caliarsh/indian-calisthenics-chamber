/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, BedDouble, Medal, Plane, Target, TicketCheck, UsersRound } from 'lucide-react';
import { AthleteApplicationForm } from '@/components/community-forms';
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
      <div className="hero-actions"><a className="button" href="#apply">Apply to be an ICC athlete <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#profiles">Meet the athlete culture</a></div>
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

    <section className="section athlete-support-section"><div><p className="section-kicker">Selected athlete support</p><h2>Train hard.<br /><em>We back the journey.</em></h2><p>For approved competitions, selected ICC athletes receive ICC funding for the costs that make participation possible.</p></div><div className="athlete-support-grid"><article><TicketCheck aria-hidden="true" /><h3>Registration</h3><p>Approved competition registration fees funded by ICC.</p></article><article><Plane aria-hidden="true" /><h3>Travel</h3><p>Approved intercity travel for eligible competitive events.</p></article><article><BedDouble aria-hidden="true" /><h3>Stay</h3><p>Accommodation funded when approved events require it.</p></article></div></section>

    <section className="section application-section athlete-application-section" id="apply"><div className="application-copy"><p className="section-kicker">Apply to represent ICC</p><h2>Earn your place.<br /><em>Raise the standard.</em></h2><p>Tell us about your discipline, competition experience, and the athlete you want to become. The pathway is selective and built for people ready to train consistently, respect the team, and represent ICC well.</p><div className="credential-note"><BadgeCheck aria-hidden="true" /><p><strong>How selection works</strong>ICC reviews readiness, conduct, consistency, event eligibility, and competitive potential. Submitting an application does not guarantee selection or funding.</p></div></div><div className="form-wrap"><div className="form-heading"><span>Athlete application</span><small>Continue on WhatsApp</small></div><AthleteApplicationForm /></div></section>
    <SiteFooter />
  </main>;
}
