export type Level = 'L1' | 'L2' | 'L3';
export type TrainingMode = 'Online' | 'Offline';
export type ProgramKind = 'PT' | 'Group' | 'Athlete';
export type ScheduleCategory = 'Group Classes' | 'Personal Training';
export type ScheduleTimeOfDay = 'Morning' | 'Evening' | 'By appointment';

export interface ScheduleSession {
  name: string;
  mode: TrainingMode;
  days: string;
  time: string;
  level: string;
}

export interface SchedulePeriod {
  timeOfDay: ScheduleTimeOfDay;
  sessions: readonly ScheduleSession[];
}

export interface ScheduleGroup {
  category: ScheduleCategory;
  modeLabel: string;
  periods: readonly SchedulePeriod[];
}

export interface Location {
  id: 'bengaluru' | 'hyderabad';
  name: string;
  area: string;
  address: string;
  mapsUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  schedule: readonly ScheduleGroup[];
}

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
}

export interface Review {
  author: string;
  rating: 5;
  quote: string;
}

export type FormQuality = 'Poor' | 'Average' | 'Good' | 'Excellent';
export type MobilityRating = 'Restricted' | 'Average' | 'Good';
export type FlexibilityRating = 'Poor' | 'Average' | 'Good';

export interface StrengthTestOption {
  id: string;
  label: string;
  tier2Min: number;
  tier3Min: number;
}

