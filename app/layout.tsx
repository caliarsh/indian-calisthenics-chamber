import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope } from 'next/font/google';
import { AttributionTracker } from '@/components/attribution-tracker';
import { CloudflareAnalytics } from '@/components/cloudflare-analytics';
import './globals.css';

const display = Barlow_Condensed({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans-custom',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indiancalisthenicschamber.com'),
  title: 'Indian Calisthenics Chamber | Train With Purpose',
  description: 'Progressive calisthenics coaching for every level. Build strength, control, and skills with Indian Calisthenics Chamber.',
  applicationName: 'Indian Calisthenics Chamber',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Indian Calisthenics Chamber',
    title: 'Indian Calisthenics Chamber | Train With Purpose',
    description: 'Progressive calisthenics coaching in Bengaluru, Hyderabad, and online across India.',
    url: '/',
    images: [{ url: '/icc-community-hero.jpeg', width: 1280, height: 1177, alt: 'The Indian Calisthenics Chamber community' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Calisthenics Chamber | Train With Purpose',
    description: 'Progressive calisthenics coaching in Bengaluru, Hyderabad, and online across India.',
    images: ['/icc-community-hero.jpeg'],
  },
  icons: {
    icon: [
      { url: '/icc-monogram.svg', type: 'image/svg+xml' },
      { url: '/icc-favicon-96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: '/icc-favicon-96.png',
    apple: [{ url: '/icc-apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}><AttributionTracker />{children}<CloudflareAnalytics /></body>
    </html>
  );
}
