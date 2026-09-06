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
  instagram?: string;
  instagramUrl?: string;
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
    duration: '4 weeks',
    description: 'A personalised home or gym program built around your level, equipment, and goal.',
    inclusions: ['Custom four-week program', 'Weekly coach check-ins', 'Plan adjustments for four weeks'],
  },
  {
    id: 'diet-plan',
    category: 'Custom Plans',
    name: 'Diet Plan',
    price: '₹7,000',
    duration: '4 weeks',
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
    id: 'pt-6',
    category: 'Online PT',
    name: 'PT Starter Pack',
    price: '₹11,000',
    duration: '6 × 60 minutes',
    badge: 'Save ₹1,000',
    description: 'A lower-commitment coaching block for building momentum and refining movement.',
    inclusions: ['Six one-to-one sessions', 'Live technique feedback', 'Progressive session structure'],
  },
  {
    id: 'pt-12',
    category: 'Online PT',
    name: 'PT Pack',
    price: '₹20,000',
    duration: '12 × 60 minutes',
    badge: 'Save ₹4,000',
    description: 'A sustained coaching block for strength, control, and skill progression.',
    inclusions: ['Twelve one-to-one sessions', 'Live technique feedback', 'Progressive session structure'],
  },
  {
    id: 'pt-15',
    category: 'Online PT',
    name: 'PT Performance Pack',
    price: '₹24,000',
    duration: '15 × 60 minutes',
    badge: 'Best session rate · Save ₹6,000',
    description: 'The strongest per-session value for athletes ready for a longer coaching block.',
    inclusions: ['Fifteen one-to-one sessions', 'Live technique feedback', 'Progressive session structure'],
  },
  {
    id: 'full-transformation',
    category: 'Transformation',
    name: 'Full Transformation',
    price: '₹32,000',
    duration: '12 weeks',
    badge: 'Structured 12-week coaching',
    description: 'The complete ICC online coaching path for clients ready to align training, nutrition, and live guidance.',
    inclusions: ['Fitness assessment', 'Workout and diet plans', 'Twelve 60-minute PT sessions', 'Twelve weeks of structured support'],
  },
];

export const offlineOffers: readonly OfflineOffer[] = [
  { id: 'offline-group-monthly', category: 'Group Classes', name: '1 Month', price: '₹5,000', billingPeriod: '1 month', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Coach-led group sessions', 'Level-matched progressions', 'Monday to Friday batches'] },
  { id: 'offline-group-quarterly', category: 'Group Classes', name: '3 Months', price: '₹13,500', compareAtPrice: '₹15,000', discount: '10% off', bonus: 'Freeze for 1 week', billingPeriod: '3 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹1,500 against monthly pricing', 'Freeze membership for up to one week', 'Monday to Friday batches'] },
  { id: 'offline-group-half-year', category: 'Group Classes', name: '6 Months', price: '₹24,000', compareAtPrice: '₹30,000', discount: '20% off', bonus: 'Freeze for 2 weeks', billingPeriod: '6 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹6,000 against monthly pricing', 'Freeze membership for up to two weeks', 'Free diet plan'] },
  { id: 'offline-group-yearly', category: 'Group Classes', name: '1 Year', price: '₹42,000', compareAtPrice: '₹60,000', discount: '30% off', bonus: 'Freeze for 1 month', billingPeriod: '12 months', levels: 'L1 · L2 · L3', locationIds: ['bengaluru', 'hyderabad'], inclusions: ['Save ₹18,000 against monthly pricing', 'Freeze membership for up to one month', 'Free diet plan'] },
  { id: 'athlete-batch-monthly', category: 'Athlete Batch', name: 'Athlete Batch', price: '₹6,000', billingPeriod: '1 month', levels: 'L3 or coach-approved', locationIds: ['bengaluru'], inclusions: ['Performance-focused training', 'Monday to Friday at 5:00 PM', 'Bengaluru only'] },
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
    instagram: '@cali.arsh',
    instagramUrl: 'https://www.instagram.com/cali.arsh/',
  },
  {
    name: 'Abhishek',
    initials: 'AB',
    role: 'Head Coach',
    description: 'Abhishek brings more than eight years of experience in calisthenics and has trained over 500 athletes and fitness enthusiasts, including more than 10 athletes who have competed and won at the national level. He specialises in freestyle, statics, weighted calisthenics, and endurance. His coaching builds strong foundations, develops advanced skills, and improves strength, control, endurance, and overall athletic performance through structured, personalised training.',
    instagram: '@abhishek_icc',
    instagramUrl: 'https://www.instagram.com/abhishek_icc/',
  },
];

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
