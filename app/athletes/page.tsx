/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, BedDouble, Medal, Plane, Target, TicketCheck, Trophy, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { AthleteApplicationForm } from '@/components/community-forms';
import { EditorialImage } from '@/components/editorial-photo';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { siteImages } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Our Athletes | Indian Calisthenics Chamber',
  description: 'Meet the athlete culture developed at Indian Calisthenics Chamber across strength, skills, and competition preparation.',
};

const culture = [
  { icon: Target, title: 'Train with standards', copy: 'Every repetition is coached with clear movement standards, not just completed for a number.' },
  { icon: UsersRound, title: 'Grow together', copy: 'Athletes share the floor, exchange feedback, and learn to raise the quality of the room together.' },
  { icon: Medal, title: 'Prepare to perform', copy: 'Training develops the composure, consistency, and decision-making required on competitive platforms.' },
] as const;

const hallOfFameAthletes = [
  {
    id: 'arsh',
    name: 'Arsh',
    discipline: 'Weighted Endurance · Street Lifting · Statics',
    image: {
      src: '/coaches/arsh.jpg',
      alt: 'Arsh at a weighted calisthenics competition, holding the pull-up bar before an attempt.',
      width: 970,
      height: 1621,
      position: '50% 34%',
    },
    featured: true,
    achievements: [
      {
        label: '2026',
        items: [
          'Won 1st place in Street Lifting at Ground Zero.',
          'Finished 2nd runner-up in the Middleweight Statics category.',
          'Served as Head Judge at OG Bar Wars 1.0.',
        ],
      },
      {
        label: '2025',
        items: [
          'Represented India at the WSWCF Weighted Endurance Calisthenics World Championship in Bulgaria.',
          'Finished 1st runner-up in Weighted Endurance at the WSWCF Qualifier organised by SISCA.',
          'Served as Head Judge at OG Bar Wars 1.0.',
        ],
      },
      {
        label: '2024',
        items: ['Finished 2nd runner-up in Street Lifting at Battle of Nerve 2.0.'],
      },
    ],
  },
  {
    id: 'krishna',
    name: 'Krishna',
    discipline: 'Freestyle · Statics',
    image: {
      src: '/athletes/krishna.jpg',
      alt: 'Krishna posing on an outdoor calisthenics structure.',
      width: 854,
      height: 1280,
      position: '50% 42%',
    },
    featured: false,
    achievements: [
      {
        label: '2026',
        items: [
          'Won 1st place in Middleweight Freestyle at Limitless.',
          'Won 1st place in Middleweight Freestyle at Calibre.',
          'Finished 1st runner-up in Statics at Calibre.',
        ],
      },
      {
        label: '2025',
        items: ['Finished 1st runner-up in Freestyle at Caligames 3.0.'],
      },
    ],
  },
  {
    id: 'durga',
    name: 'Durga',
    discipline: 'Statics · Freestyle · Endurance',
    image: {
      src: '/athletes/durga.jpg',
      alt: 'Durga in a black-and-white full-body athlete portrait.',
      width: 738,
      height: 738,
      position: '50% 50%',
    },
    featured: false,
    achievements: [
      {
        label: '2026',
        items: [
          'Won 1st place in Endurance at Raw Strength Calisthenics.',
          'Won 1st place in Freestyle at Raw Strength Calisthenics.',
        ],
      },
      {
        label: '2025',
        items: ['Finished 1st runner-up in Statics at KCA Battle of Nerve 2.0.'],
      },
      {
        label: '2024',
        items: ['Won 1st place in Freestyle at KCA Battle of Nerve.'],
      },
    ],
  },
  {
    id: 'aakash',
    name: 'Aakash',
    discipline: 'Freestyle · Statics',
    image: {
      src: '/athletes/aakash.jpg',
      alt: 'Aakash holding a freestyle championship trophy on the competition podium.',
      width: 523,
      height: 1570,
      position: '50% 34%',
    },
    featured: false,
    achievements: [
      {
        label: '2026',
        items: ['Won 1st place in Lightweight Freestyle at Calibre.'],
      },
    ],
  },
  {
    id: 'samuel',
    name: 'Samuel',
    discipline: 'Weighted Endurance',
    image: {
      src: '/athletes/samuel.jpg',
      alt: 'Samuel in a dark athlete portrait with a circular light backdrop.',
      width: 738,
      height: 760,
      position: '50% 50%',
    },
    featured: false,
    achievements: [
      {
        label: '2025',
        items: ['Finished 1st runner-up in Weighted Endurance at OG Bar Wars.'],
      },
    ],
  },
] as const;

function AchievementList({ achievements }: { achievements: (typeof hallOfFameAthletes)[number]['achievements'] }) {
  return <ol className="hall-achievement-list">
    {achievements.map((group) => <li key={group.label}>
      <strong>{group.label}</strong>
      <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
    </li>)}
  </ol>;
}

