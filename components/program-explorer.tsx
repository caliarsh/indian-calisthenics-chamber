'use client';

/* oxlint-disable next/no-html-link-for-pages -- static-export anchors preserve fragment navigation */

import { ArrowUpRight, Dumbbell, Trophy, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { programs, type TrainingMode } from '@/lib/site-config';

const modeCopy: Record<TrainingMode, string> = {
  Online: 'Train live with a coach from wherever you are.',
  Offline: 'Build skill in person at the ICC training base.',
};

export function ProgramExplorer() {
  return (
    <Tabs className="program-tabs" defaultValue="Offline">
      <div className="program-tab-head">
        <TabsList className="program-tab-list" aria-label="Training mode">
          <TabsTrigger className="program-tab-trigger" value="Offline">Offline training</TabsTrigger>
          <TabsTrigger className="program-tab-trigger" value="Online">Online training</TabsTrigger>
        </TabsList>
        <a className="assessment-link" href="/assessment">Not sure of your level? Take the assessment <ArrowUpRight aria-hidden="true" /></a>
      </div>
      {(['Offline', 'Online'] as const).map((mode) => {
        const modePrograms = programs.filter((program) => program.mode === mode);
        return (
          <TabsContent className="program-tab-content" key={mode} value={mode}>
            <p className="mode-intro"><span>{mode}</span>{modeCopy[mode]}</p>
            {mode === 'Online' && <a className="online-coaching-link" href="/train-from-home">View online plans &amp; pricing <ArrowUpRight aria-hidden="true" /></a>}
            <div className={`program-grid program-grid-${mode.toLowerCase()}`}>
              {modePrograms.map((program, index) => {
                const Icon = program.kind === 'PT' ? Dumbbell : program.kind === 'Group' ? Users : Trophy;
                return (
                  <article className="program-card" key={program.id}>
                    <div className="program-top"><span>0{index + 1}</span><Icon aria-hidden="true" /></div>
                    <p className="program-type">{program.mode} · {program.kind}</p>
                    <h3>{program.name}</h3>
                    <p>{program.description}</p>
                    <div className="level-badges" aria-label={`Available levels: ${program.levels.join(', ')}`}>
                      {program.levels.map((level) => <span key={level}>{level}</span>)}
                    </div>
                    <a href="#trial">Choose this program <ArrowUpRight aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