export interface MovementCheck {
  id: string;
  label: string;
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

export const assessmentConfig = {
  strength: {
    pull: [
      { id: 'pull-ups', label: 'Pull-ups', tier2Min: 2, tier3Min: 8 },
      { id: 'chin-ups', label: 'Chin-ups', tier2Min: 2, tier3Min: 8 },
      { id: 'australian-pull-ups', label: 'Australian pull-ups', tier2Min: 8, tier3Min: 15 },
      { id: 'australian-rows', label: 'Australian rows', tier2Min: 8, tier3Min: 15 },
    ] satisfies readonly StrengthTestOption[],
    push: [
      { id: 'push-ups', label: 'Push-ups', tier2Min: 10, tier3Min: 25 },
      { id: 'dips', label: 'Dips', tier2Min: 4, tier3Min: 12 },
      { id: 'elevated-push-ups', label: 'Elevated push-ups', tier2Min: 12, tier3Min: 25 },
      { id: 'ring-push-ups', label: 'Ring push-ups', tier2Min: 10, tier3Min: 25 },
    ] satisfies readonly StrengthTestOption[],
  },
  endurance: {
    repetitions: 12,
    holdSeconds: 30,
    benchmarkSeconds: 180,
    circuits: [
      {
        id: 'circuitA',
        label: 'Circuit 1 · Lower body',
        movements: ['Jump squats', 'Jump lunges', 'Sumo squats', 'Side-to-side squats'],
        hold: 'Squat hold',
      },
      {
        id: 'circuitB',
        label: 'Circuit 2 · Core',
        movements: ['Leg raises', 'Leg touches', 'Bicycle crunches', 'Crunches', 'Mountain climbers'],
        hold: 'Plank hold',
      },
    ],
  },
  mobility: [
    { id: 'shoulderMobility', label: "Shoulder mobility · Apley's scratch test" },
    { id: 'hipMobility', label: 'Hip mobility · 90/90 hip rotation' },
    { id: 'ankleMobility', label: 'Ankle mobility · Knee-to-wall test' },
    { id: 'thoracicMobility', label: 'Thoracic spine · Seated rotation test' },
    { id: 'wristMobility', label: 'Wrist mobility · Extension and flexion' },
  ] satisfies readonly MovementCheck[],
  flexibility: [
    { id: 'hamstringFlexibility', label: 'Hamstrings · Sit-and-reach or toe touch' },
    { id: 'hipFlexorFlexibility', label: 'Hip flexors · Thomas or half-kneeling test' },
    { id: 'shoulderFlexibility', label: 'Shoulders · Overhead or behind-the-back reach' },
  ] satisfies readonly MovementCheck[],
} as const;

export const coaches: readonly Coach[] = [
  {
    name: 'Arsh',
    initials: 'A',
    role: 'Head Coach',
    description: 'Arsh is a national-level calisthenics athlete and Head Coach who has trained more than 500 athletes. He represented India at the 2025 WSWCF in Weighted Endurance and has won multiple national-level competitions across Static, Streetlifting, and Weighted Endurance.',
    instagram: '@cali.arsh',
    instagramUrl: 'https://www.instagram.com/cali.arsh/',
  },
];

export const reviews: readonly Review[] = [
  {
    author: 'Kushal Gowda',
    rating: 5,
    quote: 'I’ve been training at the Indian Calisthenics Chamber for the past 3 months, and the experience has been outstanding.',
  },
  {
    author: 'RAHUL Ilango',
    rating: 5,
    quote: 'The people I workout with here are insanely fun and hardworking.',
  },
  {
    author: 'Vishal I',
    rating: 5,
    quote: 'Coach Arsh is very knowledgeable, gives specific workouts based on your strength levels, and monitors your progress.',
  },
  {
    author: 'Terrell Gonsalves',
    rating: 5,
    quote: 'Probably one of the coolest calisthenics communities to learn and grow.',
  },
  {
    author: 'Alpna Sah',
    rating: 5,
    quote: 'The energy here is too good. The team made me do new skills which I had never thought of doing.',
  },
  {
    author: 'Faisal Khan',
    rating: 5,
    quote: 'The way Arsh mentors and guides each individual shows his true dedication as a coach.',
  },
];

export const siteConfig = {
  name: 'Indian Calisthenics Chamber',
  shortName: 'ICC',
  reviewsUrl: 'https://maps.app.goo.gl/eXkcgX6bdKWHeNVR6',
  googleRating: '4.9',
  googleReviewCount: 27,
  locations: [
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      area: 'Bilekahalli, Bengaluru',
      address: '98, 4th Cross, Nagappa Layout, Bannerghatta Road · 560076',
      mapsUrl: 'https://maps.app.goo.gl/eXkcgX6bdKWHeNVR6',
      whatsappNumber: '919902828888',
      whatsappDisplay: '+91 99028 28888',
      schedule: [
        {
          category: 'Group Classes',
          modeLabel: 'Offline',
          periods: [
            {
              timeOfDay: 'Morning',
              sessions: [
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '6:30 AM', level: 'L1 · L2 · L3' },
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '7:30 AM', level: 'L1 · L2 · L3' },
              ],
            },
            {
              timeOfDay: 'Evening',
              sessions: [
                { name: 'Athlete Batch', mode: 'Offline', days: 'Monday to Friday', time: '5:00 PM', level: 'Athlete Batch' },
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '6:00 PM', level: 'L1 · L2 · L3' },
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '7:00 PM', level: 'L1 · L2 · L3' },
              ],
            },
          ],
        },
        {
          category: 'Personal Training',
          modeLabel: 'Offline',
          periods: [
            {
              timeOfDay: 'By appointment',
              sessions: [
                { name: 'Offline PT', mode: 'Offline', days: 'Monday to Friday', time: 'Flexible timing', level: 'L1 · L2 · L3' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      area: 'Madhapur, Hyderabad',
      address: 'Madhapur, Hyderabad',
      mapsUrl: 'https://maps.app.goo.gl/uj1bSeAqvxp2uNNz7',
      whatsappNumber: '919319045223',
      whatsappDisplay: '+91 93190 45223',
      schedule: [
        {
          category: 'Group Classes',
          modeLabel: 'Offline',
          periods: [
            {
              timeOfDay: 'Morning',
              sessions: [
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '6:30 AM', level: 'L1 · L2 · L3' },
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '7:30 AM', level: 'L1 · L2 · L3' },
              ],
            },
            {
              timeOfDay: 'Evening',
              sessions: [
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '6:30 PM', level: 'L1 · L2 · L3' },
                { name: 'Group Class', mode: 'Offline', days: 'Monday to Friday', time: '7:30 PM', level: 'L1 · L2 · L3' },
              ],
            },
          ],
        },
        {
          category: 'Personal Training',
          modeLabel: 'Offline',
          periods: [
            {
              timeOfDay: 'By appointment',
              sessions: [
                { name: 'Offline PT', mode: 'Offline', days: 'Monday to Friday', time: 'Flexible timing', level: 'L1 · L2 · L3' },
              ],
            },
          ],
        },
      ],
    },
  ] satisfies readonly Location[],
  onlinePersonalTraining: {
    name: 'Online PT',
    mode: 'Online',
    days: 'Monday to Friday',
    time: 'Flexible timing',
    level: 'L1 · L2 · L3',
  } satisfies ScheduleSession,
} as const;
