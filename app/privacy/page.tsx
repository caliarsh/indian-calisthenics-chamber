/* oxlint-disable next/no-html-link-for-pages -- static navigation links */
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Privacy Notice | Indian Calisthenics Chamber',
  description: 'How Indian Calisthenics Chamber uses and protects enquiry and member information.',
};

export default function PrivacyPage() {
  return <main className="privacy-page"><SiteHeader />
    <section className="privacy-hero" id="top"><a className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the academy</a><p className="section-kicker">Your information</p><h1>Privacy<br /><em>notice.</em></h1><p>We collect only the information needed to answer enquiries, arrange training, and follow up with ICC members.</p><span>Last updated: 8 September 2026</span></section>
    <section className="privacy-content">
      <article><h2>What we collect</h2><p>When you submit a form, we may collect your name, mobile number, optional email address, training preferences, goals, selected branch, assessment level, preferred date and time, and the answers you provide in an application.</p><p>We also attach limited source information such as the page you visited, referring website, and campaign tags. We do not use visitor fingerprinting or attempt to identify anonymous visitors.</p></article>
      <article><h2>Why we use it</h2><p>We use enquiry information to respond, recommend a suitable program, arrange a trial or consultation, review applications, and manage agreed follow-up. If you separately opt in to updates, we may also contact you about relevant ICC programs, events, competitions, or workshops.</p></article>
      <article><h2>Where it is kept</h2><p>Submitted information is sent securely to ICC’s customer relationship management system, Zoho Bigin, and may also appear in the WhatsApp conversation you choose to start. Access is limited to authorised ICC staff responsible for the relevant branch or program.</p></article>
      <article><h2>Website analytics</h2><p>ICC uses Cloudflare Web Analytics to understand aggregate visits, popular pages, traffic sources, device categories, countries, and website performance. This analytics service is configured not to collect visitors’ personal data.</p></article>
      <article><h2>How long we keep it</h2><ul><li>Unconverted enquiries: up to 12 months after the last interaction.</li><li>Active member information: while the membership is active.</li><li>Former member information: up to 36 months after membership ends.</li><li>Minimal suppression information may be kept to honour an opt-out request.</li></ul></article>
      <article><h2>Your choices</h2><p>You can decline promotional updates without affecting an enquiry. You may ask to access, correct, or delete eligible information, or withdraw consent for future optional communications. Withdrawal does not affect processing already completed before the request.</p></article>
      <article><h2>Contact ICC</h2><p>For a privacy request, contact ICC through Bengaluru at <a href="tel:+919902828888">+91 99028 28888</a> or Hyderabad at <a href="tel:+919319045223">+91 93190 45223</a>. Please state that your message is a privacy request so it can be routed correctly.</p></article>
    </section>
    <SiteFooter />
  </main>;
}

