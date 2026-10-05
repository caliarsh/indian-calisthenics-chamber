'use client';

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
          <div className="schedule-groups">
            {location.schedule.map((group) => (
              <article className={`schedule-group schedule-group-${slug(group.category)}`} key={group.category}>
                <header className="schedule-group-heading">
                  <div><h3>{group.category}</h3><small>Monday to Friday</small></div>
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

    </Tabs>
  );
}
