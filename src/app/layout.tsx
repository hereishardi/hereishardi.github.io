import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Hardi's portfolio",
  description: 'Hardi is a Meteorologist and climate enthusiast.',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className="overflow-scroll overflow-x-hidden">
        <Animations>
          <main>
            <Header />
            <div className="flex flex-col bg-white text-slate-900">
              <main className={`flex-grow ${inter.className}`}>{children}</main>
              <Analytics />
            </div>
            <Toaster />
          </main>
        </Animations>
      </body>
    </html>
  );
}
