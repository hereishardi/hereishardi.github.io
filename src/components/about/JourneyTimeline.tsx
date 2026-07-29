'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string[];
  highlight?: boolean;
}

const journeyData: TimelineItem[] = [
  {
    year: 'Jul 2026 - Present',
    title: 'Research Assistant',
    company: 'National University of Singapore (NUS)',
    description: [
      'Collaborating with an international and interdisciplinary research team from Singapore and Italy',
      'Analysing VOC (Volatile Organic Compound) observational data from the EBAS database, focusing on temperature-dependent emission patterns in Bologna, Italy',
      'Scheduling team meetings and preparing summaries of relevant articles and datasets for the research group ongoing work',
      'Processing and quality-controlling atmospheric datasets using Python, supporting the analysis of anthropogenic VOC emissions and their role in urban ozone formation and air quality deterioration'
    ],
    highlight: true
  },
  {
    year: 'Jan 2026 - Present',
    title: 'Board Member for Board on Enterprise Decision Support (BEDS)',
    company: 'American Meteorological Society',
    description: [
      'Contributing to board-level strategic planning, connecting the scientific community with operational decision-makers across government, industry and climate services.',
      'Supporting strategic initiatives that translate atmospheric and climate data into actionable guidance for societal applications, including emergency management and operational climate services.'
    ],
    highlight: false
  },
  {
    year: 'Jun 2025 - Sep 2025',
    title: 'Research Assistant',
    company: 'University of Reading',
    description: [
      'Dissertation: Analysis of Canopy Layer Urban Heat Island (CL-UHI) Intensity in Berlin (Supervisor: Russell Glazer and Sue Grimmond)',
      'Investigated CL-UHI intensity in Berlin for April and August 2022 and analysed multi-network observational datasets from 25+ urban, suburban, and rural weather stations to assess urban-rural temperature variability',
      'Applied Python for statistical analysis, data quality control, and geospatial visualisation to characterise the spatial and temporal variability of the CL-UHI, contributing evidence relevant to energy-efficient urban planning and climate resilience strategies'
    ],
    highlight: false
  },
  {
    year: 'Jun 2025 - Jul 2025',
    title: 'Summer Assistant',
    company: 'UPP Ltd',
    description: [
      'Supported daily operations and worked closely with team members to manage tasks efficiently in a fast-paced environment'
    ],
    highlight: false
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const items = itemsRef.current;

    if (!line || !items.length) return;

    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5
        }
      }
    );

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Center line */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/30 md:block"
      />

      <div className="absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b from-primary via-secondary to-primary/30 md:hidden" />

      <div className="relative space-y-16 md:space-y-24">
        {journeyData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className={`relative flex items-start gap-8 ${i % 2 === 0
              ? 'md:flex-row'
              : 'md:flex-row-reverse'
              }`}
          >
            {/* Content */}
            <div
              className={`ml-16 flex-1 md:ml-0 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}
            >
              <div
                className={`group relative rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md ${item.highlight ? 'border-primary/20 shadow-md' : ''
                  }`}
              >
                <span className="mb-2 inline-block rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground">
                  {item.year}
                </span>
                <h3 className="mb-1 text-xl font-bold text-foreground md:text-2xl">
                  {item.title}
                </h3>
                {item.companyUrl ? (
                  <Link
                    href={item.companyUrl}
                    className="mb-3 inline-block font-medium text-primary transition-colors hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{item.company} ↗
                  </Link>
                ) : (
                  <span className="mb-3 inline-block font-medium text-foreground/60">
                    @{item.company}
                  </span>
                )}
                <ul className="list-disc space-y-1 pl-5 text-foreground/70">
                  {item.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-6 top-6 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary/40 bg-background md:left-1/2 md:-translate-x-1/2">
              <div
                className={`h-2 w-2 rounded-full ${item.highlight ? 'bg-primary' : 'bg-primary/50'
                  }`}
              />
            </div>

            {/* Empty space for the other side on desktop */}
            <div className="hidden flex-1 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}