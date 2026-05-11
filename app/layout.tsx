import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'ویکی بهترین | دایرکتوری کسب‌وکارهای ایران',
    template: '%s | ویکی بهترین',
  },
  description: 'بهترین کسب‌وکارها، متخصصان و خدمات ایران را در ویکی بهترین بیابید. از وکیل و پزشک تا رستوران و کلینیک زیبایی.',
  keywords: ['بهترین وکیل', 'بهترین پزشک', 'رستوران', 'کلینیک', 'دایرکتوری کسب و کار'],
  metadataBase: new URL('https://wikibehtarin.com'),
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://wikibehtarin.com',
    siteName: 'ویکی بهترین',
    images: [{ url: 'https://bolt.new/static/og_default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://bolt.new/static/og_default.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Vazirmatn', 'Tahoma', Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
