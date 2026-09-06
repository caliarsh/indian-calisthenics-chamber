'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { offlineOffers, siteConfig, type OfflineOffer } from '@/lib/site-config';

const trainers = ['Arsh', 'Abhishek', 'Other ICC coach'] as const;
type Trainer = (typeof trainers)[number];

function PriceCards({ offers }: { offers: readonly OfflineOffer[] }) {
  return <div className={`offline-price-grid offline-price-grid-${offers.length}`}>
    {offers.map((offer) => <article className="offline-price-card" key={offer.id}>
      <div><span>{offer.category}</span><strong>{offer.levels}</strong></div>
      <h3>{offer.name}</h3>
      {offer.bonus && <p className="pt-bonus">{offer.bonus}</p>}
      <p className="online-price">{offer.price}</p>
      {offer.compareAtPrice && <div className="pt-saving"><s>{offer.compareAtPrice}</s><strong>{offer.discount}</strong></div>}
      <small>{offer.billingPeriod}</small>
      <ul>{offer.inclusions.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
      <a href={`/book-trial?mode=Offline&offer=${offer.id}`}>Choose this option <ArrowUpRight aria-hidden="true" /></a>
    </article>)}
  </div>;
}

export function OfflinePricingExplorer() {
  const [trainer, setTrainer] = useState<Trainer>('Arsh');
  const groupOffers = offlineOffers.filter((offer) => offer.category === 'Group Classes');
  const athleteOffer = offlineOffers.find((offer) => offer.category === 'Athlete Batch');
  const ptOffers = offlineOffers.filter((offer) => offer.category === 'Personal Training' && offer.trainer === trainer);

  return <Tabs className="pricing-tabs" defaultValue="group">
    <TabsList className="pricing-tab-list" aria-label="Choose group classes or personal training">
      <TabsTrigger className="pricing-tab-trigger" value="group">Group Classes</TabsTrigger>
      <TabsTrigger className="pricing-tab-trigger" value="pt">Personal Training</TabsTrigger>
    </TabsList>

    <TabsContent className="pricing-tab-content" value="group">
      <aside className="group-campaign">
        <div><span>Official Group Classes campaign</span><h3>See the energy<br />before you join.</h3><p>Watch ICC Group Classes in action, then choose a membership or book your first trial.</p></div>
        <a className="group-campaign-watch" href={siteConfig.groupClassesCampaign.reelUrl} target="_blank" rel="noreferrer" aria-label="Watch the official ICC Group Classes Reel on Instagram">
          <span aria-hidden="true">ICC</span>
          <strong>Group Classes</strong>
          <small>Watch official Reel</small>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </aside>
      <PriceCards offers={groupOffers} />
      {athleteOffer && <div className="athlete-price-feature">
        <div><span>Bengaluru only · L3 or coach-approved</span><h3>Athlete Batch</h3><p>Performance-focused training, Monday to Friday at 5:00 PM.</p></div>
        <div><strong>{athleteOffer.price}</strong><small>per month</small><a className="button" href={`/book-trial?mode=Offline&location=bengaluru&offer=${athleteOffer.id}`}>Choose Athlete Batch <ArrowUpRight aria-hidden="true" /></a></div>
      </div>}
    </TabsContent>

    <TabsContent className="pricing-tab-content" value="pt">
      <div className="trainer-picker">
        <div><p className="section-kicker">Choose your coach</p><h3>Personal Training</h3><p>Rates differ by each coach’s years of experience, training level, and the value they provide.</p></div>
        <label htmlFor="trainer"><span>Trainer</span><NativeSelect className="form-select" id="trainer" value={trainer} onChange={(event) => setTrainer(event.target.value as Trainer)}>{trainers.map((name) => <NativeSelectOption value={name} key={name}>{name}</NativeSelectOption>)}</NativeSelect></label>
      </div>
      <PriceCards offers={ptOffers} />
    </TabsContent>
  </Tabs>;
}
