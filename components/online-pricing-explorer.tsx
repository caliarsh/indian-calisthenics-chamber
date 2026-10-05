'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { onlineOffers, type OnlineOffer } from '@/lib/site-config';

function OfferCard({ offer }: { offer: OnlineOffer }) {
  return (
    <article className={`online-offer-card${offer.category === 'Transformation' ? ' online-offer-card-featured' : ''}`}>
      <header className="online-offer-card-head">
        <div className="online-offer-top"><span>{offer.duration}</span>{offer.badge && <strong>{offer.badge}</strong>}</div>
        <h3>{offer.name}</h3>
        <p className="online-offer-description">{offer.description}</p>
      </header>
      <div className="online-offer-panel">
        <div className="online-price-row"><p className="online-price">{offer.price}</p>{offer.compareAtPrice && <s>{offer.compareAtPrice}</s>}</div>
        {offer.monthlyPrice && <p className="online-monthly-rate">{offer.monthlyPrice}</p>}
        <ul>{offer.inclusions.map((inclusion) => <li key={inclusion}><Check aria-hidden="true" /> {inclusion}</li>)}</ul>
        <a href={`/book-trial?mode=Online&offer=${offer.id}`}>Choose this plan <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </article>
  );
}

function OfferGrid({ offers }: { offers: readonly OnlineOffer[] }) {
  return <div className={`online-offer-grid online-offer-grid-${offers.length}`}>
    {offers.map((offer) => <OfferCard offer={offer} key={offer.id} />)}
  </div>;
}

export function OnlinePricingExplorer() {
  const customPlans = onlineOffers.filter((offer) => offer.category === 'Custom Plans');
  const personalTraining = onlineOffers.filter((offer) => offer.category === 'Online PT' || offer.category === 'Transformation');

  return (
    <Tabs className="pricing-tabs online-pricing-tabs" defaultValue="plans">
      <TabsList className="pricing-tab-list" aria-label="Choose custom plans or personal training">
        <TabsTrigger className="pricing-tab-trigger" value="plans">Custom Plans</TabsTrigger>
        <TabsTrigger className="pricing-tab-trigger" value="pt">Personal Training</TabsTrigger>
      </TabsList>
      <TabsContent className="pricing-tab-content" value="plans"><OfferGrid offers={customPlans} /></TabsContent>
      <TabsContent className="pricing-tab-content" value="pt"><OfferGrid offers={personalTraining} /></TabsContent>
    </Tabs>
  );
}
