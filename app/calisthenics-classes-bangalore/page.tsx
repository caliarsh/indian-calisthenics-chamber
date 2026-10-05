import type { Metadata } from 'next';
import { LocationSeoPage } from '@/components/location-seo-page';

export const metadata: Metadata = {
  title: 'Calisthenics Classes in Bangalore | ICC',
  description: 'Coach-led calisthenics classes and personal training in Bilekahalli, Bangalore. Build strength, movement control, and skills at Indian Calisthenics Chamber.',
  alternates: { canonical: '/calisthenics-classes-bangalore' },
  openGraph: { title: 'Calisthenics Classes in Bangalore | ICC', description: 'Group classes and personal training at ICC in Bilekahalli, Bangalore.', url: '/calisthenics-classes-bangalore', images: ['/locations/icc-bengaluru.jpg'] },
};

export default function BangaloreCalisthenicsPage() {
  return <LocationSeoPage locationId="bengaluru" />;
}