export default function AthletesPage() {
  return <main className="athletes-page">
    <SiteHeader />
    <section className="athletes-hero" id="top">
      <div className="athletes-hero-mark" aria-hidden="true">ICC</div>
      <p className="eyebrow"><span /> Built inside the chamber</p>
      <h1>Our<br /><em>Athletes.</em></h1>
      <p>ICC has an athlete-rich culture built through ambitious training, shared standards, and years of disciplined work. The academy has helped produce national-level athletes across multiple calisthenics disciplines while continuing to develop the next generation.</p>
      <div className="hero-actions"><a className="button" href="#apply">Apply to be an ICC athlete <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#hall-of-fame">View the Hall of Fame</a></div>
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

    <section className="athlete-photo-story section" aria-labelledby="athlete-photo-story-title">
      <div className="section-heading athlete-photo-story-heading">
        <div><p className="section-kicker">Inside the athlete culture</p><h2 id="athlete-photo-story-title">The work.<br /><em>The team. The stage.</em></h2></div>
        <p>Training partners, coaches, and competition days are all part of the same process. These moments show the culture surrounding ICC athletes beyond a list of disciplines.</p>
      </div>
      <div className="athlete-photo-grid">
        {siteImages.athletes.map((image, index) => <EditorialImage {...image} className={`athlete-story-photo athlete-story-photo-${index + 1}`} sizes={index === 0 ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 900px) 100vw, 42vw'} key={image.src} />)}
      </div>
    </section>

    <section className="hall-of-fame section" id="hall-of-fame">
      <div className="section-heading hall-of-fame-heading"><div><p className="section-kicker">ICC Hall of Fame</p><h2>Earned on<br /><em>the platform.</em></h2></div><p>Five ICC athletes. One record of disciplined training, competitive courage, and high standards.</p></div>
      <article className="hall-of-fame-feature">
        <figure><Image src={hallOfFameAthletes[0].image.src} alt={hallOfFameAthletes[0].image.alt} width={hallOfFameAthletes[0].image.width} height={hallOfFameAthletes[0].image.height} sizes="(max-width: 900px) 100vw, 46vw" style={{ objectPosition: hallOfFameAthletes[0].image.position }} unoptimized /></figure>
        <div className="hall-of-fame-copy">
          <div className="hall-of-fame-label"><Trophy aria-hidden="true" /><span>01 · Hall of Fame</span></div>
          <h3>{hallOfFameAthletes[0].name}</h3>
          <p>{hallOfFameAthletes[0].discipline}</p>
          <AchievementList achievements={hallOfFameAthletes[0].achievements} />
        </div>
      </article>
      <div className="hall-of-fame-grid">
        {hallOfFameAthletes.slice(1).map((athlete, index) => <article className="hall-of-fame-card" key={athlete.id}>
          <figure><Image src={athlete.image.src} alt={athlete.image.alt} width={athlete.image.width} height={athlete.image.height} sizes="(max-width: 900px) 100vw, 24vw" style={{ objectPosition: athlete.image.position }} unoptimized /></figure>
          <div className="hall-of-fame-copy">
            <div className="hall-of-fame-label"><Trophy aria-hidden="true" /><span>{String(index + 2).padStart(2, '0')} · Hall of Fame</span></div>
            <h3>{athlete.name}</h3>
            <p>{athlete.discipline}</p>
            <AchievementList achievements={athlete.achievements} />
          </div>
        </article>)}
      </div>
    </section>

    <section className="section athlete-support-section"><div><p className="section-kicker">Selected athlete support</p><h2>Train hard.<br /><em>We back the journey.</em></h2><p>For approved competitions, selected ICC athletes receive ICC funding for the costs that make participation possible.</p></div><div className="athlete-support-grid"><article><TicketCheck aria-hidden="true" /><h3>Registration</h3><p>Approved competition registration fees funded by ICC.</p></article><article><Plane aria-hidden="true" /><h3>Travel</h3><p>Approved intercity travel for eligible competitive events.</p></article><article><BedDouble aria-hidden="true" /><h3>Stay</h3><p>Accommodation funded when approved events require it.</p></article></div></section>

    <section className="section application-section athlete-application-section" id="apply"><div className="application-copy"><p className="section-kicker">Apply to represent ICC</p><h2>Earn your place.<br /><em>Raise the standard.</em></h2><p>Tell us about your discipline, competition experience, and the athlete you want to become. The pathway is selective and built for people ready to train consistently, respect the team, and represent ICC well.</p><div className="credential-note"><BadgeCheck aria-hidden="true" /><p><strong>How selection works</strong>ICC reviews readiness, conduct, consistency, event eligibility, and competitive potential. Submitting an application does not guarantee selection or funding.</p></div></div><div className="form-wrap"><div className="form-heading"><span>Athlete application</span><small>Continue on WhatsApp</small></div><AthleteApplicationForm /></div></section>
    <SiteFooter />
  </main>;
}
