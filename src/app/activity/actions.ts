'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

export const certificationsData: CertificationItem[] = [
  { title: 'Training Course on Calibration', issuer: 'World Meteorological Organization', date: 'Dec 2025' },
  { title: 'Integrated Drought Management: Monitoring and Early Warning', issuer: 'Cap-Net', date: 'Nov 2025' },
  { title: 'Numerical Weather Prediction: Hands on WRF Modelling', issuer: 'CSEE', date: 'Oct 2025' },
  { title: 'Forecasting Module', issuer: 'Met Office', date: 'Jun 2025' },
  { title: 'Member of The Royal Meteorological Society', issuer: 'Royal Meteorological Society', date: 'Mar 2025' },
  { title: 'Python Programming Suite', issuer: 'M. G. Science Institute', date: 'May 2024' },
];

export default function CertificationsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  // FIX: Initialize the ref as an empty array to avoid index errors
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean); // Filter out any nulls

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref= { containerRef } className = "relative max-w-3xl mx-auto py-10 px-6" >
      {/* THE LINE: This creates the vertical connector */ }
      < div className = "absolute left-[33px] top-12 bottom-12 w-0.5 bg-gray-200" />

        <div className="space-y-12" >
        {
          certificationsData.map((cert, i) => (
            <div
            key= { i }
            // FIX: Safe ref assignment
            ref = {(el) => { itemsRef.current[i] = el; }}
  className = "relative flex items-start gap-8 group"
    >
    {/* Professional Timeline Dot */ }
    < div className = "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-white group-hover:bg-blue-500 transition-colors duration-300" >
      <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:bg-white" />
        </div>

  {/* Content Section */ }
  <div className="flex flex-col pt-0.5" >
    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1" >
      { cert.date }
      </span>
      < h3 className = "text-lg font-extrabold text-gray-900 leading-tight" >
        { cert.title }
        </h3>
        < span className = "text-sm font-medium text-gray-500 mt-1" >
          { cert.issuer }
          </span>
          </div>
          </div>
        ))
}
</div>
  </div>
  );
}