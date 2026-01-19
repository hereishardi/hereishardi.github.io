'use client';

import React from 'react';
import Layout from '@/components/layout';
import CertificationsTimeline from './components/CertificationsTimeline';
import Hero from '@/components/home/hero';

export default function ActivityPage() {
  return (
    <Layout title="Activity">
      <div className="min-h-screen bg-[#FAFAFA] px-4 py-16 md:px-8 lg:px-16">

        {/* Simple Professional Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black tracking-tight text-gray-900 md:text-7xl uppercase">
          </h1>
          <p className="text-2xl font-medium text-blue-600/70">
            Professional certifications and courses
          </p>
        </div>

        {/* Professional timeline container */}
        <div className="mx-auto max-w-3xl bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm mb-20">
          <CertificationsTimeline />
        </div>

      </div>

      {/* Climate Strips Section */}
      <Hero />

      {/* Did You Know Section */}
      <div className="bg-black py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Did You Know?
          </h2>
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
            2025 marks Earth&apos;s third warmest year on record, with the past 11 years being the hottest ever recorded,adding another dark red stripe to the climate stripes graphic.
          </p>
        </div>
      </div>

    </Layout>
  );
}