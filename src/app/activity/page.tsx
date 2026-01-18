'use client';

import React from 'react';
import Layout from '@/components/layout';
import CertificationsTimeline from './components/CertificationsTimeline';

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

        {/* This is your professional timeline container */}
        <div className="mx-auto max-w-3xl bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
          <CertificationsTimeline />
        </div>

      </div>
    </Layout>
  );
}