import type { Metadata } from 'next';
import './globals.css';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark scroll-smooth">
      <body className="bg-[#05070B] text-slate-100 antialiased min-h-screen selection:bg-[#00F0FF]/30">
        {children}
      </body>
    </html>
  );
}
