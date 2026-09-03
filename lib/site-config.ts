export type Level = 'L1' | 'L2' | 'L3';
export type TrainingMode = 'Online' | 'Offline';
export type ProgramKind = 'PT' | 'Group' | 'Athlete';

export interface Program {
  id: string;
  name: string;
  mode: TrainingMode;
  kind: ProgramKind;
  levels: readonly Level[];
  description: string;
}

export interface Coach {
  name: string;
  initials: string;
  role: string;
  description: string;
  instagram?: string;
  instagramUrl?: string;
  sample?: boolean;
}

export interface AssessmentMetric {
  id: 'pushUps' | 'pullUps' | 'deadHang' | 'hollowHold' | 'squats';
  label: string;
  instruction: string;
  unit: 'reps' | 'sec';
  max: number;
  tier2Min: number;
  tier3Min: number;
}

export const levelDescriptions: Record<Level, { name: string; description: string }> = {
  L1: { name: 'Foundations', description: 'Build movement quality, joint readiness, and dependable base strength.' },
  L2: { name: 'Strength', description: 'Develop intermediate strength and prepare the positions behind harder skills.' },
  L3: { name: 'Performance', description: 'Refine advanced skills, leverage, and performance-focused capacity.' },
};

export const programs: readonly Program[] = [
  { id: 'online-pt', name: 'Personal Training', mode: 'Online', kind: 'PT', levels: ['L1', 'L2', 'L3'], description: 'One-to-one live coaching, programming, and feedback adapted to your space and equipment.' },
  { id: 'online-group', name: 'Group Classes', mode: 'Online', kind: 'Group', levels: ['L1'], description: 'Coach-led fundamentals sessions with a live community and clear weekly progressions.' },
  { id: 'offline-pt', name: 'Personal Training', mode: 'Offline', kind: 'PT', levels: ['L1', 'L2', 'L3'], description: 'Individual in-person coaching built around your movement, goals, and rate of progress.' },
  { id: 'offline-group', name: 'Group Classes', mode: 'Offline', kind: 'Group', levels: ['L1', 'L2', 'L3'], description: 'Level-matched group training with hands-on coaching and a focused team atmosphere.' },
  { id: 'athlete-batch', name: 'Athlete Batch', mode: 'Offline', kind: 'Athlete', levels: ['L3'], description: 'Performance-focused training for L3 athletes and members placed by a coach.' },
];

export const assessmentMetrics: readonly AssessmentMetric[] = [
  { id: 'pushUps', label: 'Strict push-ups', instruction: 'Maximum clean repetitions without resting.', unit: 'reps', max: 200, tier2Min: 10, tier3Min: 25 },
  { id: 'pullUps', label: 'Strict pull-ups', instruction: 'Full hang to chin over bar, without swinging.', unit: 'reps', max: 200, tier2Min: 2, tier3Min: 8 },
  { id: 'deadHang', label: 'Dead hang', instruction: 'Longest comfortable two-hand hang from a bar.', unit: 'sec', max: 600, tier2Min: 20, tier3Min: 45 },
  { id: 'hollowHold', label: 'Hollow-body hold', instruction: 'Longest hold with lower back pressed down.', unit: 'sec', max: 600, tier2Min: 15, tier3Min: 40 },
  { id: 'squats', label: 'Bodyweight squats', instruction: 'Clean controlled repetitions through comfortable depth.', unit: 'reps', max: 200, tier2Min: 20, tier3Min: 40 },
];

export const coaches: readonly Coach[] = [
  {
    name: 'Cali Arsh',
    initials: 'CA',
    role: 'Head Coach',
    description: 'Cali leads with a progression-first approach to calisthenics—building clean technique, body awareness, and strength that supports long-term skill development.',
    instagram: '@cali.arsh',
    instagramUrl: 'https://www.instagram.com/cali.arsh/',
  },
  {
    name: 'Ananya Rao',
    initials: 'AR',
    role: 'Foundations Coach',
    description: 'An approachable sample profile focused on movement confidence, fundamentals, and sustainable training habits.',
    sample: true,
  },
  {
    name: 'Dev Malhotra',
    initials: 'DM',
    role: 'Strength & Skills Coach',
    description: 'A sample profile representing focused coaching for intermediate strength, handstands, and skill preparation.',
    sample: true,
  },
];

export const siteConfig = {
  name: 'Indian Calisthenics Chamber',
  shortName: 'ICC',
  location: 'Bengaluru, Karnataka',
  locationNote: 'Sample training location',
  whatsappNumber: '910000000000',
  whatsappDisplay: '+91 00000 00000',
  schedule: [
    { days: 'Monday · Wednesday · Friday', time: '6:30 AM', level: 'L1 Group', mode: 'Offline' },
    { days: 'Monday · Wednesday · Friday', time: '7:30 PM', level: 'L2 · L3 Group', mode: 'Offline' },
    { days: 'Tuesday · Thursday', time: '7:00 AM', level: 'L1 Group', mode: 'Online' },
    { days: 'Tuesday · Thursday', time: 'By appointment', level: 'L1 · L2 · L3 PT', mode: 'Online' },
    { days: 'Saturday', time: '7:00 AM', level: 'Athlete Batch', mode: 'Offline' },
  ],
} as const;
