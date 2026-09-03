export const siteConfig = {
  name: 'Indian Calisthenics Chamber',
  shortName: 'ICC',
  location: 'Bengaluru, Karnataka',
  locationNote: 'Sample training location',
  whatsappNumber: '910000000000',
  whatsappDisplay: '+91 00000 00000',
  schedule: [
    { days: 'Monday · Wednesday · Friday', time: '6:30 AM', level: 'Foundations' },
    { days: 'Monday · Wednesday · Friday', time: '7:30 PM', level: 'Strength' },
    { days: 'Tuesday · Thursday · Saturday', time: '7:00 AM', level: 'Mixed levels' },
    { days: 'Tuesday · Thursday · Saturday', time: '6:30 PM', level: 'Skills' },
  ],
} as const;
