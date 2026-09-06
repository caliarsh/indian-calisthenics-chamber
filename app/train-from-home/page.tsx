/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import type { Metadata } from 'next';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Dumbbell,
  Home,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { onlineOffers, type OnlineOfferCategory } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Train From Home or Your Gym | Indian Calisthenics Chamber',
  description: 'Personalised online calisthenics workout plans, diet plans, and live PT from Indian Calisthenics Chamber. Start with a free assessment and consultation.',
};

const steps = [
  { number: '01', title: 'Assess', copy: 'Complete the free ICC fitness assessment to understand your current level.' },
  { number: '02', title: 'Consult', copy: 'Talk with an ICC coach for 15 minutes about your setup, goal, and schedule.' },
  { number: '03', title: 'Match', copy: 'Get a clear recommendation instead of paying for more coaching than you need.' },
  { number: '04', title: 'Train', copy: 'Follow your plan at home or in your gym with the agreed level of coach support.' },
];

const offerSections: { category: OnlineOfferCategory; id: string; kicker: string; title: string; copy: string }[] = [
  { category: 'Custom Plans', id: 'plans', kicker: 'Plans with four weeks of support', title: 'A plan built around you.', copy: 'Weekly check-ins and adjustments keep your training or nutrition plan useful after day one.' },
  { category: 'Online PT', id: 'pt', kicker: 'Live one-to-one coaching', title: 'Technique needs feedback.', copy: 'Every session is 60 minutes and scheduled with your coach. Larger packs lower the per-session rate.' },
];

function OfferCard({ offer }: { offer: (typeof onlineOffers)[number] }) {
  return (
    <article className="online-offer-card">
      <div className="online-offer-top">
        <span>{offer.duration}</span>
        {offer.badge && <strong>{offer.badge}</strong>}
      </div>
      <h3>{offer.name}</h3>
      <div className="online-price-row"><p className="online-price">{offer.price}</p>{offer.compareAtPrice && <s>{offer.compareAtPrice}</s>}</div>
      <p className="online-offer-description">{offer.description}</p>
      <ul>
        {offer.inclusions.map((inclusion) => <li key={inclusion}><Check aria-hidden="true" /> {inclusion}</li>)}
      </ul>
      <a href={`/book-trial?mode=Online&offer=${offer.id}`}>Discuss this plan <ArrowUpRight aria-hidden="true" /></a>
    </article>
  );
}

export default function TrainFromHomePage() {
  const transformation = onlineOffers.find((offer) => offer.category === 'Transformation');

  return (
    <main className="online-page">
      <SiteHeader />

      <section className="online-hero" id="top">
        <div className="online-hero-grid" aria-hidden="true" />
        <div className="online-hero-mark" aria-hidden="true">ONLINE</div>
        <div className="online-hero-content">
          <a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a>
          <p className="eyebrow"><span /> Personalised ICC online coaching</p>
          <h1>Train from home.<br /><em>Or your gym.</em></h1>
          <p>Get a plan built for your level, equipment, and goal—then add the coach support you need to keep progressing.</p>
          <div className="hero-actions">
            <a className="button" href="/assessment?path=online">Take the free assessment <ArrowUpRight size={18} /></a>
            <a className="text-link" href="#plans">Explore coaching options <ArrowDown size={17} /></a>
          </div>
        </div>
        <aside className="online-hero-summary" aria-label="How online coaching begins">
          <span>Start free</span>
          <strong>Assessment +<br />15-minute call</strong>
          <p>No purchase before your coach recommendation.</p>
        </aside>
      </section>

      <section className="online-audience section" aria-labelledby="training-anywhere-title">
        <div className="online-section-heading">
          <p className="section-kicker">Your space. Your program.</p>
          <h2 id="training-anywhere-title">Built for where<br /><em>you train.</em></h2>
        </div>
        <div className="audience-grid">
          <article>
            <Home aria-hidden="true" />
            <span>01</span>
            <h3>Home training</h3>
            <p>Start with bodyweight and the equipment you already have. Your plan adapts to your space instead of assuming a full gym.</p>
          </article>
          <article>
            <Dumbbell aria-hidden="true" />
            <span>02</span>
            <h3>Your gym</h3>
            <p>Use the bars, weights, rings, and machines available to build calisthenics strength with a clear progression plan.</p>
          </article>
        </div>
      </section>

      <section className="online-process section" id="process" aria-labelledby="online-process-title">
        <div className="online-section-heading">
          <p className="section-kicker">How it works</p>
          <h2 id="online-process-title">Start free.<br /><em>Choose clearly.</em></h2>
          <p>Assessment comes before payment, so the offer is matched to your current level and the support you actually need.</p>
        </div>
        <ol>
          {steps.map((step) => (
            <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>
          ))}
        </ol>
      </section>

      {offerSections.map((section) => {
        const offers = onlineOffers.filter((offer) => offer.category === section.category);
        return (
          <section className="online-offers section" id={section.id} key={section.category} aria-labelledby={`${section.id}-title`}>
            <div className="online-section-heading offer-heading">
              <div><p className="section-kicker">{section.kicker}</p><h2 id={`${section.id}-title`}>{section.title}</h2></div>
              <p>{section.copy}</p>
            </div>
            <div className={`online-offer-grid online-offer-grid-${offers.length}`}>{offers.map((offer) => <OfferCard offer={offer} key={offer.id} />)}</div>
          </section>
        );
      })}

      {transformation && (
        <section className="transformation-section section" aria-labelledby="transformation-title">
          <div className="transformation-number" aria-hidden="true">12</div>
          <div className="transformation-copy">
            <p className="section-kicker">{transformation.duration} · {transformation.badge}</p>
            <h2 id="transformation-title">Full<br /><em>Transformation.</em></h2>
            <p>{transformation.description}</p>
          </div>
          <div className="transformation-offer">
            <div><span>Complete coaching path</span><strong>{transformation.price}</strong></div>
            <ul>{transformation.inclusions.map((inclusion) => <li key={inclusion}><Check aria-hidden="true" /> {inclusion}</li>)}</ul>
            <a className="button" href={`/book-trial?mode=Online&offer=${transformation.id}`}>Discuss transformation <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>
      )}

      <section className="online-final-cta section"><div><p className="section-kicker">Free assessment + consultation</p><h2>Find your<br /><em>next step.</em></h2><p>Tell us your level, setup, and goal on the dedicated booking page. Select a date and time for a free 15-minute call before we recommend an offer.</p></div><div className="hero-actions"><a className="button" href="/book-trial?mode=Online">Book a free consultation <ArrowUpRight /></a><a className="text-link" href="/assessment?path=online">Take the assessment first</a></div></section>

      <section className="online-disclaimer">
        <span>Before you begin</span>
        <p>The ICC assessment is an indicative training placement tool, not a medical assessment. Diet plans provide general coaching guidance and are not medical nutrition treatment. Speak with a qualified healthcare professional about medical conditions or dietary restrictions.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
