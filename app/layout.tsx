import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateStructuredData } from './structured-data';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Chanont Wankaew | Senior Telecom Data Analyst & AI Solutions Specialist',
  description: 'Portfolio of Chanont Wankaew - Senior Telecom Data Analyst & AI Solutions Specialist with 10+ years in RAN/RF Planning & Optimization (3G/4G/5G NR) and CEM Focus.',
  keywords: [
    'Chanont Wankaew',
    'Telecom Data Analyst',
    'RF Optimization Specialist',
    '5G NR',
    'AI Solutions Specialist',
    'Customer Experience Management',
    'BigQuery Telemetry',
    'Thailand Telecom Engineer',
  ],
  authors: [{ name: 'Chanont Wankaew' }],
  icons: {
    icon: "/cw-icon.jpg",
    apple: "/cw-icon.jpg",
  },
  openGraph: {
    title: 'Chanont Wankaew | Senior Telecom Data Analyst & AI Solutions Specialist',
    description: 'Portfolio of Chanont Wankaew - Senior Telecom Data Analyst & AI Solutions Specialist with 10+ years in RAN/RF Planning & Optimization (3G/4G/5G NR) and CEM Focus.',
    url: 'https://chanont-portfolio.vercel.app',
    siteName: 'Chanont Wankaew Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chanont Wankaew Portfolio - Telecom Data Analyst',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chanont Wankaew | Senior Telecom Data Analyst & AI Solutions Specialist',
    description: 'Portfolio of Chanont Wankaew - Senior Telecom Data Analyst & AI Solutions Specialist with 10+ years in RAN/RF Planning & Optimization (3G/4G/5G NR) and CEM Focus.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData();

  return (
    <html lang="en" className="dark">
      <head>
        {/* Markdown for Agents & LLM Discovery */}
        <link rel="alternate" type="text/markdown" href="/index.md" />
        <link rel="alternate" type="text/markdown" href="https://chanontwankaew.com/index.md" />
        <link rel="author" type="text/plain" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.webSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen bg-black text-white antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#00F0FF] text-black px-4 py-2 rounded-lg font-bold z-50">
          Skip to main content
        </a>
        <div id="main-content" role="main">
          {children}
        </div>
      </body>
    </html>
  );
}
