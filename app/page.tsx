import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  MapPin,
  MoveUpRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { TrialForm } from '@/components/trial-form';
import { siteConfig } from '@/lib/site-config';

const programs = [
  {
    number: '01',
    title: 'Foundations',
    icon: CircleDot,
    copy: 'Start with movement quality. Learn the positions, joint preparation, and body awareness behind lasting strength.',
    skills: ['Push-ups & rows', 'Core control', 'Mobility basics'],
  },
  {
    number: '02',
    title: 'Strength',
    icon: MoveUpRight,
    copy: 'Build pulling, pushing, and lower-body strength through progressions matched to where you are today.',
    skills: ['Pull-ups & dips', 'Handstand strength', 'Weighted basics'],
  },
  {
    number: '03',
    title: 'Skills',
    icon: Sparkles,
    copy: 'Turn your strength into skill with patient, technical practice for balance, leverage, and control.',
    skills: ['Handstands', 'Muscle-ups', 'Levers & holds'],
  },
];

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
          <a href="#schedule">Schedule</a>
        </nav>
        <a className="button button-small" href="#trial">Book a trial <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <Image className="hero-image" src="/icc-hero.png" alt="Two calisthenics athletes practising an assisted pull-up on outdoor bars" fill sizes="100vw" priority />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
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
          <p>Every athlete starts differently. Our three training paths meet you at your current level and build the capacity for what comes next.</p>
        </div>
        <div className="program-grid">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article className="program-card" key={program.title}>
                <div className="program-top"><span>{program.number}</span><Icon aria-hidden="true" /></div>
                <h3>{program.title}</h3>
                <p>{program.copy}</p>
                <ul>{program.skills.map((skill) => <li key={skill}><Check aria-hidden="true" />{skill}</li>)}</ul>
                <a href="#trial">Start here <ArrowRight aria-hidden="true" /></a>
              </article>
            );
          })}
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

      <section className="section schedule-section" id="schedule">
        <div className="schedule-heading">
          <div>
            <p className="section-kicker">Sample weekly schedule</p>
            <h2>Find your<br /><em>training window.</em></h2>
          </div>
          <div className="location-card">
            <MapPin aria-hidden="true" />
            <div><span>Training base</span><strong>{siteConfig.location}</strong><small>{siteConfig.locationNote}</small></div>
          </div>
        </div>
        <div className="schedule-list">
          {siteConfig.schedule.map((session) => (
            <div className="schedule-row" key={`${session.days}-${session.time}`}>
              <span className="schedule-days">{session.days}</span>
              <strong>{session.time}</strong>
              <span className="schedule-level">{session.level}</span>
            </div>
          ))}
        </div>
        <p className="placeholder-note">Schedule and location are editable sample details for the academy’s first version.</p>
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

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Back to top"><span className="brand-mark" aria-hidden="true">ICC</span><span className="brand-name">Indian Calisthenics<br />Chamber</span></a>
        <p>Strength is a skill. Learn it well.</p>
        <div className="footer-contact"><span>{siteConfig.location}</span><span>{siteConfig.whatsappDisplay}</span></div>
      </footer>
    </main>
  );
}
