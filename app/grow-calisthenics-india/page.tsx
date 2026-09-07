/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, HandHeart, IndianRupee, ShieldCheck, Sparkles } from 'lucide-react';
import { SupportForm } from '@/components/community-forms';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { supportInitiatives } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Grow Calisthenics in India | Indian Calisthenics Chamber',
  description: 'Support ICC athletes, community workshops, and competition opportunities that grow calisthenics across India.',
};

export default function GrowCalisthenicsPage() {
  return <main className="initiative-page support-page">
    <SiteHeader />
    <section className="initiative-hero support-initiative-hero" id="top">
      <div><p className="eyebrow"><span /> Back athletes · Build access · Grow the culture</p><h1>Help India<br /><em>move.</em></h1><p>Support athletes travelling to competitions, free community workshops, and stronger platforms for calisthenics across India.</p><div className="hero-actions"><a className="button button-light" href="#support">Support the mission <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#impact">See the impact areas</a></div></div>
      <aside aria-label="Support approach"><span>Built around clear needs</span><strong>3</strong><p>Athletes · Workshops · Competitions</p></aside>
    </section>

    <section className="initiative-facts" aria-label="Funding principles"><span><HandHeart aria-hidden="true" /> Athlete-first support</span><span><IndianRupee aria-hidden="true" /> Contribution discussed directly</span><span><ShieldCheck aria-hidden="true" /> Verify before payment</span></section>

    <section className="section initiative-intro">
      <div><p className="section-kicker">Why support matters</p><h2>Talent needs<br /><em>opportunity.</em></h2></div>
      <div><p>Calisthenics can begin with a bar and bodyweight, but competition pathways still carry real costs. Registration, intercity travel, accommodation, venues, equipment, and coaching time can decide whether an athlete or community gets an opportunity.</p><p>ICC wants to connect supporters with practical needs that help athletes compete and introduce more people to safe, structured calisthenics.</p></div>
    </section>

    <section className="section impact-section" id="impact">
      <div className="section-heading"><div><p className="section-kicker">Where support can go</p><h2>Fund the next<br /><em>opportunity.</em></h2></div><p>Choose a focus or ask ICC to direct support to the most immediate approved need.</p></div>
      <div className="impact-grid">{supportInitiatives.map((initiative, index) => <article key={initiative.id}><span>{String(index + 1).padStart(2, '0')}</span><Sparkles aria-hidden="true" /><h3>{initiative.title}</h3><p>{initiative.description}</p><ul>{initiative.examples.map(example => <li key={example}>{example}</li>)}</ul></article>)}</div>
    </section>

    <section className="section funding-process"><div><p className="section-kicker">A careful first version</p><h2>Discuss. Verify.<br /><em>Then support.</em></h2></div><ol><li><span>01</span><div><h3>Choose a cause</h3><p>Select athlete costs, workshops, competitions, or the current priority.</p></div></li><li><span>02</span><div><h3>Speak with ICC</h3><p>Share your intended contribution or partnership idea through the form below.</p></div></li><li><span>03</span><div><h3>Confirm the details</h3><p>ICC confirms the purpose and verified payment destination before any transfer.</p></div></li><li><span>04</span><div><h3>Support the work</h3><p>Contribute only after the recipient and intended use have been confirmed directly.</p></div></li></ol></section>

    <section className="section application-section" id="support"><div className="application-copy"><p className="section-kicker">Support or partner with ICC</p><h2>Put support<br /><em>into motion.</em></h2><p>Individuals, brands, venues, and service partners can start here. Tell us what you would like to support and the ICC team will respond on WhatsApp.</p><div className="credential-note"><ShieldCheck aria-hidden="true" /><p><strong>Payment safety</strong>This page does not take payments and does not claim charitable tax benefits. Verify the recipient, purpose, and payment details directly with ICC before transferring funds.</p></div></div><div className="form-wrap"><div className="form-heading"><span>Support enquiry</span><small>No payment taken here</small></div><SupportForm /></div></section>
    <SiteFooter />
  </main>;
}
