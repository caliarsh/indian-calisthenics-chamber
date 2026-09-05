/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import {
  AtSign,
  ArrowDown,
  ArrowUpRight,
} from 'lucide-react';
import { ProgramExplorer } from '@/components/program-explorer';
import { ReviewsExplorer } from '@/components/reviews-explorer';
import { ScheduleExplorer } from '@/components/schedule-explorer';
import { TrialForm } from '@/components/trial-form';
import { coaches, siteConfig } from '@/lib/site-config';

const method = [
  { number: '01', title: 'Assess', copy: 'We understand your movement, strength, training history, and goal.' },
  { number: '02', title: 'Build', copy: 'You train the foundations your next progression actually requires.' },
  { number: '03', title: 'Practise', copy: 'Every session balances focused skill work with repeatable strength.' },
  { number: '04', title: 'Progress', copy: 'Clear benchmarks show when it is time to move forward—not guesswork.' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Indian Calisthenics Chamber home">
          <span className="brand-mark" aria-hidden="true">ICC</span>
          <span className="brand-name">Indian Calisthenics<br />Chamber</span>
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#programs">Programs</a>
          <a href="#method">Our method</a>
          <a href="#coaches">Coaches</a>
          <a href="#reviews">Reviews</a>
          <a href="/assessment">Assessment</a>
        </nav>
        <a className="button button-small" href="#trial">Book a trial <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-monogram" aria-hidden="true">ICC</div>
        <div className="hero-rig" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-content">
          <p className="eyebrow"><span /> Movement. Strength. Control.</p>
          <h1>Build a body<br />that can <em>move.</em></h1>
          <p className="hero-copy">Structured calisthenics coaching for every level—from your first push-up to skills you once thought impossible.</p>
          <div className="hero-actions">
            <a className="button" href="#trial">Book your trial <ArrowUpRight size={18} /></a>
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
        <ProgramExplorer />
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
        <div className="coach-grid">
          {coaches.map((coach) => (
            <article className="coach-card" key={coach.name}>
              <div className="coach-portrait" aria-hidden="true"><span>{coach.initials}</span></div>
              <div className="coach-card-body">
                <div className="coach-meta"><span>{coach.role}</span></div>
                <h3>{coach.name}</h3>
                <p>{coach.description}</p>
                {coach.instagramUrl && <a href={coach.instagramUrl} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" /> {coach.instagram}</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section schedule-section" id="schedule">
        <div className="schedule-heading">
          <div>
            <p className="section-kicker">Weekly batch schedule</p>
            <h2>Find your<br /><em>training window.</em></h2>
          </div>
        </div>
        <ScheduleExplorer />
        <p className="placeholder-note">Group batches run Monday to Friday. Personal Training sessions are scheduled by appointment.</p>
      </section>

      <section className="trial-section" id="trial">
        <div className="trial-copy">
          <p className="section-kicker">Your first session</p>
          <h2>Come as<br />you are.</h2>
          <p>No prerequisites. Tell us where you are starting and what you want to achieve. We’ll help you choose the right first session.</p>
          <div className="trial-promise">
            <span>01</span><p>A coach-led introduction to movement, strength, and your next steps.</p>
          </div>
        </div>
        <div className="form-wrap">
          <div className="form-heading"><span>Book a trial</span><small>Usually takes 1 minute</small></div>
          <TrialForm />
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="reviews-heading">
          <div>
            <p className="section-kicker">Google Maps reviews</p>
            <h2>Built together.<br /><em>Rated by athletes.</em></h2>
          </div>
        </div>
        <ReviewsExplorer />
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Back to top"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
        <p>Strength is a skill. Learn it well.</p>
        <div className="footer-contact">{siteConfig.locations.map((location) => <div className="footer-location" key={location.id}><a href={location.mapsUrl} target="_blank" rel="noreferrer">{location.area}</a><a href={`tel:+${location.whatsappNumber}`}>{location.whatsappDisplay}</a></div>)}</div>
      </footer>
    </main>
  );
}
