import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ASTAFLIX - Your Streaming Dashboard',
  description: 'Watch your favorite movies and TV series',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Header />
        {/* Add padding-top to account for fixed header */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}