/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowLeft, ClipboardCheck, MessageCircle } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { TrialForm } from '@/components/trial-form';

export const metadata: Metadata = { title: 'Book a Trial | Indian Calisthenics Chamber', description: 'Book an ICC offline trial or free online coaching consultation.' };

export default function BookTrialPage() {
  return <main className="booking-page"><SiteHeader />
    <section className="booking-shell" id="top">
      <div className="booking-intro"><a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a><p className="section-kicker">One clear first step</p><h1>Book your<br /><em>first session.</em></h1><p>Choose Online or Offline and tell us where you are starting. We’ll prepare the right WhatsApp request for the relevant ICC team.</p><div className="consultation-points"><span><ClipboardCheck aria-hidden="true" /> Assessment results accepted</span><span><MessageCircle aria-hidden="true" /> Continue securely on WhatsApp</span></div><a className="text-link" href="/assessment">Not sure of your level? Take the free assessment</a></div>
      <div className="form-wrap"><div className="form-heading"><span>Training enquiry</span><small>Usually takes 1 minute</small></div><TrialForm /></div>
    </section><SiteFooter />
  </main>;
}
