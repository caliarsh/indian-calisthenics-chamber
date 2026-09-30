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
  title: 'Indian Calisthenics Chamber | Train With Purpose',
  description: 'Progressive calisthenics coaching for every level. Build strength, control, and skills with Indian Calisthenics Chamber.',
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
