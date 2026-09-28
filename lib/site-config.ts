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
  instagram: string;
  instagramUrl: string;
  googleRating: string;
  googleReviewCount: number;
  reviews: readonly Review[];
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
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    focalPosition: string;
  };
  instagram?: string;
  instagramUrl?: string;
}

export interface AthleteProfile {
  id: string;
  name: string;
  initials: string;
  discipline: string;
  status: 'ICC athlete';
}

export type OnlineOfferCategory = 'Free Consultation' | 'Custom Plans' | 'Online PT' | 'Transformation';

export interface OnlineOffer {
  id: string;
  category: OnlineOfferCategory;
  name: string;
  price: string;
  compareAtPrice?: string;
  description: string;
  inclusions: readonly string[];
  duration?: string;
  monthlyPrice?: string;
  badge?: string;
  paymentUrl?: string;
}

export interface OfflineOffer {
  id: string;
  category: 'Group Classes' | 'Personal Training' | 'Athlete Batch';
  name: string;
  price: string;
  billingPeriod: string;
  levels: string;
  locationIds: readonly Location['id'][];
  inclusions: readonly string[];
  trainer?: 'Arsh' | 'Abhishek' | 'Other ICC coach';
  compareAtPrice?: string;
  discount?: string;
  bonus?: string;
}

export interface Review {
  author: string;
  rating: 5;
  quote: string;
}

export interface CompetitionEvent {
  id: string;
  name: string;
  discipline: string;
  date: string;
  location: string;
  status: 'Past event';
  description: string;
  coverageNote: string;
  sources: readonly {
    label: string;
    url: string;
  }[];
}

export interface WorkshopEvent {
  id: string;
  name: string;
  format: 'Workshop' | 'ICC showcase';
  ledBy: string;
  date: string;
  location: string;
  description: string;
  topics: readonly string[];
  sourceUrl?: string;
}

export interface ImageBrief {
  label: string;
  description: string;
  orientation: 'Portrait' | 'Landscape' | 'Wide landscape';
  association: 'Online training' | 'Offline training' | 'Competition' | 'Workshop' | 'Athlete';
}

export interface SiteImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  focalPosition?: string;
}

export interface InternshipModule {
  number: string;
  title: string;
  description: string;
}

