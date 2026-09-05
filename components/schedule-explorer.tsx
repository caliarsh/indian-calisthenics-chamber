'use client';

import { ArrowUpRight, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/lib/site-config';

function slug(value: string) {
  return value.replaceAll(' ', '-').toLowerCase();
}

export function ScheduleExplorer() {
  return (
    <Tabs className="location-tabs" defaultValue={siteConfig.locations[0].id}>
      <TabsList className="location-tab-list" aria-label="Training location">
        {siteConfig.locations.map((location) => (
          <TabsTrigger className="location-tab-trigger" value={location.id} key={location.id}>{location.name}</TabsTrigger>
        ))}
      </TabsList>

      {siteConfig.locations.map((location) => (
        <TabsContent className="location-tab-content" value={location.id} key={location.id}>
          <a className="location-card" href={location.mapsUrl} target="_blank" rel="noreferrer" aria-label={`Open the ${location.name} ICC training base in Google Maps`}>
            <MapPin aria-hidden="true" />
            <div><span>Training base</span><strong>{location.area}</strong>{location.address !== location.area && <small>{location.address}</small>}</div>
            <ArrowUpRight className="location-arrow" aria-hidden="true" />
          </a>

          <div className="schedule-groups">
            {location.schedule.map((group) => (
              <article className={`schedule-group schedule-group-${slug(group.category)}`} key={group.category}>
                <header className="schedule-group-heading">
                  <h3>{group.category}</h3>
                  <span>{group.modeLabel}</span>
                </header>
                {group.periods.map((period) => {
                  const headingId = `${location.id}-${slug(group.category)}-${slug(period.timeOfDay)}`;
                  return (
                    <section className="schedule-period" key={period.timeOfDay} aria-labelledby={headingId}>
                      <h4 id={headingId}>{period.timeOfDay}</h4>
                      <div className="schedule-list">
                        {period.sessions.map((session) => (
                          <div className="schedule-row" key={`${session.mode}-${session.time}-${session.name}`}>
                            <span className="schedule-days">{session.name}<small>{session.days} · {session.mode}</small></span>
                            <strong>{session.time}</strong>
                            <span className="schedule-level">{session.level}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </article>
            ))}
          </div>
        </TabsContent>
      ))}

      <aside className="online-pt-card" aria-label="Online personal training schedule">
        <div><span>Train from anywhere</span><strong>{siteConfig.onlinePersonalTraining.name}</strong><small>{siteConfig.onlinePersonalTraining.days} · By appointment</small></div>
        <strong>{siteConfig.onlinePersonalTraining.time}</strong>
        <span className="schedule-level">{siteConfig.onlinePersonalTraining.level}</span>
      </aside>
    </Tabs>
  );
}
