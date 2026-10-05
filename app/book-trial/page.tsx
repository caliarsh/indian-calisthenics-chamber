/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { TrialForm } from '@/components/trial-form';

export const metadata: Metadata = { title: 'Book a Calisthenics Trial | ICC', description: 'Book an ICC calisthenics trial in Bengaluru or Hyderabad, or request a free online coaching consultation.', alternates: { canonical: '/book-trial' } };

export default function BookTrialPage() {
  return <main className="booking-page"><SiteHeader />
    <section className="booking-shell" id="top">
      <div className="booking-intro"><a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a><p className="section-kicker">One clear first step</p><h1>Start your<br /><em>ICC journey.</em></h1><p>Leave your name and mobile number. The ICC team will contact you and help choose the right training path.</p></div>
      <div className="form-wrap"><div className="form-heading"><span>Request a callback</span><small>Takes less than 30 seconds</small></div><TrialForm /></div>
    </section><SiteFooter />
  </main>;
}
