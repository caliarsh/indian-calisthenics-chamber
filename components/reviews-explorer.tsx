'use client';

import { ArrowUpRight, Quote, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/lib/site-config';

export function ReviewsExplorer() {
  return (
    <Tabs className="reviews-tabs" defaultValue={siteConfig.locations[0].id}>
      <TabsList className="reviews-tab-list" aria-label="Review location">
        {siteConfig.locations.map((location) => (
          <TabsTrigger className="reviews-tab-trigger" value={location.id} key={location.id}>{location.name}</TabsTrigger>
        ))}
      </TabsList>

      {siteConfig.locations.map((location) => (
        <TabsContent className="reviews-tab-content" value={location.id} key={location.id}>
          <div className="reviews-location-heading">
            <div><span>Member feedback</span><strong>{location.area}</strong></div>
            <div className="rating-summary" aria-label={`${location.googleRating} out of 5 from ${location.googleReviewCount} Google reviews`}>
              <strong>{location.googleRating}</strong>
              <div>
                <span className="rating-stars" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <Star key={index} />)}</span>
                <small>{location.googleReviewCount} reviews on Google</small>
              </div>
            </div>
          </div>
          <div className="review-grid">
            {location.reviews.map((review) => (
              <article className="review-card" key={review.author}>
                <Quote aria-hidden="true" />
                <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }).map((_, index) => <Star key={index} aria-hidden="true" />)}</div>
                <blockquote>“{review.quote}”</blockquote>
                <p>{review.author}<span>Google review · {location.name}</span></p>
              </article>
            ))}
          </div>
          <a className="button reviews-button" href={location.mapsUrl} target="_blank" rel="noreferrer">Read all {location.googleReviewCount} {location.name} reviews <ArrowUpRight aria-hidden="true" /></a>
        </TabsContent>
      ))}
    </Tabs>
  );
}
