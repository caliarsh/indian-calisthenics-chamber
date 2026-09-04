/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AssessmentForm } from '@/components/assessment-form';

export const metadata: Metadata = {
  title: 'Fitness Assessment | Indian Calisthenics Chamber',
  description: 'Complete five simple strength tests to find your indicative ICC training level.',
};

export default function AssessmentPage() {
  return (
    <main className="assessment-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Indian Calisthenics Chamber home">
          <span className="brand-mark" aria-hidden="true">ICC</span>
          <span className="brand-name">Indian Calisthenics<br />Chamber</span>
        </a>
        <nav className="main-nav" aria-label="Assessment navigation">
          <a href="/#programs">Programs</a>
          <a href="/#coaches">Coaches</a>
          <a aria-current="page" href="/assessment">Assessment</a>
        </nav>
        <a className="button button-small" href="/#trial">Book a trial <ArrowUpRight size={16} /></a>
      </header>

      <section className="assessment-hero">
        <a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a>
        <p className="section-kicker">ICC level finder</p>
        <h1>Know where<br />to <em>begin.</em></h1>
        <div className="assessment-intro">
          <p>Complete five simple tests and receive an indicative L1, L2, or L3 training level. Your results stay on this device and are never stored.</p>
          <div className="safety-note"><ShieldCheck aria-hidden="true" /><span><strong>Train safely.</strong> Warm up first, use clean form, and stop immediately if you feel pain or dizziness.</span></div>
        </div>
      </section>

      <AssessmentForm />

      <section className="rubric-note">
        <span>About this assessment</span>
        <p>This is an indicative placement tool, not a medical assessment or certification. A coach may recommend a different starting level after seeing you move.</p>
      </section>
    </main>
  );
}
