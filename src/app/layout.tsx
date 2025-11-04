import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO_METADATA } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SEO_METADATA.home.title,
  description: SEO_METADATA.home.description,
  keywords: SEO_METADATA.home.keywords.join(', '),
  authors: [{ name: 'TopRank Digital Service' }],
  creator: 'TopRank Digital Service',
  publisher: 'TopRank Digital Service',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: SEO_METADATA.home.title,
    description: SEO_METADATA.home.description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'Online GST Bill Maker',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_METADATA.home.title,
    description: SEO_METADATA.home.description,
    creator: '@toprankindia',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}