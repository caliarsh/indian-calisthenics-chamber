/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { AssessmentForm } from '@/components/assessment-form';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Fitness Assessment | Indian Calisthenics Chamber',
  description: 'Complete the ICC strength, endurance, mobility, and flexibility assessment to find your indicative training level.',
};

export default function AssessmentPage() {
  return (
    <main className="assessment-page">
      <SiteHeader />

      <section className="assessment-hero">
        <a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a>
        <p className="section-kicker">ICC level finder</p>
        <h1>Know where<br />to <em>begin.</em></h1>
        <div className="assessment-intro">
          <p>Complete the academy’s strength, endurance, mobility, and flexibility checks to receive an indicative L1, L2, or L3 training level. Your results stay on this device and are never stored.</p>
          <div className="safety-note"><ShieldCheck aria-hidden="true" /><span><strong>Train safely.</strong> Warm up first, use clean form, and stop immediately if you feel pain or dizziness.</span></div>
        </div>
      </section>

      <AssessmentForm />

      <section className="rubric-note">
        <span>About this assessment</span>
        <p>This digital assessment follows ICC’s academy assessment sheet. It is an indicative placement tool, not a medical assessment or certification. A coach may recommend a different starting level after seeing you move.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
