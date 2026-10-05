import type { Metadata } from 'next';
import { LocationSeoPage } from '@/components/location-seo-page';

export const metadata: Metadata = {
  title: 'Calisthenics Classes in Hyderabad | ICC',
  description: 'Coach-led calisthenics classes and personal training in Madhapur, Hyderabad. Build strength, movement control, and skills at Indian Calisthenics Chamber.',
  alternates: { canonical: '/calisthenics-classes-hyderabad' },
  openGraph: { title: 'Calisthenics Classes in Hyderabad | ICC', description: 'Group classes and personal training at ICC in Madhapur, Hyderabad.', url: '/calisthenics-classes-hyderabad', images: ['/locations/icc-hyderabad.jpg'] },
};

export default function HyderabadCalisthenicsPage() {
  return <LocationSeoPage locationId="hyderabad" />;
}
