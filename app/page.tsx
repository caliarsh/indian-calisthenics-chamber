/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { CoachCarousel } from '@/components/coach-carousel';

const method = [
  { number: '01', title: 'Assess', copy: 'We understand your movement, strength, training history, and goal.' },
  { number: '02', title: 'Build', copy: 'You train the foundations your next progression actually requires.' },
  { number: '03', title: 'Practise', copy: 'Every session balances focused skill work with repeatable strength.' },
  { number: '04', title: 'Progress', copy: 'Clear benchmarks show when it is time to move forward—not guesswork.' },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-media">
          <Image src="/icc-community-hero.jpeg" width={1280} height={1177} alt="Indian Calisthenics Chamber athletes and community members gathered inside the academy" priority unoptimized sizes="(max-width: 760px) 100vw, 62vw" />
        </div>
        <div className="hero-content">
          <p className="eyebrow"><span /> Movement. Strength. Control.</p>
          <h1>Build a body<br />that can <em>move.</em></h1>
          <p className="hero-copy">Structured calisthenics coaching for every level—from your first push-up to skills you once thought impossible.</p>
          <div className="hero-actions">
            <a className="button" href="/book-trial">Book your trial <ArrowUpRight size={18} /></a>
            <a className="text-link" href="#programs">Explore training <ArrowDown size={17} /></a>
          </div>
        </div>
        <div className="hero-note" aria-label="Academy approach">
          <span className="hero-note-number">01</span>
          <span>Built on progress.<br />Not shortcuts.</span>
        </div>
      </section>

      <div className="principles" aria-label="Training principles">
        <span>All levels welcome</span><i />
        <span>Coach-led sessions</span><i />
        <span>Progressive programming</span>
      </div>

      <section className="section programs-section" id="programs">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Choose your path</p>
            <h2>Train where<br />you are. <em>Grow.</em></h2>
          </div>
          <p>Choose live online coaching or train with us in person. Every program is matched to your current level and next goal.</p>
        </div>
        <div className="training-path-grid">
          <a href="/train-from-home"><Wifi aria-hidden="true" /><span>01 · Anywhere in India</span><h3>Train Online</h3><p>Personalised plans, online PT, and transformation coaching for your home or gym.</p><strong>Explore online training <ArrowUpRight /></strong></a>
          <a href="/offline-training"><Building2 aria-hidden="true" /><span>02 · Bengaluru &amp; Hyderabad</span><h3>Train at ICC</h3><p>Group classes, personal training, batch timings, locations, pricing, and reviews.</p><strong>Explore offline training <ArrowUpRight /></strong></a>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-lead">
          <p className="section-kicker">The ICC method</p>
          <h2>Skill is built.<br /><em>Rep by rep.</em></h2>
          <p>Good training is not random. We build strength and skill in a sequence your body can own.</p>
        </div>
        <ol className="method-list">
          {method.map((step) => (
            <li key={step.title}>
              <span>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.copy}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section coaches-section" id="coaches">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Meet the coaches</p>
            <h2>Guidance that<br /><em>moves you.</em></h2>
          </div>
          <p>Clear feedback, patient progressions, and coaching that respects where every athlete begins.</p>
        </div>
        <figure className="coach-team-photo">
          <Image src="/icc-coaches.jpeg" width={1280} height={900} alt="ICC coaches and athletes posing together inside the training facility" unoptimized sizes="(max-width: 760px) 100vw, 88vw" />
        </figure>
        <CoachCarousel />
      </section>

      <section className="home-assessment section"><ClipboardCheck aria-hidden="true" /><div><p className="section-kicker">ICC fitness assessment</p><h2>Know where<br /><em>to begin.</em></h2><p>Test strength, endurance, mobility, and flexibility to receive an indicative L1, L2, or L3 starting level.</p></div><a className="button" href="/assessment">Test your current level <ArrowUpRight /></a></section>
      <SiteFooter />
    </main>
  );
}
