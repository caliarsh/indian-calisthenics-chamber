'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { offlineOffers, type OfflineOffer } from '@/lib/site-config';

const trainers = ['Arsh', 'Abhishek', 'Other ICC coach'] as const;
type Trainer = (typeof trainers)[number];

function PriceCards({ offers }: { offers: readonly OfflineOffer[] }) {
  return <div className={`offline-price-grid offline-price-grid-${offers.length}`}>
    {offers.map((offer) => <article className={`offline-price-card${offer.featured ? ' offline-price-card-featured' : ''}`} key={offer.id}>
      <header className="offline-price-card-head">
        <div className="offline-price-card-meta"><span>{offer.category}</span><strong>{offer.levels}</strong></div>
        <div className="offline-price-title-row"><h3>{offer.name}</h3>{offer.highlight && <span className="offline-price-highlight">{offer.highlight}</span>}</div>
        <p>{offer.category === 'Group Classes' ? 'Structured, coach-led training for every ICC level.' : 'Focused one-to-one coaching matched to your goal.'}</p>
      </header>
      <div className="offline-price-panel">
        <div className="offline-price-total"><p className="online-price">{offer.price}</p><span>total</span></div>
        {offer.monthlyEquivalent && <strong className="offline-price-monthly">{offer.monthlyEquivalent}</strong>}
        {offer.compareAtPrice && <div className="pt-saving"><s>{offer.compareAtPrice}</s><strong>{offer.discount}</strong></div>}
        {offer.bonus && <p className="pt-bonus">{offer.bonus}</p>}
        <small>{offer.billingPeriod}</small>
        <ul>{offer.inclusions.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
        <a href={`/book-trial?mode=Offline&offer=${offer.id}`}>Choose this plan <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </article>)}
  </div>;
}

export function OfflinePricingExplorer() {
  const [trainer, setTrainer] = useState<Trainer>('Arsh');
  const groupOffers = offlineOffers.filter((offer) => offer.category === 'Group Classes');
  const ptOffers = offlineOffers.filter((offer) => offer.category === 'Personal Training' && offer.trainer === trainer);

  return <Tabs className="pricing-tabs" defaultValue="group">
    <TabsList className="pricing-tab-list" aria-label="Choose group classes or personal training">
      <TabsTrigger className="pricing-tab-trigger" value="group">Group Classes</TabsTrigger>
      <TabsTrigger className="pricing-tab-trigger" value="pt">Personal Training</TabsTrigger>
    </TabsList>

    <TabsContent className="pricing-tab-content" value="group">
      <PriceCards offers={groupOffers} />
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