export interface SupportInitiative {
  id: string;
  title: string;
  description: string;
  examples: readonly string[];
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

export const onlineOffers: readonly OnlineOffer[] = [
  {
    id: 'free-consultation',
    category: 'Free Consultation',
    name: 'Assessment + Consultation',
    price: 'Free',
    duration: '15 minutes',
    description: 'Start with your current level, training setup, and goal so an ICC coach can recommend the right path.',
    inclusions: ['ICC fitness assessment', '15-minute online consultation', 'Personalised offer recommendation'],
  },
  {
    id: 'workout-plan',
    category: 'Custom Plans',
    name: 'Workout Plan',
    price: '₹7,000',
    compareAtPrice: '₹10,000',
    duration: '4 weeks',
    monthlyPrice: '₹7,000/month',
    badge: 'Save ₹3,000',
    description: 'A personalised home or gym program built around your level, equipment, and goal.',
    inclusions: ['Custom four-week program', 'Weekly coach check-ins', 'Plan adjustments for four weeks'],
  },
  {
    id: 'diet-plan',
    category: 'Custom Plans',
    name: 'Diet Plan',
    price: '₹7,000',
    compareAtPrice: '₹10,000',
    duration: '4 weeks',
    monthlyPrice: '₹7,000/month',
    badge: 'Save ₹3,000',
    description: 'General nutrition guidance shaped around your training goal, routine, and food preferences.',
    inclusions: ['Custom four-week diet plan', 'Weekly coach check-ins', 'Plan adjustments for four weeks'],
  },
  {
    id: 'workout-diet-bundle',
    category: 'Custom Plans',
    name: 'Workout + Diet',
    price: '₹10,000',
    compareAtPrice: '₹14,000',
    duration: '4 weeks',
    monthlyPrice: '₹10,000/month',
    badge: 'Save ₹4,000',
    description: 'Bring your training and nutrition together in one coordinated four-week plan.',
    inclusions: ['Custom workout and diet plans', 'Weekly coach check-ins', 'Plan adjustments for four weeks'],
  },
  {
    id: 'single-pt',
    category: 'Online PT',
    name: 'Single PT Session',
    price: '₹2,000',
    duration: '1 × 60 minutes',
    description: 'A focused live session for technique, programming, or a specific skill.',
    inclusions: ['One-to-one live coaching', 'Technique feedback', 'Session matched to your goal'],
  },
  {
    id: 'pt-4',
    category: 'Online PT',
    name: '1 Session a Week',
    price: '₹7,500',
    compareAtPrice: '₹8,000',
    duration: '4 × 60 minutes',
    monthlyPrice: '₹7,500/month',
    badge: 'Save ₹500',
    description: 'A steady weekly coaching rhythm for focused technique work and accountable progress.',
    inclusions: ['Four one-to-one sessions', 'One live session each week', 'Progressive session structure'],
  },
  {
    id: 'pt-8',
    category: 'Online PT',
    name: '2 Sessions a Week',
    price: '₹14,000',
    compareAtPrice: '₹16,000',
    duration: '8 × 60 minutes',
    monthlyPrice: '₹14,000/month',
    badge: 'Save ₹2,000',
    description: 'Two coached sessions each week for athletes who want faster technical and strength progress.',
    inclusions: ['Eight one-to-one sessions', 'Two live sessions each week', 'Progressive session structure'],
  },
  {
    id: 'pt-12',
    category: 'Online PT',
    name: '3 Sessions a Week',
    price: '₹20,000',
    compareAtPrice: '₹24,000',
    duration: '12 × 60 minutes',
    monthlyPrice: '₹20,000/month',
    badge: 'Save ₹4,000',
    description: 'A sustained coaching block for strength, control, and skill progression.',
    inclusions: ['Twelve one-to-one sessions', 'Three live sessions each week', 'Progressive session structure'],
  },
  {
    id: 'pt-20',
    category: 'Online PT',
    name: '5 Sessions a Week',
    price: '₹30,000',
    compareAtPrice: '₹40,000',
    duration: '20 × 60 minutes',
    monthlyPrice: '₹30,000/month',
    badge: 'Best session rate · Save ₹10,000',
    description: 'High-frequency live coaching for athletes ready to make training a serious daily practice.',
    inclusions: ['Twenty one-to-one sessions', 'Five live sessions each week', 'Progressive session structure'],
  },
  {
    id: 'full-transformation',
    category: 'Transformation',
    name: 'Full Transformation',
    price: '₹32,000',
    compareAtPrice: '₹37,000',
    duration: '12 weeks',
    monthlyPrice: '₹32,000/month',
    badge: 'Save ₹5,000 · 12-week coaching',
    description: 'The complete ICC online coaching path for clients ready to align training, nutrition, and live guidance.',
    inclusions: ['Fitness assessment', 'Workout and diet plans', 'Twelve 60-minute PT sessions', 'Twelve weeks of structured support'],
  },
];

export const offlineOffers: readonly OfflineOffer[] = [
  { id: 'offline-group-monthly', category: 'Group Classes', name: '1 Month', price: '₹6,000', billingPeriod: '1 month', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Coach-led group sessions', 'Level-matched progressions', 'Monday to Friday batches'] },
  { id: 'offline-group-quarterly', category: 'Group Classes', name: '3 Months', price: '₹15,000', compareAtPrice: '₹18,000', discount: '16.7% off', bonus: 'Freeze for 1 week', billingPeriod: '3 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹3,000 against monthly pricing', 'Freeze membership for up to one week', 'Monday to Friday batches'] },
  { id: 'offline-group-half-year', category: 'Group Classes', name: '6 Months', price: '₹27,000', compareAtPrice: '₹36,000', discount: '25% off', bonus: 'Freeze for 2 weeks', billingPeriod: '6 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹9,000 against monthly pricing', 'Freeze membership for up to two weeks', 'Free diet plan'] },
  { id: 'offline-group-yearly', category: 'Group Classes', name: '12 Months', price: '₹48,000', compareAtPrice: '₹72,000', discount: '33.3% off', bonus: 'Freeze for 1 month', billingPeriod: '12 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹24,000 against monthly pricing', 'Freeze membership for up to one month', 'Free diet plan'] },
  { id: 'athlete-batch-monthly', category: 'Athlete Batch', name: 'Athlete Batch', price: '₹7,000', billingPeriod: '1 month', levels: 'L3 or coach-approved', locationIds: ['bengaluru'], inclusions: ['Performance-focused training', 'Monday to Friday at 5:00 PM', 'Bengaluru only'] },
  ...(['Arsh', 'Abhishek'] as const).flatMap((trainer) => [
    { id: `offline-pt-${trainer.toLowerCase()}-single`, category: 'Personal Training' as const, name: 'Single Session', price: '₹3,000', billingPeriod: '1 session', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'] as const, inclusions: ['One-to-one coaching', 'Flexible appointment', `Train with ${trainer}`], trainer },
    { id: `offline-pt-${trainer.toLowerCase()}-12`, category: 'Personal Training' as const, name: '12 Sessions', price: '₹30,000', compareAtPrice: '₹36,000', discount: '16.7% off', bonus: '2 sessions free', billingPeriod: '12 sessions', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'] as const, inclusions: ['Pay for 10 sessions and train for 12', 'Flexible appointments', `Train with ${trainer}`], trainer },
    { id: `offline-pt-${trainer.toLowerCase()}-15`, category: 'Personal Training' as const, name: '15 Sessions', price: '₹36,000', compareAtPrice: '₹45,000', discount: '20% off', bonus: '3 sessions free', billingPeriod: '15 sessions', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'] as const, inclusions: ['Pay for 12 sessions and train for 15', 'Flexible appointments', `Train with ${trainer}`], trainer },
  ]),
  { id: 'offline-pt-other-single', category: 'Personal Training', name: 'Single Session', price: '₹2,000', billingPeriod: '1 session', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['One-to-one coaching', 'Flexible appointment', 'Train with another ICC coach'], trainer: 'Other ICC coach' },
  { id: 'offline-pt-other-12', category: 'Personal Training', name: '12 Sessions', price: '₹20,000', compareAtPrice: '₹24,000', discount: '16.7% off', bonus: '2 sessions free', billingPeriod: '12 sessions', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Pay for 10 sessions and train for 12', 'Flexible appointments', 'Train with another ICC coach'], trainer: 'Other ICC coach' },
  { id: 'offline-pt-other-15', category: 'Personal Training', name: '15 Sessions', price: '₹24,000', compareAtPrice: '₹30,000', discount: '20% off', bonus: '3 sessions free', billingPeriod: '15 sessions', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Pay for 12 sessions and train for 15', 'Flexible appointments', 'Train with another ICC coach'], trainer: 'Other ICC coach' },
];

export const coaches: readonly Coach[] = [
  {
    name: 'Arsh',
    initials: 'A',
    role: 'Head Coach',
    description: 'Arsh is a national-level calisthenics athlete and Head Coach who has trained more than 500 athletes. He represented India at the 2025 WSWCF in Weighted Endurance and has won multiple national-level competitions across Static, Streetlifting, and Weighted Endurance.',
    photo: {
      src: '/coaches/arsh.jpg',
      alt: 'Coach Arsh holding a pull-up bar during a weighted calisthenics event.',
      width: 970,
      height: 1621,
      focalPosition: '50% 38%',
    },
    instagram: '@cali.arsh',
    instagramUrl: 'https://www.instagram.com/cali.arsh/',
  },
  {
    name: 'Abhishek',
    initials: 'AB',
    role: 'Head Coach',
    description: 'Abhishek brings more than eight years of experience in calisthenics and has trained over 500 athletes and fitness enthusiasts, including more than 10 athletes who have competed and won at the national level. He specialises in freestyle, statics, weighted calisthenics, and endurance. His coaching builds strong foundations, develops advanced skills, and improves strength, control, endurance, and overall athletic performance through structured, personalised training.',
    photo: {
      src: '/coaches/abhishek.jpg',
      alt: 'Coach Abhishek posing in clear natural water after outdoor training.',
      width: 1086,
      height: 1448,
      focalPosition: '50% 42%',
    },
    instagram: '@abhishek_icc',
    instagramUrl: 'https://www.instagram.com/abhishek_icc/',
  },
];

export const athleteProfiles: readonly AthleteProfile[] = [
  {
    id: 'arsh',
    name: 'Arsh',
    initials: 'AR',
    discipline: 'Weighted Endurance · Streetlifting · Static',
    status: 'ICC athlete',
  },
  {
    id: 'krishna',
    name: 'Krishna',
    initials: 'KR',
    discipline: 'Freestyle',
    status: 'ICC athlete',
  },
  {
    id: 'aakash',
    name: 'Aakash',
    initials: 'AA',
    discipline: 'Freestyle · Static',
    status: 'ICC athlete',
  },
  {
    id: 'durga',
    name: 'Durga',
    initials: 'DU',
    discipline: 'Static',
    status: 'ICC athlete',
  },
  {
    id: 'samuel',
    name: 'Samuel',
    initials: 'SA',
    discipline: 'Endurance',
    status: 'ICC athlete',
  },
];

export const trainerInternship = {
  duration: '6 months',
  locations: ['Bengaluru', 'Hyderabad'],
  modules: [
    { number: '01', title: 'Movement foundations', description: 'Learn exercise standards, regressions, progressions, joint preparation, and safe spotting for athletes at different levels.' },
    { number: '02', title: 'Programming', description: 'Build structured sessions and training blocks using volume, intensity, recovery, progression, and goal-specific planning.' },
    { number: '03', title: 'Applied anatomy', description: 'Understand the major movement patterns, muscles, joints, leverage, and common technique errors relevant to calisthenics coaching.' },
    { number: '04', title: 'Assessment and coaching', description: 'Practise athlete screening, level placement, cueing, observation, feedback, session management, and progress tracking.' },
    { number: '05', title: 'Nutrition and diet foundations', description: 'Learn general nutrition, diet planning, recovery, and habit-building principles while understanding when a client needs a qualified medical or nutrition professional.' },
    { number: '06', title: 'Supervised practice', description: 'Apply the theory on the training floor through observation, assisted coaching, supervised sessions, and a final ICC assessment.' },
  ] satisfies readonly InternshipModule[],
} as const;

export const supportInitiatives: readonly SupportInitiative[] = [
  { id: 'athlete-support', title: 'Help athletes compete', description: 'Support selected ICC athletes as they represent their training community at competitions across India.', examples: ['Competition registration', 'Intercity travel', 'Accommodation during events'] },
  { id: 'free-workshops', title: 'Take calisthenics to more people', description: 'Help ICC host free introductory workshops that make safe bodyweight training easier to discover.', examples: ['Venue and equipment', 'Coach travel', 'Community learning material'] },
  { id: 'competition-culture', title: 'Build stronger platforms', description: 'Support athlete-first events, judged attempts, and opportunities for the community to train and perform together.', examples: ['Event operations', 'Safety and judging equipment', 'Athlete participation support'] },
];

export const siteImageBriefs = {
  online: {
    home: { label: 'Home training photo', description: 'Athlete following an ICC program in a clean home workout space, with any available equipment visible.', orientation: 'Landscape', association: 'Online training' },
    gym: { label: 'Your gym coaching photo', description: 'An ICC coach guiding an athlete remotely or in a gym, with the movement and equipment clearly visible.', orientation: 'Landscape', association: 'Online training' },
  },
  offline: {
    hero: { label: 'Offline training hero', description: 'Wide, energetic group class inside ICC. Keep faces clear and leave visual space on the left for the headline.', orientation: 'Wide landscape', association: 'Offline training' },
    bengaluru: { label: 'ICC Bengaluru photo', description: 'A recognisable wide view of the Bengaluru training floor or a coached group class at this branch.', orientation: 'Wide landscape', association: 'Offline training' },
    hyderabad: { label: 'ICC Hyderabad photo', description: 'A recognisable wide view of the Hyderabad training floor or a coached group class at this branch.', orientation: 'Wide landscape', association: 'Offline training' },
  },
  competition: [
    { label: 'ICCWE 26 hero photo', description: 'The strongest photograph from ICCWE 26—an athlete mid-attempt, with the competition setting visible.', orientation: 'Portrait', association: 'Competition' },
    { label: 'Judged attempt photo', description: 'A strict weighted endurance attempt showing the athlete, equipment, and judging environment.', orientation: 'Portrait', association: 'Competition' },
    { label: 'Competition community photo', description: 'Athletes, coaches, judges, or spectators together at ICCWE 26.', orientation: 'Portrait', association: 'Competition' },
  ],
  workshops: {
    'bengaluru-inauguration-workshop-2025': { label: 'Bengaluru inauguration workshop', description: 'Wide community photograph from the free workshop and grand inauguration on 13 December 2025.', orientation: 'Landscape', association: 'Workshop' },
    'weighted-calisthenics-hyderabad-2025': { label: 'Weighted calisthenics workshop', description: 'Arsh teaching or demonstrating weighted calisthenics at ICC Hyderabad on 1 June 2025.', orientation: 'Landscape', association: 'Workshop' },
    'freestyle-calisthenics-hyderabad-2025': { label: 'Freestyle workshop', description: 'Krishna Mishra teaching a freestyle foundation or athletes participating in the Hyderabad workshop.', orientation: 'Landscape', association: 'Workshop' },
    'bengaluru-womens-day-workshop': { label: 'Women’s Day calisthenics workshop', description: 'Arsh with participants from the women’s calisthenics workshop at ICC Bengaluru.', orientation: 'Landscape', association: 'Workshop' },
  },
} as const satisfies {
  online: Record<'home' | 'gym', ImageBrief>;
  offline: Record<'hero' | Location['id'], ImageBrief>;
  competition: readonly ImageBrief[];
  workshops: Record<string, ImageBrief>;
};

export const siteImages = {
  online: {
    home: {
      src: '/online-coaching/home-training.jpg',
      alt: 'Athlete following a bodyweight training program with parallettes in a bright home workout space.',
      caption: 'Home training · AI-created concept image',
      width: 1672,
      height: 941,
      focalPosition: '50% 54%',
    },
    gym: {
      src: '/online-coaching/gym-coaching.jpg',
      alt: 'Athlete training on parallettes in a gym while receiving remote coaching through a tablet.',
      caption: 'Your gym coaching · AI-created concept image',
      width: 1672,
      height: 941,
      focalPosition: '50% 52%',
    },
  },
  locations: {
    bengaluru: {
      src: '/locations/icc-bengaluru.jpg',
      alt: 'Calisthenics training rig, rings, and floor equipment inside ICC Bengaluru.',
      caption: 'ICC Bengaluru training floor · Google Maps',
      width: 609,
      height: 812,
      focalPosition: '50% 46%',
    },
    hyderabad: {
      src: '/locations/icc-hyderabad.jpg',
      alt: 'Red and black calisthenics rig and mirrored training floor inside ICC Hyderabad.',
      caption: 'ICC Hyderabad training floor · Google Maps',
      width: 870,
      height: 580,
      focalPosition: '50% 50%',
    },
  },
  athletes: [
    {
      src: '/athletes/icc-athletes-community.jpg',
      alt: 'ICC athletes and coaches gathered together on a calisthenics training floor.',
      caption: 'Athlete community · Built together',
      width: 1440,
      height: 1440,
      focalPosition: '50% 34%',
    },
    {
      src: '/athletes/icc-athletes-awards.jpg',
      alt: 'ICC athletes and coaches together after a competition, with athletes holding trophies and certificates.',
      caption: 'Competition team · Shared standards',
      width: 1440,
      height: 1440,
      focalPosition: '50% 46%',
    },
    {
      src: '/athletes/icc-athlete-podium.jpg',
      alt: 'Calisthenics athletes celebrating with trophies on a competition podium.',
      caption: 'Competition podium · Earned through preparation',
      width: 1440,
      height: 810,
      focalPosition: '50% 44%',
    },
  ],
} as const satisfies {
  online: Record<'home' | 'gym', SiteImage>;
  locations: Record<Location['id'], SiteImage>;
  athletes: readonly SiteImage[];
};

export const offlineGalleryImages = [
  {
    src: '/locations/gallery/bengaluru-01.jpg',
    alt: 'An athlete demonstrating a bodyweight pulling movement while an ICC workshop group watches.',
    caption: 'Coached movement demonstration',
    width: 575,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-04.jpg',
    alt: 'An ICC coach spotting an athlete practising an inverted bar movement.',
    caption: 'Coach-led skill practice',
    width: 970,
    height: 1016,
    focalPosition: '50% 48%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/bengaluru-03.jpg',
    alt: 'A wide view across the ICC training floor with strength equipment and athletes training.',
    caption: 'The ICC training floor',
    width: 572,
    height: 1016,
    focalPosition: '50% 55%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-06.jpg',
    alt: 'An athlete holding a weighted pistol squat on the ICC training floor.',
    caption: 'Strength and control',
    width: 812,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/bengaluru-05.jpg',
    alt: 'An athlete performing a weighted bar movement with an ICC coach nearby.',
    caption: 'Weighted calisthenics practice',
    width: 577,
    height: 1016,
    focalPosition: '50% 48%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-03.jpg',
    alt: 'A wide view of the ICC training floor with dumbbells, turf, and calisthenics equipment.',
    caption: 'Built for strength and skill',
    width: 773,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/bengaluru-04.jpg',
    alt: 'An ICC coach addressing athletes during a practical training workshop.',
    caption: 'Practical coaching session',
    width: 582,
    height: 1016,
    focalPosition: '50% 53%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-05.jpg',
    alt: 'An athlete practising shoulder mobility on the ICC turf beside strength equipment.',
    caption: 'Movement preparation',
    width: 360,
    height: 640,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/bengaluru-02.jpg',
    alt: 'An athlete completing a muscle-up above a bar inside ICC.',
    caption: 'Bar skill practice',
    width: 572,
    height: 1016,
    focalPosition: '50% 45%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-01.jpg',
    alt: 'A wide view of an ICC calisthenics rig, rings, mirrors, and training space.',
    caption: 'Calisthenics rig and rings',
    width: 870,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/bengaluru-06.jpg',
    alt: 'A calisthenics bar and landing mats prepared for coached skill training at ICC.',
    caption: 'Skill training setup',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/hyderabad-02.jpg',
    alt: 'Wall artwork and training equipment inside the ICC facility.',
    caption: 'Inside ICC',
    width: 572,
    height: 1016,
    focalPosition: '50% 45%',
    locationId: 'hyderabad',
  },
] as const satisfies readonly (SiteImage & { locationId: Location['id'] })[];

export const allOfflineGalleryImages = [
  {
    src: '/locations/gallery/google-maps/bengaluru-01.jpg',
    alt: 'ICC training photo 01 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 01',
    width: 575,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-02.jpg',
    alt: 'ICC training photo 02 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 02',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-03.jpg',
    alt: 'ICC training photo 03 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 03',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-04.jpg',
    alt: 'ICC training photo 04 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 04',
    width: 582,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-05.jpg',
    alt: 'ICC training photo 05 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 05',
    width: 577,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-06.jpg',
    alt: 'ICC training photo 06 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 06',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-07.jpg',
    alt: 'ICC training photo 07 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 07',
    width: 762,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-08.jpg',
    alt: 'ICC training photo 08 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 08',
    width: 762,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-09.jpg',
    alt: 'ICC training photo 09 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 09',
    width: 1016,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-10.jpg',
    alt: 'ICC training photo 10 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 10',
    width: 776,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-11.jpg',
    alt: 'ICC training photo 11 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 11',
    width: 731,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-12.jpg',
    alt: 'ICC training photo 12 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 12',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-13.jpg',
    alt: 'ICC training photo 13 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 13',
    width: 779,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-14.jpg',
    alt: 'ICC training photo 14 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 14',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-15.jpg',
    alt: 'ICC training photo 15 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 15',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-16.jpg',
    alt: 'ICC training photo 16 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 16',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-17.jpg',
    alt: 'ICC training photo 17 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 17',
    width: 774,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-18.jpg',
    alt: 'ICC training photo 18 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 18',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-19.jpg',
    alt: 'ICC training photo 19 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 19',
    width: 762,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-20.jpg',
    alt: 'ICC training photo 20 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 20',
    width: 579,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-21.jpg',
    alt: 'ICC training photo 21 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 21',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-22.jpg',
    alt: 'ICC training photo 22 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 22',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-23.jpg',
    alt: 'ICC training photo 23 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 23',
    width: 773,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-24.jpg',
    alt: 'ICC training photo 24 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 24',
    width: 776,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-25.jpg',
    alt: 'ICC training photo 25 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 25',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-26.jpg',
    alt: 'ICC training photo 26 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 26',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-27.jpg',
    alt: 'ICC training photo 27 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 27',
    width: 764,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-28.jpg',
    alt: 'ICC training photo 28 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 28',
    width: 581,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-29.jpg',
    alt: 'ICC training photo 29 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 29',
    width: 771,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-30.jpg',
    alt: 'ICC training photo 30 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 30',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-31.jpg',
    alt: 'ICC training photo 31 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 31',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-32.jpg',
    alt: 'ICC training photo 32 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 32',
    width: 625,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/bengaluru-33.jpg',
    alt: 'ICC training photo 33 from the Bengaluru Google Maps gallery.',
    caption: 'Google Maps photo 33',
    width: 578,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'bengaluru',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-01.jpg',
    alt: 'ICC training photo 01 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 01',
    width: 870,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-02.jpg',
    alt: 'ICC training photo 02 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 02',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-03.jpg',
    alt: 'ICC training photo 03 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 03',
    width: 773,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-04.jpg',
    alt: 'ICC training photo 04 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 04',
    width: 970,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-05.jpg',
    alt: 'ICC training photo 05 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 05',
    width: 360,
    height: 640,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-06.jpg',
    alt: 'ICC training photo 06 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 06',
    width: 812,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-07.jpg',
    alt: 'ICC training photo 07 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 07',
    width: 830,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-08.jpg',
    alt: 'ICC training photo 08 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 08',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-09.jpg',
    alt: 'ICC training photo 09 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 09',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-10.jpg',
    alt: 'ICC training photo 10 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 10',
    width: 1016,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-11.jpg',
    alt: 'ICC training photo 11 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 11',
    width: 762,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-12.jpg',
    alt: 'ICC training photo 12 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 12',
    width: 609,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-13.jpg',
    alt: 'ICC training photo 13 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 13',
    width: 1031,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-14.jpg',
    alt: 'ICC training photo 14 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 14',
    width: 773,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-15.jpg',
    alt: 'ICC training photo 15 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 15',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-16.jpg',
    alt: 'ICC training photo 16 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 16',
    width: 720,
    height: 1078,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-17.jpg',
    alt: 'ICC training photo 17 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 17',
    width: 768,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-18.jpg',
    alt: 'ICC training photo 18 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 18',
    width: 1016,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-19.jpg',
    alt: 'ICC training photo 19 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 19',
    width: 901,
    height: 676,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-20.jpg',
    alt: 'ICC training photo 20 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 20',
    width: 773,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-21.jpg',
    alt: 'ICC training photo 21 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 21',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-22.jpg',
    alt: 'ICC training photo 22 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 22',
    width: 773,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-23.jpg',
    alt: 'ICC training photo 23 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 23',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-24.jpg',
    alt: 'ICC training photo 24 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 24',
    width: 1016,
    height: 1354,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-25.jpg',
    alt: 'ICC training photo 25 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 25',
    width: 813,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-26.jpg',
    alt: 'ICC training photo 26 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 26',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-27.jpg',
    alt: 'ICC training photo 27 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 27',
    width: 572,
    height: 1016,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-28.jpg',
    alt: 'ICC training photo 28 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 28',
    width: 812,
    height: 812,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
  {
    src: '/locations/gallery/google-maps/hyderabad-29.jpg',
    alt: 'ICC training photo 29 from the Hyderabad Google Maps gallery.',
    caption: 'Google Maps photo 29',
    width: 986,
    height: 580,
    focalPosition: '50% 50%',
    locationId: 'hyderabad',
  },
] as const satisfies readonly (SiteImage & { locationId: Location['id'] })[];

const hiddenOfflineGallerySources = new Set([
  '/locations/gallery/google-maps/bengaluru-03.jpg',
  '/locations/gallery/google-maps/bengaluru-22.jpg',
  '/locations/gallery/google-maps/hyderabad-15.jpg',
  '/locations/gallery/google-maps/hyderabad-05.jpg',
  '/locations/gallery/google-maps/hyderabad-09.jpg',
  '/locations/gallery/google-maps/hyderabad-10.jpg',
  '/locations/gallery/google-maps/hyderabad-11.jpg',
  '/locations/gallery/google-maps/hyderabad-16.jpg',
  '/locations/gallery/google-maps/hyderabad-21.jpg',
  '/locations/gallery/google-maps/hyderabad-23.jpg',
  '/locations/gallery/google-maps/hyderabad-25.jpg',
  '/locations/gallery/google-maps/hyderabad-26.jpg',
  '/locations/gallery/google-maps/hyderabad-28.jpg',
  '/locations/gallery/google-maps/hyderabad-29.jpg',
]);

const offlineGalleryCaptions: Record<string, string> = {
  '/locations/gallery/google-maps/bengaluru-01.jpg': 'Front lever demonstration for the workshop group',
  '/locations/gallery/google-maps/bengaluru-02.jpg': 'Student unlocking his first muscle-up',
  '/locations/gallery/google-maps/bengaluru-03.jpg': 'A wide view of the strength training floor',
  '/locations/gallery/google-maps/bengaluru-04.jpg': 'Coaches leading a group training briefing',
  '/locations/gallery/google-maps/bengaluru-05.jpg': 'Weighted dip demonstration with coach support',
  '/locations/gallery/google-maps/bengaluru-06.jpg': 'Calisthenics rig and landing-mat training zone',
  '/locations/gallery/google-maps/bengaluru-07.jpg': 'Dumbbells and kettlebells ready for strength work',
  '/locations/gallery/google-maps/bengaluru-08.jpg': 'Cable and conditioning equipment on the gym floor',
  '/locations/gallery/google-maps/bengaluru-09.jpg': 'Free weights, plates, and medicine-ball station',
  '/locations/gallery/google-maps/bengaluru-10.jpg': 'Coaches explaining the next workshop drill',
  '/locations/gallery/google-maps/bengaluru-11.jpg': 'Coach demonstrating a front lever touch',
  '/locations/gallery/google-maps/bengaluru-12.jpg': 'Student unlocking their first back lever',
  '/locations/gallery/google-maps/bengaluru-13.jpg': 'Pull-up practice with coaches watching technique',
  '/locations/gallery/google-maps/bengaluru-14.jpg': 'Banded front lever practice',
  '/locations/gallery/google-maps/bengaluru-15.jpg': 'Planche progression using resistance-band support',
  '/locations/gallery/google-maps/bengaluru-16.jpg': 'Open calisthenics rig with rings and climbing rope',
  '/locations/gallery/google-maps/bengaluru-17.jpg': 'Front lever demonstration with safety mats',
  '/locations/gallery/google-maps/bengaluru-18.jpg': 'Parallel-bar hold beside the climbing wall',
  '/locations/gallery/google-maps/bengaluru-19.jpg': 'Training floor, storage, and climbing wall',
  '/locations/gallery/google-maps/bengaluru-20.jpg': 'Coach observing a pull-up progression',
  '/locations/gallery/google-maps/bengaluru-21.jpg': 'Handstand balance on parallettes',
  '/locations/gallery/google-maps/bengaluru-22.jpg': 'A bright, fully equipped strength training floor',
  '/locations/gallery/google-maps/bengaluru-23.jpg': 'Workshop athletes gathered for instruction',
  '/locations/gallery/google-maps/bengaluru-24.jpg': 'Weighted dip technique under coach supervision',
  '/locations/gallery/google-maps/bengaluru-25.jpg': 'Open turf lane for sled and conditioning work',
  '/locations/gallery/google-maps/bengaluru-26.jpg': 'Planche progression on wooden parallettes',
  '/locations/gallery/google-maps/bengaluru-27.jpg': 'Group push-up drill during a coached session',
  '/locations/gallery/google-maps/bengaluru-28.jpg': 'One-arm handstand practice on parallettes',
  '/locations/gallery/google-maps/bengaluru-29.jpg': 'A high-angle view across the training floor',
  '/locations/gallery/google-maps/bengaluru-30.jpg': 'Calisthenics athlete demonstrating how to use the treadmill',
  '/locations/gallery/google-maps/bengaluru-31.jpg': 'Conditioning machines beside the climbing wall',
  '/locations/gallery/google-maps/bengaluru-32.jpg': 'Full planche training on parallettes',
  '/locations/gallery/google-maps/bengaluru-33.jpg': 'Calisthenics community workout session',
  '/locations/gallery/google-maps/hyderabad-01.jpg': 'Calisthenics rig, rings, and mirrored training floor',
  '/locations/gallery/google-maps/hyderabad-02.jpg': 'Anime wall artwork inside the training space',
  '/locations/gallery/google-maps/hyderabad-03.jpg': 'A wide look across the turf and strength floor',
  '/locations/gallery/google-maps/hyderabad-04.jpg': 'Coach spotting an inverted bar progression',
  '/locations/gallery/google-maps/hyderabad-06.jpg': 'Weighted pistol squat with controlled balance',
  '/locations/gallery/google-maps/hyderabad-07.jpg': 'Assisted dip practice on the parallel bars',
  '/locations/gallery/google-maps/hyderabad-08.jpg': 'Straight-bar support demonstrated for the class',
  '/locations/gallery/google-maps/hyderabad-11.jpg': 'Coach introducing a strength workshop drill',
  '/locations/gallery/google-maps/hyderabad-12.jpg': 'Pull-up demonstration by a coach',
  '/locations/gallery/google-maps/hyderabad-13.jpg': 'The ICC community together after training',
  '/locations/gallery/google-maps/hyderabad-14.jpg': 'Athletes working through a group floor drill',
  '/locations/gallery/google-maps/hyderabad-15.jpg': 'Active hang demonstration during a workshop',
  '/locations/gallery/google-maps/hyderabad-17.jpg': 'Student unlocking an elbow lever',
  '/locations/gallery/google-maps/hyderabad-18.jpg': 'Workshop instruction on the main training floor',
  '/locations/gallery/google-maps/hyderabad-19.jpg': 'Dip demonstration with athletes watching closely',
  '/locations/gallery/google-maps/hyderabad-20.jpg': 'Dynamic bar skill demonstrated to the workshop',
  '/locations/gallery/google-maps/hyderabad-22.jpg': 'Planche demonstration above the parallel bars',
  '/locations/gallery/google-maps/hyderabad-24.jpg': 'Athletes gathered around the rig for instruction',
  '/locations/gallery/google-maps/hyderabad-27.jpg': 'Maximum dead-hang challenge during a workshop',
};

export const selectedOfflineGalleryImages = allOfflineGalleryImages
  .filter((image) => !hiddenOfflineGallerySources.has(image.src))
  .map((image) => {
    const caption = offlineGalleryCaptions[image.src];
    const city = image.locationId === 'bengaluru' ? 'Bengaluru' : 'Hyderabad';

    return {
      ...image,
      caption,
      alt: `${caption} at ICC ${city}.`,
    };
  });

export const workshopHeroImage: SiteImage = {
  src: '/workshops/workshops-hero.jpg',
  alt: 'A coach spotting an athlete during a calisthenics workshop at ICC while participants watch.',
  caption: '',
  width: 738,
  height: 1312,
  focalPosition: '50% 58%',
};

export const workshopImages: Record<string, SiteImage> = {
  'bengaluru-inauguration-workshop-2025': {
    src: '/workshops/bengaluru-opening-workshop.jpg',
    alt: 'A large group of athletes and coaches celebrating together during an ICC opening workshop in Bengaluru.',
    caption: 'ICC · Opening workshop',
    width: 738,
    height: 554,
    focalPosition: '50% 52%',
  },
  'weighted-calisthenics-hyderabad-2025': {
    src: '/workshops/hyderabad-arsh-workshop.jpg',
    alt: 'Arsh and workshop participants celebrating together after an ICC calisthenics session in Hyderabad.',
    caption: 'ICC · Workshop led by Arsh',
    width: 1600,
    height: 560,
    focalPosition: '50% 48%',
  },
  'freestyle-calisthenics-hyderabad-2025': {
    src: '/workshops/hyderabad-krishan-workshop.jpg',
    alt: 'Krishna Mishra and spotters helping an athlete practise an inverted movement at an ICC workshop in Hyderabad.',
    caption: 'ICC · Workshop led by Krishna Mishra',
    width: 1448,
    height: 1086,
    focalPosition: '50% 48%',
  },
  'bengaluru-womens-day-workshop': {
    src: '/workshops/bengaluru-womens-day-workshop.jpg',
    alt: 'Arsh with participants from an ICC women’s calisthenics workshop in Bengaluru.',
    caption: 'ICC · Women’s Day workshop',
    width: 738,
    height: 550,
    focalPosition: '50% 48%',
  },
};

const bengaluruReviews: readonly Review[] = [
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

const hyderabadReviews: readonly Review[] = [
  {
    author: 'Chittiraju Yenni',
    rating: 5,
    quote: "Thanks to ICC(Indian Calisthenics Chamber) and coach Abhishek, I've achieved remarkable transformations, both physically and mentally.",
  },
  {
    author: 'Jimmy Gupta',
    rating: 5,
    quote: 'I am seeing myself stronger with each sessions. Thanks Abhishek for helping me to learn skills from scratch.',
  },
  {
    author: 'Konakanchi Gayathri',
    rating: 5,
    quote: 'His patience and clear instructions allowed me to learn new skills and progress at my own pace.',
  },
  {
    author: 'Varsha Govenkar',
    rating: 5,
    quote: "Best calisthenics academy in Hyderabad! Abhishek's expertise and passion shine through in every session.",
  },
  {
    author: 'Omkesh Molugu',
    rating: 5,
    quote: 'Would recommend this place. Thanks Team ICC',
  },
  {
    author: 'Animesh Saraogi',
    rating: 5,
    quote: 'ICC is an authentic calisthenics academy with a great community!',
  },
];

export const siteConfig = {
  name: 'Indian Calisthenics Chamber',
  shortName: 'ICC',
  onlineWhatsappNumber: '919902828888',
  onlineWhatsappDisplay: '+91 99028 28888',
  groupClassesCampaign: {
    reelUrl: 'https://www.instagram.com/reel/DScsPTkEm9j/',
  },
  competitions: [
    {
      id: 'iccwe-26',
      name: 'ICCWE 26',
      discipline: 'WSWCF Weighted Endurance Qualifier',
      date: '22 March 2026',
      location: 'ICC Bengaluru',
      status: 'Past event',
      description: 'ICC created a competitive platform for Indian athletes seeking qualification for the WSWCF World Championship. The event brought strict standards, weighted strength, endurance, judged attempts, and community support onto one floor.',
      coverageNote: 'Participant coverage described ICCWE 26 as India’s first WSWCF Weighted Endurance qualifier.',
      sources: [
        { label: 'Watch official announcement', url: 'https://www.instagram.com/reel/DVTALWgEiac/' },
        { label: 'View competition recap', url: 'https://www.instagram.com/reel/DWQ_hbCAdOY/' },
      ],
    },
  ] satisfies readonly CompetitionEvent[],
  workshops: [
    {
      id: 'bengaluru-womens-day-workshop',
      name: 'Women’s Day Calisthenics Workshop',
      format: 'Workshop',
      ledBy: 'Arsh',
      date: '8 March 2026',
      location: 'Bengaluru',
      description: 'A women-focused community session organised by Arsh to introduce bodyweight training, build confidence with foundational movements, and make calisthenics more approachable.',
      topics: ['Calisthenics foundations', 'Bodyweight strength and movement', 'Supportive community training'],
    },
    {
      id: 'freestyle-calisthenics-hyderabad-2025',
      name: 'Freestyle Calisthenics Workshop',
      format: 'Workshop',
      ledBy: 'Krishna Mishra',
      date: '27 April 2025',
      location: 'Hyderabad',
      description: 'A beginner-friendly freestyle session designed to build the city’s calisthenics scene, followed by a jam session with athletes from Hyderabad.',
      topics: ['Starting freestyle from scratch', 'Foundation skills', 'Injury-prevention guidance'],
      sourceUrl: 'https://www.instagram.com/reel/DIwJLqTiNJC/',
    },
    {
      id: 'bengaluru-inauguration-workshop-2025',
      name: 'Free Calisthenics Workshop + Grand Inauguration',
      format: 'Workshop',
      ledBy: 'Abhishek, Arsh & Skyotic',
      date: '13 December 2025',
      location: 'Bengaluru · Tenzee Multisports, Bannerghatta Road',
      description: 'ICC marked its Bengaluru grand inauguration with a free community workshop combining coached calisthenics, athletic showcases, and open challenges.',
      topics: ['Statics and freestyle showcase', 'Challenges and mini competitions', 'Community giveaways'],
      sourceUrl: 'https://www.instagram.com/reel/DSCwGuCiDu0/',
    },
    {
      id: 'weighted-calisthenics-hyderabad-2025',
      name: 'Weighted Calisthenics Workshop',
      format: 'Workshop',
      ledBy: 'Arsh',
      date: '1 June 2025',
      location: 'Hyderabad · 100 Feet Road, Madhapur',
      description: 'A focused introduction to weighted calisthenics, led by Arsh and built for athletes ready to understand how to begin, progress, and develop strength with added load.',
      topics: ['Starting weighted calisthenics', 'Progression and strength development', 'Technique-led training'],
      sourceUrl: 'https://www.instagram.com/reel/DKRjnKIiiFL/',
    },
  ] satisfies readonly WorkshopEvent[],
  locations: [
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      area: 'Bilekahalli, Bengaluru',
      address: '98, 4th Cross, Nagappa Layout, Bannerghatta Road · 560076',
      mapsUrl: 'https://maps.app.goo.gl/eXkcgX6bdKWHeNVR6',
      whatsappNumber: '919902828888',
      whatsappDisplay: '+91 99028 28888',
      instagram: '@icc.bangalore',
      instagramUrl: 'https://www.instagram.com/icc.bangalore/',
      googleRating: '4.9',
      googleReviewCount: 27,
      reviews: bengaluruReviews,
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
      address: 'Plot No. 4, 13, 100 Feet Road, opposite The Street Drive, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081',
      mapsUrl: 'https://maps.app.goo.gl/uj1bSeAqvxp2uNNz7',
      whatsappNumber: '919319045223',
      whatsappDisplay: '+91 93190 45223',
      instagram: '@icc_hyderabad',
      instagramUrl: 'https://www.instagram.com/icc_hyderabad/',
      googleRating: '4.9',
      googleReviewCount: 38,
      reviews: hyderabadReviews,
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
