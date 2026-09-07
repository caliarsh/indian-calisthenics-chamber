/* oxlint-disable next/no-html-link-for-pages -- static-export links */
import type { Metadata } from 'next';
import { ArrowUpRight, Award, BookOpen, Clock3, MapPin, UsersRound } from 'lucide-react';
import { InternshipApplicationForm } from '@/components/community-forms';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { trainerInternship } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'ICC Trainer Internship | Indian Calisthenics Chamber',
  description: 'Apply for ICC’s six-month practical calisthenics trainer internship in Bengaluru or Hyderabad.',
};

export default function TrainerInternshipPage() {
  return <main className="initiative-page internship-page">
    <SiteHeader />
    <section className="initiative-hero" id="top">
      <div><p className="eyebrow"><span /> Six months · Bengaluru or Hyderabad</p><h1>Become a<br /><em>certified trainer.</em></h1><p>Become an ICC-certified calisthenics trainer through theory, supervised practice, and feedback inside an ICC training environment. Learn how to assess, program, coach, and progress athletes responsibly.</p><div className="hero-actions"><a className="button" href="#apply">Apply for the internship <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#curriculum">View curriculum</a></div></div>
      <aside aria-label="Program summary"><span>ICC trainer internship</span><strong>{trainerInternship.duration}</strong><p>Practical learning in Bengaluru and Hyderabad</p></aside>
    </section>

    <section className="initiative-facts" aria-label="Internship highlights"><span><Clock3 aria-hidden="true" /> Six-month pathway</span><span><MapPin aria-hidden="true" /> Two ICC locations</span><span><UsersRound aria-hidden="true" /> Supervised floor practice</span><span><Award aria-hidden="true" /> ICC completion assessment</span></section>

    <section className="section initiative-intro">
      <div><p className="section-kicker">Learn the work behind the title</p><h2>Theory meets<br /><em>the training floor.</em></h2></div>
      <div><p>The internship is designed for calisthenics athletes, fitness trainers, students, and serious enthusiasts who want to understand coaching—not just collect exercises. Interns learn to observe movement, communicate clearly, build suitable progressions, and make responsible training decisions.</p><p>Sessions combine guided theory with practical observation and supervised coaching. Cohort dates, weekly attendance requirements, and fees are confirmed with the selected branch during the application process.</p></div>
    </section>

    <section className="section curriculum-section" id="curriculum">
      <div className="section-heading"><div><p className="section-kicker">What you will study</p><h2>A coach’s<br /><em>foundation.</em></h2></div><p>Six connected modules move from movement knowledge to programming, communication, and supervised application.</p></div>
      <div className="curriculum-grid">{trainerInternship.modules.map(module => <article key={module.number}><span>{module.number}</span><BookOpen aria-hidden="true" /><h3>{module.title}</h3><p>{module.description}</p></article>)}</div>
    </section>

    <section className="section internship-path">
      <div><p className="section-kicker">Six-month progression</p><h2>Learn. Assist.<br /><em>Coach.</em></h2><p>Interns progress only when the fundamentals are clear and the practical standard is ready.</p></div>
      <ol><li><span>Months 01–02</span><h3>Study and observe</h3><p>Build movement, safety, assessment, and programming knowledge while observing live coaching.</p></li><li><span>Months 03–04</span><h3>Assist and practise</h3><p>Support sessions, practise cueing, and prepare training plans under coach supervision.</p></li><li><span>Months 05–06</span><h3>Coach and demonstrate</h3><p>Lead supervised work, complete practical reviews, and present a final coaching plan.</p></li></ol>
    </section>

    <section className="section application-section" id="apply"><div className="application-copy"><p className="section-kicker">Apply to the next cohort</p><h2>Start your<br /><em>trainer journey.</em></h2><p>Tell the ICC team where you want to train and why coaching matters to you. Applications are reviewed before a place is offered.</p><div className="credential-note"><Award aria-hidden="true" /><p><strong>About the certificate</strong>ICC certification confirms completion of ICC’s internal six-month curriculum and assessments. It is not presented as a government, university, or externally accredited qualification.</p></div></div><div className="form-wrap"><div className="form-heading"><span>Internship application</span><small>Continue on WhatsApp</small></div><InternshipApplicationForm /></div></section>
    <SiteFooter />
  </main>;
}
