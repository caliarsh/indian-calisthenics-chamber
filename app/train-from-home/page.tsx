/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { OnlinePricingExplorer } from '@/components/online-pricing-explorer';

export const metadata: Metadata = {
  title: 'Online Calisthenics Coaching in India | ICC',
  description: 'Personalised online calisthenics coaching in India and worldwide. Train at home or your gym with custom plans, live PT, and coach support from ICC.',
  alternates: { canonical: '/train-from-home' },
  openGraph: { title: 'Online Calisthenics Coaching in India | ICC', description: 'Custom calisthenics plans and live online PT for your home or gym.', url: '/train-from-home', images: ['/online-coaching/online-hero.jpg'] },
};

const steps = [
  { number: '01', title: 'Assess', copy: 'Complete the free ICC fitness assessment to understand your current level.' },
  { number: '02', title: 'Consult', copy: 'Talk with an ICC coach for 15 minutes about your setup, goal, and schedule.' },
  { number: '03', title: 'Match', copy: 'Get a clear recommendation instead of paying for more coaching than you need.' },
  { number: '04', title: 'Train', copy: 'Follow your plan at home or in your gym with the agreed level of coach support.' },
];

export default function TrainFromHomePage() {
  return (
    <main className="online-page">
      <SiteHeader />

      <section className="online-hero" id="top">
        <div className="online-hero-media" aria-hidden="true">
          <Image src="/online-coaching/online-hero.jpg" alt="" fill priority unoptimized sizes="100vw" />
        </div>
        <div className="online-hero-scrim" aria-hidden="true" />
        <div className="online-hero-content">
          <a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a>
          <p className="eyebrow"><span /> Personalised ICC online coaching</p>
          <h1>Learn calisthenics<br /><em>from anywhere.</em></h1>
          <div className="hero-actions">
            <a className="button" href="#plans">View plans &amp; pricing <ArrowDown size={17} /></a>
          </div>
        </div>
        <aside className="online-hero-summary" aria-label="How online coaching begins">
          <span>Coaching without borders</span>
          <strong>India to the<br />world</strong>
          <p>ICC coaching has transformed athletes across India and in the United States, United Kingdom, Germany, and beyond.</p>
        </aside>
      </section>

      <section className="online-offers online-pricing-section section" id="plans" aria-labelledby="online-pricing-title">
        <div className="online-section-heading offer-heading"><div><p className="section-kicker">Online coaching prices</p><h2 id="online-pricing-title">Choose your <em>plan.</em></h2></div></div>
        <OnlinePricingExplorer />
      </section>

      <section className="online-process section" id="process" aria-labelledby="online-process-title">
        <div className="online-section-heading">
          <p className="section-kicker">How it works</p>
          <h2 id="online-process-title">Start free. <em>Train clearly.</em></h2>
        </div>
        <ol>
          {steps.map((step) => (
            <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="online-final-cta section"><div><p className="section-kicker">Free assessment + consultation</p><h2>Find your<br /><em>next step.</em></h2><p>Tell us your level, setup, and goal on the dedicated booking page. Select a date and time for a free 15-minute call before we recommend an offer.</p></div><div className="hero-actions"><a className="button" href="/book-trial?mode=Online">Book a free consultation <ArrowUpRight /></a><a className="text-link" href="/assessment?path=online">Take the assessment first</a></div></section>

      <SiteFooter />
    </main>
  );
}
